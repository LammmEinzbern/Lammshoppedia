import { create } from "zustand";
import { supabase } from "../SupaNiga";
export const useCart = create((set, get) => ({
  cart: [],

  fetchcart: async () => {
    const { data, error } = await supabase
      .from("cart")
      .select("*,barang(foto_barang)");

    if (!error) set({ cart: data });
  },
  addtocart: async (item) => {
    const { cart } = get();
    const existingitem = cart.find((i) => i.id_produk === item.id_produk);

    if (existingitem) {
      const updateditem = {
        ...existingitem,
        jumlah: existingitem.jumlah + 1,
        harga: (existingitem.jumlah + 1) * item.harga,
      };
      const { error } = await supabase
        .from("cart")
        .update({
          jumlah: updateditem.jumlah,
          harga: updateditem.harga,
        })
        .eq("id", existingitem.id);

      if (!error) {
        set((state) => ({
          cart: state.cart.map((cartitem) =>
            cartitem.id === existingitem.id ? updateditem : cartitem
          ),
        }));
      }
    } else {
      const newitem = {
        ...item,
        jumlah: 1,
        harga: item.harga,
      };
      const { data, error } = await supabase.from("cart").insert([newitem]);
      if (!error) set((state) => ({ cart: [...state.cart, data[0]] }));
    }
    // const { data, error } = await supabase.from("cart").insert([item]);
    // if (!error) set((state) => ({ cart: [...state.cart, data[0]] }));
  },
}));
