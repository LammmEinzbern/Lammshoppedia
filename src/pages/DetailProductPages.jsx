import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/SupaNiga";
import FloatingButton from "../components/FloatingButton";

const DetailProductPages = () => {
  const { id } = useParams();
  const productId = parseInt(id, 10);

  console.log("Product ID dari URL:", productId);

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      if (!productId) return null;
      const { data, error } = await supabase
        .from("barang")
        .select("*")
        .eq("id", productId)
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!productId,
  });

  if (isLoading)
    return (
      <h2 className="text-center text-xl dark:text-gray-200">Loading...</h2>
    );
  if (error || !product)
    return (
      <h2 className="text-center text-xl dark:text-gray-200">
        Produk tidak ditemukan.
      </h2>
    );

  return (
    <div className="container mx-auto my-10 p-8 bg-white dark:bg-gray-800">
      <Link to={"/product"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m6.523 12.5l3.735 3.735q.146.146.153.344q.006.198-.153.363q-.166.166-.357.169q-.191.002-.357-.163l-4.382-4.383q-.243-.242-.243-.565q0-.323.243-.565l4.382-4.383q.146-.146.347-.153q.201-.007.367.159q.16.165.162.354q.003.188-.162.353L6.523 11.5h12.38q.214 0 .358.143q.143.144.143.357t-.143.357q-.144.143-.357.143H6.524Z"
          />
        </svg>
      </Link>

      <h2 className="text-4xl font-extrabold text-center text-gray-800 dark:text-gray-100 mb-8">
        {product.nama_barang}
      </h2>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-1/2 flex justify-center items-center">
          <img
            src={product.foto_barang}
            alt={product.nama_barang}
            className="w-full max-w-sm h-auto max-h-96 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="lg:w-1/2 flex flex-col justify-center">
          <p className="text-2xl text-gray-700 dark:text-gray-300 mb-4">
            <strong>Jenis:</strong> {product.jenis_barang}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            <strong>Deskripsi:</strong> {product.deskripsi}
          </p>
          <p className="text-3xl font-semibold text-red-500 dark:text-red-400 mb-6">
            <strong>Harga:</strong> Rp {product.harga.toLocaleString("id-ID")}
          </p>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">
            <strong>Stok Tersedia:</strong> {product.stok} unit
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            <strong>Ditambahkan pada:</strong>{" "}
            {new Date(product.created_at).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors">
              Beli Sekarang
            </button>
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg text-lg font-semibold hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 transition-colors">
              Tambah ke Keranjang
            </button>
          </div>
        </div>
      </div>
      <FloatingButton />
    </div>
  );
};

export default DetailProductPages;
