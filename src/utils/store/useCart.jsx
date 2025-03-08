import { create } from "zustand";
import axios from "axios";
import { supabase } from "../SupaNiga";

export const useCart = create((set, get) => ({
  cart: [],

  fetchCart: async () => {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.error("Error fetching user:", userError);
      return;
    }

    const userId = userData?.user?.id;
    if (!userId) return;

    const { data, error } = await supabase
      .from("cart")
      .select("*, barang(foto_barang)")
      .eq("id_user", userId);

    if (!error) {
      set({ cart: data });
    } else {
      console.error("Fetch error:", error);
    }
  },

  addToCart: async (item) => {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.error("Error fetching user:", userError);
      return;
    }

    const userId = userData?.user?.id;
    if (!userId) return;

    const { cart } = get();
    const existingItem = cart.find((i) => i.id_produk === item.id_produk);

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        jumlah: existingItem.jumlah + 1,
        harga: (existingItem.jumlah + 1) * item.harga,
      };

      const { error } = await supabase
        .from("cart")
        .update({ jumlah: updatedItem.jumlah, harga: updatedItem.harga })
        .eq("id", existingItem.id)
        .eq("id_user", userId);

      if (!error) {
        set((state) => ({
          cart: state.cart.map((cartItem) =>
            cartItem.id === existingItem.id ? updatedItem : cartItem
          ),
        }));
      } else {
        console.error("Update error:", error);
      }
    } else {
      const newItem = {
        ...item,
        jumlah: 1,
        harga: item.harga,
        id_user: userId,
      };

      const { data, error } = await supabase.from("cart").insert([newItem]);
      if (!error && data) {
        set((state) => ({ cart: [...state.cart, data[0]] }));
      } else {
        console.error("Insert error:", error);
      }
    }
  },

  removeFromCart: async (id) => {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.error("Error fetching user:", userError);
      return;
    }

    const userId = userData?.user?.id;
    if (!userId) return;

    const { error } = await supabase
      .from("cart")
      .delete()
      .eq("id", id)
      .eq("id_user", userId);

    if (!error) {
      set((state) => ({
        cart: state.cart.filter((item) => item.id !== id),
      }));
    } else {
      console.error("Delete error:", error);
    }
  },

  handlePayment: async () => {
    const { cart } = get();
    const { data: session, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError || !session?.session?.user) {
      console.error("User session not found");
      alert("Silakan login kembali.");
      return;
    }

    const userId = session.session.user.id;

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("full_name, email")
      .eq("id", userId)
      .single();

    if (profileError) {
      console.error("Error fetching profile data:", profileError);
      return;
    }

    if (cart.length === 0) {
      alert("Keranjang masih kosong!");
      return;
    }

    const itemDetails = cart.map((item) => ({
      id: item.id_produk,
      name: item.nama_produk,
      price: item.harga / item.jumlah,
      quantity: item.jumlah,
    }));

    const totalPrice = itemDetails.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const order_id = `ORDER-${Date.now()}-${userId.slice(0, 5)}`;

    const checkoutData = {
      transaction_details: {
        order_id: order_id,
        gross_amount: totalPrice,
      },
      item_details: itemDetails,
      customer_details: {
        first_name: profileData.full_name || "Customer",
        email: profileData.email,
      },
    };

    try {
      const response = await fetch(
        "https://midtrans-jet.vercel.app/api/payment/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(checkoutData),
        }
      );

      if (!response.ok) {
        console.error("Payment request failed:", response.statusText);
        alert("Gagal memproses pembayaran, coba lagi nanti.");
        return;
      }

      const result = await response.json();

      if (result.snapToken) {
        window.snap.pay(result.snapToken, {
          onSuccess: async function () {
            await supabase.from("cart").delete().eq("id_user", userId);
            set({ cart: [] });

            // ✅ **Insert Data ke Tabel Orders**
            const { data, error } = await supabase
              .from("orders")
              .insert([
                {
                  order_id: order_id,
                  id_user: userId,
                  total_harga: totalPrice,
                  metode_pembayaran: "Snap",
                  status: "success",
                },
              ])
              .select();

            if (error) {
              console.error("Error inserting into orders:", error.message);
            } else {
              console.log("Order berhasil ditambahkan:", data);
            }
          },
          onPending: function (result) {
            console.log("Pending payment:", result);
          },
          onError: function (result) {
            console.log("Payment error:", result);
            alert("Terjadi kesalahan saat memproses pembayaran.");
          },
        });
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Terjadi kesalahan, coba lagi nanti.");
    }
  },

  fetchHistoryPayment: async (orderId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/payment/payment-status/${orderId}`
      );
      console.log(response.data);
    } catch (error) {
      console.log("Error fetching payment status:", error);
      return null;
    }
  },
}));
