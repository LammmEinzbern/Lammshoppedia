import React, { useState } from "react";
import Header from "../components/tailus/Header";
import Footer from "../components/tailus/Footer";
import FloatingButton from "../components/FloatingButton";

const ContactPages = () => {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    pesan: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Terkirim", formData);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 text-gray-800 dark:text-gray-200">
      <Header />
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-blue-600 dark:text-yellow-300">
          Hubungi Kami
        </h1>
        <p className="text-lg text-center mb-12 text-gray-600 dark:text-gray-400">
          Kami selalu siap membantu! Isi formulir di bawah atau hubungi kami
          langsung.
        </p>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-blue-100 dark:bg-yellow-500 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6 text-blue-600 dark:text-gray-900"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.72 11.06a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 14.5v5.75m0-5.75a6 6 0 016 6h-3.75M12 14.5a6 6 0 00-6 6h3.75"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-lg">Alamat</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Jl. Celepuk 2 no 45, Jatimakmur, Pondok Gede, Bekasi
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-blue-100 dark:bg-yellow-500 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6 text-blue-600 dark:text-gray-900"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.72 8.22a3 3 0 10-4.44 0m4.44 0v5.25M16.72 8.22l-4.44 5.25M8.1 11.34a1 1 0 10-.2-1.98m.2 1.98v3.42m0-3.42l1.98 3.42"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-lg">Telepon</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  <a
                    href="tel:+6281234567890"
                    className="hover:text-blue-600 dark:hover:text-yellow-300"
                  >
                    +62 858 2469 7925
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-blue-100 dark:bg-yellow-500 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6 text-blue-600 dark:text-gray-900"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 13.5a8.38 8.38 0 01-2.28.63M3.27 6.96A17.79 17.79 0 0112 5c3.56 0 6.9.92 9.73 2.5M8.67 17.18a18.3 18.3 0 006.66 0m-6.66 0a9 9 0 01-3.12-.8M8.67 17.18a18.07 18.07 0 01-.62-.3"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-lg">Email</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  <a
                    href="mailto:kontak@lammshoppedia.com"
                    className="hover:text-blue-600 dark:hover:text-yellow-300"
                  >
                    kontak@lammshoppedia.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="nama"
                  className="block text-sm font-medium mb-2"
                >
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring focus:ring-blue-500 dark:focus:ring-yellow-300"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring focus:ring-blue-500 dark:focus:ring-yellow-300"
                />
              </div>

              <div>
                <label
                  htmlFor="pesan"
                  className="block text-sm font-medium mb-2"
                >
                  Pesan
                </label>
                <textarea
                  id="pesan"
                  name="pesan"
                  value={formData.pesan}
                  onChange={handleChange}
                  rows="5"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring focus:ring-blue-500 dark:focus:ring-yellow-300"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-blue-600 dark:bg-yellow-300 text-white dark:text-gray-900 font-bold rounded-lg hover:bg-blue-700 dark:hover:bg-yellow-400"
              >
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1663022.0210172555!2d138.4502452987295!3d35.50205559395694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x605d1b87f02e57e7%3A0x2e01618b22571b89!2sTokyo%2C%20Jepang!5e0!3m2!1sid!2sid!4v1736127334829!5m2!1sid!2sid"
          width="1200"
          height="450"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="mt-10 "
        ></iframe>
      </div>
      <FloatingButton />
      <Footer />
    </main>
  );
};

export default ContactPages;
