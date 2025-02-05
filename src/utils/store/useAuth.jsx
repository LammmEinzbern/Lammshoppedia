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
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email,
          password,
        });

      if (signUpError) {
        console.error("Terjadi kesalahan saat sign up:", signUpError.message);
        set({ loading: false });
        return;
      }

      const userId = signUpData?.user?.id;
      if (!userId) {
        console.error("User ID tidak ditemukan setelah sign up.");
        set({ loading: false });
        return;
      }

      const { error: upsertError } = await supabase
        .from("profiles")
        .upsert([{ id: userId, full_name, email }]);

      if (upsertError) {
        console.error(
          "Terjadi kesalahan saat menyimpan profil:",
          upsertError.message
        );
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

      console.log("Pendaftaran berhasil.");
    } catch (error) {
      console.error("Unexpected error during registration:", error);
      set({ loading: false });
    }
  },

  login: async (email, password) => {
    set({ loading: true });
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    set({ loading: false });
    if (error) {
      console.log("gagal login");
      return Promise.reject(error.message);
    }

    set({
      user: data.user,
      auth: true,
    });
    console.log("berhasil login");
    return Promise.resolve(data.user);
  },

  logout: async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error.message);
      return;
    }

    set({
      user: null,
      auth: false,
    });
  },
  fetchUser: async () => {
    set({ loading: true });
    const { data } = await supabase.auth.getUser();
    const { user: currentuser } = data;

    if (currentuser) {
      set({ user: currentuser, auth: true });
      await get().fetchUserdata(currentuser.id);
    } else {
      set({ loading: false });
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, Session) => {
        if (event === "SIGNED_IN") {
          set({ user: Session.user, auth: true });
        } else if (event === "SIGNED_OUT") {
          set({ user: null, auth: false });
        }
      }
    );

    return () => authListener.subscription.unsubscribe();
  },

  fetchUserdata: async (userId) => {
    try {
      const { data: userData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId);

      if (userData && userData.length > 0) {
        set({
          full_name: userData[0].full_name,
          email: userData[0].email,
          loading: false,
        });
      }
    } catch (error) {
      console.log(error);
      set({ loading: false });
    }
  },
  loading: () => {
    set({ loading: true });
  },
}));
