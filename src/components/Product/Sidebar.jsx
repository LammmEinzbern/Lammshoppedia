import React, { useState } from "react";

const Sidebar = ({
  setShortBy,
  setKategori,
  setShortByClien,
  isHeaderOpen,
}) => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedKategori, setSelectedKategori] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const setParams = (filter = "", kategori = "") => {
    setShortBy(filter); // Update filter harga
    setShortByClien(filter); // Update filter harga untuk client
    setKategori(kategori ? [kategori] : []); // Update kategori yang dipilih
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter); // Update filter harga
    setParams(filter, selectedKategori); // Panggil setParams dengan filter harga dan kategori
  };

  const handleKategoriChange = (kategori) => {
    setSelectedKategori(kategori); // Update kategori yang dipilih
    setParams(selectedFilter, kategori); // Panggil setParams dengan filter harga dan kategori
  };

  const handleResetFilter = () => {
    setSelectedFilter("");
    setSelectedKategori("");
    setParams("", ""); // Reset filter harga dan kategori
  };

  return (
    <>
      {!isHeaderOpen && (
        <button
          className={`btn lg:hidden block mb-4 mt-52 dark:text-gray-100 dark:bg-gray-700 fixed top-4 ${
            isOpen ? "left-[calc(100%-56px)]" : "left-4"
          } z-40 transition-all duration-300`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "Tutup" : "Filter"}
        </button>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 ${
          isOpen ? "left-0" : "-left-full"
        } lg:static lg:block w-4/5 lg:w-1/5 h-full bg-gray-50 dark:bg-gray-800 shadow-lg rounded-lg z-50 transition-transform duration-300`}
      >
        <div className="flex flex-col items-center p-4">
          <h2 className="text-2xl mb-3 dark:text-gray-100">Filter Produk</h2>

          <label className="flex items-center gap-2 my-2 dark:text-gray-100">
            <input
              type="radio"
              name="radio-produk"
              className="radio radio-warning"
              checked={selectedFilter === "termahal"}
              onChange={() => handleFilterChange("termahal")}
            />
            Harga Termahal
          </label>
          <label className="flex items-center gap-2 my-2 dark:text-gray-100">
            <input
              type="radio"
              name="radio-produk"
              className="radio radio-warning"
              checked={selectedFilter === "termurah"}
              onChange={() => handleFilterChange("termurah")}
            />
            Harga Termurah
          </label>
        </div>

        <div className="kategori mt-4 flex flex-col items-center">
          <h2 className="mb-3 flex flex-col items-center text-2xl dark:text-gray-100">
            Kategori Produk
          </h2>

          <label className="flex items-center gap-2 my-2 dark:text-gray-100">
            <input
              type="radio"
              name="radio-kategori"
              className="radio radio-warning"
              checked={selectedKategori === "makanan"}
              onChange={() => handleKategoriChange("makanan")}
            />
            Makanan
          </label>
          <label className="flex items-center gap-2 my-2 dark:text-gray-100">
            <input
              type="radio"
              name="radio-kategori"
              className="radio radio-warning"
              checked={selectedKategori === "minuman"}
              onChange={() => handleKategoriChange("minuman")}
            />
            Minuman
          </label>

          <div className="text-center my-4">
            <button
              onClick={() => handleFilterChange("a")}
              className="btn mx-2 dark:bg-gray-700 dark:text-gray-100"
            >
              A-Z
            </button>
            <button
              onClick={() => handleFilterChange("z")}
              className="btn mx-2 dark:bg-gray-700 dark:text-gray-100"
            >
              Z-A
            </button>
            <button
              className="btn btn-warning mt-4 dark:bg-yellow-600 dark:text-gray-100"
              onClick={handleResetFilter}
            >
              Reset Filter
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
