import React from "react";
import Card from "../daisyui/Card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../utils/SupaNiga";

const ProductList = () => {
  const MAX_VISIBLE_PRODUCTS = 6;

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

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

  if (isPending) return <h2>Loading..</h2>;

  return (
    <div className="my-10">
      <h2 className="text-5xl text-center font-bold text-black dark:text-white">
        Produk Kami
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6 p-4">
        {getProduct?.slice(0, MAX_VISIBLE_PRODUCTS).map((item) => {
          return (
            <Card
              key={item.id}
              id={item.id}
              nama_barang={item.nama_barang}
              foto_barang={item.foto_barang}
              jenis_barang={item.jenis_barang}
              harga={formatRupiah(item.harga)}
              deskripsi={truncateText(item.deskripsi, 20)}
            />
          );
        })}
      </div>
      <div className="text-center mt-8">
        <a
          href="/product"
          className="btn bg-white text-black hover:bg-red-400 dark:bg-gray-900 dark:text-white"
        >
          Lihat Selengkapnya
        </a>
      </div>
    </div>
  );
};

export default ProductList;
