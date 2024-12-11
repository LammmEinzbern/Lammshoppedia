import React, { useState } from "react";

const Sidebar = ({ setShortBy, setKategori, setShortByClien }) => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedKategori, setSelectedKategori] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setShortBy(filter);
    setShortByClien(filter);
  };

  const handleResetFilter = () => {
    setSelectedFilter("");
    setShortBy("");
    setShortBy("");
  };

  const handleKategori = (kategori) => {
    const updateKategori = selectedKategori.includes(kategori)
      ? selectedKategori.filter((kat) => kat !== kategori)
      : [...selectedKategori, kategori];

    setSelectedKategori(updateKategori);
    setKategori(updateKategori);
  };

  return (
    <>
      <button
        className="btn lg:hidden block mb-4 mt-8 dark:text-gray-100 dark:bg-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Tutup Filter" : "Tampilkan Filter"}
      </button>

      <aside
        className={`${
          isOpen ? "block" : "hidden"
        } lg:block w-full lg:w-1/5 p-4 bg-gray-50 dark:bg-gray-800 shadow-lg rounded-lg lg:static absolute z-50 top-16 left-0`}
      >
        <div className="flex flex-col items-center">
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
              type="checkbox"
              className="checkbox checkbox-warning"
              checked={selectedKategori.includes("makanan")}
              onChange={() => handleKategori("makanan")}
            />
            Makanan
          </label>
          <label className="flex items-center gap-2 my-2 dark:text-gray-100">
            <input
              type="checkbox"
              className="checkbox checkbox-warning"
              checked={selectedKategori.includes("minuman")}
              onChange={() => handleKategori("minuman")}
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
