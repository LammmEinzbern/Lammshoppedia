import React from "react";
import Header from "../components/tailus/Header";
import Footer from "../components/tailus/Footer";
import FloatingButton from "../components/FloatingButton";

const AboutPages = () => {
  return (
    <div className="dark:bg-gray-700 dark:text-gray-100 transition-colors duration-300 min-h-screen">
      <Header />
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-6">
            Selamat Datang di{" "}
            <span className="text-red-400 dark:text-red-500 text-4xl">
              Lammshoppedia
            </span>
            !
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            Kami adalah pusat belanja online yang berkomitmen untuk menyediakan
            <span className="font-semibold">
              {" "}
              produk berkualitas tinggi
            </span>{" "}
            dan
            <span className="font-semibold"> terpercaya</span> untuk semua
            kebutuhan Anda. Dengan beragam kategori pilihan, kami hadir untuk
            memastikan pengalaman belanja Anda menjadi lebih mudah,
            menyenangkan, dan memuaskan.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
              <h2 className="text-2xl font-semibold text-red-400 dark:text-red-500 mb-4">
                Mengapa Memilih Kami?
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                <li>
                  <span className="font-medium">Kualitas Terbaik:</span> Semua
                  produk kami dipilih dengan cermat untuk menjamin kepuasan
                  Anda.
                </li>
                <li>
                  <span className="font-medium">Harga Terjangkau:</span> Nikmati
                  produk terbaik tanpa menguras kantong.
                </li>
                <li>
                  <span className="font-medium">Kepercayaan Pelanggan:</span>{" "}
                  Keamanan dan kepercayaan Anda adalah prioritas kami.
                </li>
              </ul>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
              <h2 className="text-2xl font-semibold text-red-400 dark:text-red-500 mb-4">
                Misi Kami
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Di <span className="font-bold">Lammshoppedia</span>, misi kami
                adalah membawa kenyamanan belanja online ke tingkat yang lebih
                tinggi. Kami ingin menjadi pilihan utama Anda untuk
                produk-produk yang berkualitas dengan layanan pelanggan yang tak
                tertandingi.
              </p>
            </div>
          </div>

          <p className="text-lg text-gray-700 dark:text-gray-300 font-medium mt-12">
            Mari bergabung bersama kami dan temukan produk impian Anda di
            <span className="text-red-400 dark:text-red-500 font-semibold">
              {" "}
              Lammshoppedia
            </span>
            . Temukan pengalaman belanja online yang berbeda, hanya di sini!
          </p>
        </div>
      </div>
      <FloatingButton />
      <Footer />
    </div>
  );
};

export default AboutPages;
