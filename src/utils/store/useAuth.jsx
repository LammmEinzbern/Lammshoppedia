import { create } from "zustand";
import { supabase } from "../SupaNiga";

export const useAuth = create((set, get) => ({
  user: null,
  auth: false,
  full_name: "",
  role: "",
  email: "",
  loading: true,

  register: async (full_name, email, password) => {
    try {
      set({ loading: true });

      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email,
          password,
        });

      if (signUpError) {
        console.error("❌ Error SignUp:", signUpError.message);
        set({ loading: false });
        return;
      }

      const userId = signUpData?.user?.id;
      if (!userId) {
        console.error("❌ User ID tidak ditemukan setelah sign up.");
        set({ loading: false });
        return;
      }

      const { error: upsertError } = await supabase
        .from("profiles")
        .upsert([{ id: userId, full_name, email }]);

      if (upsertError) {
        console.error("❌ Error menyimpan profil:", upsertError.message);
        set({ loading: false });
        return;
      }

      set({
        user: signUpData.user,
        auth: true,
        full_name,
        email,
        loading: false,
      });

      console.log("✅ Pendaftaran berhasil.");
    } catch (error) {
      console.error("❌ Error Register:", error.message);
      set({ loading: false });
    }
  },

  login: async (email, password) => {
    try {
      set({ loading: true });

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      set({ loading: false });

      if (error) {
        console.error("❌ Gagal login:", error.message);
        return Promise.reject(error.message);
      }

      set({
        user: data.user,
        auth: true,
      });

      console.log("✅ Berhasil login");
      return Promise.resolve(data.user);
    } catch (error) {
      console.error("❌ Error Login:", error.message);
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("❌ Gagal logout:", error.message);
        return;
      }

      set({
        user: null,
        auth: false,
        full_name: "",
        email: "",
        role: "",
        loading: false,
      });

      console.log("✅ Berhasil logout");
    } catch (error) {
      console.error("❌ Error Logout:", error.message);
    }
  },

  fetchUser: async () => {
    try {
      set({ loading: true });

      const { data, error } = await supabase.auth.getUser();
      const currentUser = data?.user;

      if (error) {
        console.error("❌ Gagal mengambil user:", error.message);
        set({ loading: false });
        return;
      }

      if (currentUser) {
        set({ user: currentUser, auth: true });
        await get().fetchUserdata(currentUser.id);
      } else {
        set({ loading: false });
      }

      // ✅ Perbaikan `onAuthStateChange`
      const unsubscribe = supabase.auth.onAuthStateChange((event, session) => {
        if (event === "SIGNED_IN") {
          set({ user: session.user, auth: true });
        } else if (event === "SIGNED_OUT") {
          set({ user: null, auth: false });
        }
      });

      return () => unsubscribe.data?.unsubscribe?.();
    } catch (error) {
      console.error("❌ Error Fetch User:", error.message);
      set({ loading: false });
    }
  },

  fetchUserdata: async (userId) => {
    try {
      if (!userId) {
        console.error("❌ User ID tidak tersedia untuk fetchUserdata");
        return;
      }

      const { data: userData, error } = await supabase
        .from("profiles")
        .select("full_name, email")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("❌ Gagal mengambil data profil:", error.message);
        set({ loading: false });
        return;
      }

      if (userData) {
        set({
          full_name: userData.full_name,
          email: userData.email,
          loading: false,
        });
      }
    } catch (error) {
      console.error("❌ Error Fetch UserData:", error.message);
      set({ loading: false });
    }
  },

  loading: () => {
    set({ loading: true });
  },
}));
