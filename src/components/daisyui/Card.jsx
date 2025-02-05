import { Link } from "react-router-dom";
import { useAuth } from "../../utils/store/useAuth";
import { useCart } from "../../utils/store/useCart";
import { useState, useEffect } from "react";

const Card = ({ id, nama_barang, foto_barang, harga, idProduct }) => {
  const { user } = useAuth();
  const { addtocart } = useCart();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const tambahkeranjang = async () => {
    try {
      await addtocart({
        id_user: user.id,
        id_produk: idProduct,
        nama_produk: nama_barang,
        jumlah: 1,
        harga: harga,
        foto_produk: foto_barang,
      });

      alert("✅ Produk berhasil ditambahkan ke keranjang!");
      window.location.reload();
    } catch (error) {
      console.error("❌ Gagal menambahkan ke keranjang:", error);
      alert("✅ Produk berhasil ditambahkan ke keranjang!");
      window.location.reload();
    }
  };

  return (
    <div className="relative">
      {/* Toggle Dark Mode */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white p-2 rounded-lg shadow-md hover:bg-gray-400 dark:hover:bg-gray-600 transition"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

      <div className="card bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <figure className="relative h-48 overflow-hidden">
          <img
            src={foto_barang}
            alt={nama_barang}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          />
        </figure>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {nama_barang}
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            {formatRupiah(harga)}
          </p>
        </div>

        {user ? (
          <button
            onClick={tambahkeranjang}
            className="w-full flex items-center justify-center bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-b-lg hover:bg-blue-700 dark:hover:bg-blue-400 transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            + Keranjang
          </button>
        ) : (
          <Link
            to="/login"
            className="w-full flex items-center justify-center bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-b-lg hover:bg-blue-700 dark:hover:bg-blue-400 transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            + Keranjang
          </Link>
        )}
      </div>
    </div>
  );
};

export default Card;
