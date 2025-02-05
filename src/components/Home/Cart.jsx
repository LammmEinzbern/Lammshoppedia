import React, { useEffect } from "react";
import Header from "../tailus/Header";
import { useCart } from "../../utils/store/useCart";
import Footer from "../tailus/Footer";
import { supabase } from "../../utils/SupaNiga";

const Cart = () => {
  const { fetchcart, cart } = useCart();

  useEffect(() => {
    fetchcart();
  }, [fetchcart]);

  const handleDecreaseQuantity = async (item) => {
    if (item.jumlah > 1) {
      const { error } = await supabase
        .from("cart")
        .update({ jumlah: item.jumlah - 1 })
        .eq("id", item.id);

      if (error) {
        alert("❌ Gagal mengurangi jumlah item!");
      } else {
        fetchcart();
      }
    } else {
      const { error } = await supabase.from("cart").delete().eq("id", item.id);

      if (error) {
        alert("❌ Gagal menghapus item!");
      } else {
        alert("✅ Item berhasil dihapus!");
        fetchcart();
      }
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center my-16 px-6">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-10">
          🛒 Keranjang Belanja
        </h2>

        <div className="flex flex-col w-full max-w-4xl bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          {cart?.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4 shadow-md"
              >
                <div className="flex items-center">
                  <div className="w-20 h-20 bg-gray-200 dark:bg-gray-600 flex justify-center items-center rounded-lg">
                    <img
                      src={item.foto_produk}
                      alt={item.nama_produk}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  <div className="ml-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {item.nama_produk}
                    </h2>
                    <p className="text-blue-500 font-semibold">
                      {(item.harga * item.jumlah).toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <p className="text-gray-600 dark:text-gray-300 text-sm mr-4">
                    x{item.jumlah}
                  </p>

                  <button
                    onClick={() => handleDecreaseQuantity(item)}
                    className="p-2 rounded-md bg-black text-white hover:bg-white transition-all duration-300 shadow-md"
                  >
                    ❌
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-300 text-lg text-center">
              Keranjang kosong 🛒
            </p>
          )}
        </div>

        {cart.length > 0 && (
          <div className="mt-8 p-6 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-lg w-full max-w-4xl shadow-md">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Total Belanja:
            </h3>
            <p className="text-2xl text-green-500 dark:text-green-400 font-bold mt-1">
              {cart
                .reduce((acc, item) => acc + item.harga * item.jumlah, 0)
                .toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
            </p>
            <button
              onClick={() => (window.location.href = "/checkout")}
              className="w-full py-3 mt-4 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-all duration-300 shadow-lg"
            >
              🛍️ Lanjut ke Pembayaran
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
