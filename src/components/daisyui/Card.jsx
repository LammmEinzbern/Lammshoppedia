import React from "react";
import { Link } from "react-router-dom";
const Card = ({
  id,
  nama_barang,
  foto_barang,
  jenis_barang,
  harga,
  deskripsi,
}) => {
  return (
    <div className="w-full bg-yellow-300 dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl p-4">
      <figure>
        <img
          src={foto_barang}
          alt={nama_barang}
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="mt-4">
        <h2 className="text-xl font-semibold text-black dark:text-white">
          {nama_barang}
        </h2>
        <p className="text-black dark:text-white">Harga: {harga}</p>
        <p className="text-black dark:text-white">Jenis: {jenis_barang}</p>
        <p className="text-black dark:text-white">{deskripsi}</p>
        <div className="mt-4">
          <Link
            to={`/detail/${id}`}
            className="btn bg-white text-black hover:bg-red-400"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
