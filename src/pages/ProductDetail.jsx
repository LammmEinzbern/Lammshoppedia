import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../utils/store/useAuth";
import { useCart } from "../utils/store/useCart";
import { supabase } from "../utils/SupaNiga";
import { Helmet } from "react-helmet-async";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from("barang") // Nama tabel di Supabase
          .select("*")
          .eq("id", id)
          .single(); // Ambil satu data berdasarkan id

        if (error) {
          throw error;
        }

        setProduct(data);
      } catch (error) {
        console.error("❌ Gagal mengambil data produk:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const tambahkeranjang = async () => {
    try {
      await addToCart({
        id_user: user.id,
        id_produk: product.id,
        nama_produk: product.nama_barang,
        jumlah: 1,
        harga: product.harga,
        foto_produk: product.foto_barang,
      });

      alert("✅ Produk berhasil ditambahkan ke keranjang!");
    } catch (error) {
      console.error("❌ Gagal menambahkan ke keranjang:", error);
      alert("❌ Gagal menambahkan ke keranjang!");
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500">🔄 Loading produk...</p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg mt-10">
      <Helmet>
        <title>{`Lammshoppedia! - ${product?.nama_barang}`}</title>
        <meta name="description" content="haloha minna!" />
        <meta name="keyword" content="toko murah, toko bagus" />
      </Helmet>
      {/* Tombol Kembali */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Kembali
      </button>

      {/* Gambar Produk */}
      <div className="relative w-full h-80">
        <img
          src={product.foto_barang}
          alt={product.nama_barang}
          className="w-full h-full object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Informasi Produk */}
      <div className="mt-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {product.nama_barang}
        </h1>
        <p className="text-xl text-blue-600 dark:text-blue-400 font-semibold mt-2">
          {formatRupiah(product.harga)}
        </p>
        <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          {product.deskripsi || "Tidak ada deskripsi untuk produk ini."}
        </p>
      </div>

      {/* Tombol Tambah ke Keranjang */}
      {user ? (
        <button
          onClick={tambahkeranjang}
          className="w-full bg-blue-600 dark:bg-blue-500 text-white px-5 py-3 rounded-lg mt-6 text-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-400 transition duration-300"
        >
          + Tambah ke Keranjang
        </button>
      ) : (
        <p className="text-red-500 mt-6 text-center">
          Silakan login untuk menambahkan ke keranjang.
        </p>
      )}
    </div>
  );
};

export default ProductDetail;
