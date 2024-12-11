import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/SupaNiga";

const DetailProductPages = () => {
  const { id } = useParams();
  console.log("Product ID dari URL:", id);

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await supabase.from("barang").select().eq("id", id).single();
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) return <h2 className="text-center text-xl">Loading...</h2>;
  if (error || !product)
    return <h2 className="text-center text-xl">Produk tidak ditemukan.</h2>;

  return (
    <div className="container mx-auto my-10 p-8 bg-white ">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
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
          <p className="text-2xl text-gray-700 mb-4">
            <strong>Jenis:</strong> {product.jenis_barang}
          </p>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            <strong>Deskripsi:</strong> {product.deskripsi}
          </p>
          <p className="text-3xl font-semibold text-red-500 mb-6">
            <strong>Harga:</strong> Rp {product.harga.toLocaleString("id-ID")}
          </p>
          <p className="text-xl text-gray-700 mb-4">
            <strong>Stok Tersedia:</strong> {product.stok} unit
          </p>
          <p className="text-sm text-gray-500 mb-8">
            <strong>Ditambahkan pada:</strong>{" "}
            {new Date(product.created_at).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
              Beli Sekarang
            </button>
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors">
              Tambah ke Keranjang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProductPages;
