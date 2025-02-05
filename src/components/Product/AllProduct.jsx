import { useQuery } from "@tanstack/react-query";
import React from "react";
import Card from "../daisyui/Card";
import truncateText from "../hook/useTruncateText";

const AllProduct = ({ product, searchProduct, setSearchProduk }) => {
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };
  console.log(product);
  return (
    <section id="product" className="h-full">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Cari produk..."
          value={searchProduct}
          onChange={(e) => setSearchProduk(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {product?.map((item) => (
          <div className="rounded-lg w-full bg-white dark:bg-gray-800 shadow-lg transition-transform transform hover:scale-105 duration-200">
            <Card
              key={item.id}
              idProduct={item.id}
              nama_barang={item.nama_barang}
              foto_barang={item.foto_barang}
              jenis_barang={item.jenis_barang}
              harga={item.harga}
              deskripsi={truncateText(item.deskripsi, 20)}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllProduct;
