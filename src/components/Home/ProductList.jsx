import React from "react";
import Card from "../daisyui/Card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../utils/SupaNiga";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const ProductList = () => {
  const MAX_VISIBLE_PRODUCTS = 6;

  const { data: getProduct, isPending } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const res = await supabase.from("barang").select("*");
      return res.data;
    },
  });

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  if (isPending)
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-red-500"></div>
      </div>
    );

  return (
    <div className="my-12 px-4">
      <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white">
        ✨ Produk Unggulan ✨
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-300 mt-2">
        Pilih produk terbaik untuk kebutuhan Anda!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 p-6">
        {getProduct?.slice(0, MAX_VISIBLE_PRODUCTS).map((item) => (
          <div
            key={item.id}
            className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl overflow-hidden transition transform hover:scale-105 duration-300"
          >
            <img
              src={item.foto_barang}
              alt={item.nama_barang}
              className="w-full h-56 object-cover"
            />

            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
              Terlaris🔥
            </span>

            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {item.nama_barang}
              </h3>
              <p className="text-gray-500 dark:text-gray-300 text-sm">
                {truncateText(item.deskripsi, 50)}
              </p>
              <p className="text-lg font-semibold text-red-500 mt-3">
                Rp {item.harga.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <a
          href="/product"
          className="inline-block px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300"
        >
          🔍 Lihat Selengkapnya
        </a>
      </div>
    </div>
  );
};

export default ProductList;
