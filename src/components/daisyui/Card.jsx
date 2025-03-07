import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/store/useAuth";
import { useCart } from "../../utils/store/useCart";

const Card = ({ id, nama_barang, foto_barang, harga, idProduct }) => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

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
        id_produk: idProduct,
        nama_produk: nama_barang,
        jumlah: 1,
        harga: harga,
        foto_produk: foto_barang,
      });

      alert("✅ Produk berhasil ditambahkan ke keranjang!");
    } catch (error) {
      console.error("❌ Gagal menambahkan ke keranjang:", error);
      alert("❌ Gagal menambahkan ke keranjang!");
    }
  };

  const handleClick = () => {
    navigate(`/produk/${idProduct}`);
  };

  return (
    <div className="relative">
      <div
        className="card bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
        onClick={handleClick}
      >
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
      </div>
      {user ? (
        <button
          onClick={(e) => {
            e.stopPropagation(); // Mencegah navigasi saat menekan tombol
            tambahkeranjang();
          }}
          className="w-full flex items-center justify-center bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-b-lg hover:bg-blue-700 dark:hover:bg-blue-400 transition-colors duration-300"
        >
          + Keranjang
        </button>
      ) : (
        <Link
          to="/login"
          className="w-full flex items-center justify-center bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-b-lg hover:bg-blue-700 dark:hover:bg-blue-400 transition-colors duration-300"
        >
          + Keranjang
        </Link>
      )}
    </div>
  );
};

export default Card;
