import { useQuery } from "@tanstack/react-query";
import React from "react";
import { supabase } from "../../utils/SupaNiga";
import Card from "../daisyui/Card";
import truncateText from "../hook/useTruncateText";

const AllProduct = ({ product }) => {
  return (
    <section id="product" className="w-4/5">
      <div className="grid grid-cols-4 gap-5">
        {product?.map((item) => (
          <div className="rounded-lg w-auto bg-white">
            <Card
              key={item.id}
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
