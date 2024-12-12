import React, { useState } from "react";
import Header from "../components/tailus/Header";
import Footer from "../components/tailus/Footer";
import Sidebar from "../components/Product/Sidebar";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/SupaNiga";
import Card from "../components/daisyui/Card";
import truncateText from "../components/hook/useTruncateText";

const ProductsPage = () => {
  const [shortby, setShortBy] = useState();
  const [kategori, setKategori] = useState([]);
  const [shortbyclien, setShortByClien] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const { data: product } = useQuery({
    queryKey: ["product", shortby, kategori],
    queryFn: async () => {
      let query = supabase.from("barang").select("*");

      if (shortby === "termahal") {
        query = query.order("harga", { ascending: false });
      } else if (shortby === "termurah") {
        query = query.order("harga", { ascending: true });
      }

      if (kategori.length > 0) {
        const filterKategori = kategori.join(",");
        query = query.filter("jenis_barang", "in", `(${filterKategori})`);
      }
      if (shortbyclien === "a") {
        query = query.order("nama_barang", { ascending: true });
      } else if (shortbyclien === "z") {
        query = query.order("nama_barang", { ascending: false });
      }

      const res = await query;
      return res.data;
    },
  });

  const filteredProducts = product?.filter((item) =>
    item.nama_barang.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalItems = filteredProducts?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts?.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Header />
      <main className="m-4 flex flex-col lg:flex-row gap-4 h-full">
        <Sidebar
          setShortBy={setShortBy}
          setKategori={setKategori}
          setShortByClien={setShortByClien}
        />

        <div className="w-full lg:w-4/5">
          <div className="mb-4 mt-24 md:mt-0">
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {paginatedProducts?.length > 0 ? (
              paginatedProducts.map((item) => (
                <div
                  className="rounded-lg w-auto bg-white dark:bg-gray-800"
                  key={item.id}
                >
                  <Card
                    id={item.id}
                    nama_barang={item.nama_barang}
                    foto_barang={item.foto_barang}
                    jenis_barang={item.jenis_barang}
                    harga={formatRupiah(item.harga)}
                    deskripsi={truncateText(item.deskripsi, 20)}
                  />
                </div>
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500 dark:text-gray-400">
                Produk tidak ditemukan.
              </p>
            )}
          </div>

          <div className="flex justify-center items-center mt-6 space-x-2">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50 dark:bg-gray-700 dark:text-gray-300"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageClick(index + 1)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white dark:bg-blue-600"
                    : "bg-gray-300 dark:bg-gray-700 dark:text-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50 dark:bg-gray-700 dark:text-gray-300"
            >
              Next
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductsPage;
