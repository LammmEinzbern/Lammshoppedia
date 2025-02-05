import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/store/useAuth";

function Register() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await register(formData.full_name, formData.email, formData.password);
      console.log("Berhasil Daftar!");
    } catch (error) {
      console.error("Error saat register:", error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-6">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-xl bg-gray-800 shadow-lg">
        <div className="hidden md:flex flex-1 items-center justify-center bg-gray-700 p-8">
          <img
            src="./saberalterfatestaynight.gif"
            alt="Register Illustration"
            className="h-64 w-64 object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col justify-center p-8 bg-gray-800">
          <h2 className="mb-6 text-3xl font-bold text-white">
            Bergabung dengan{" "}
            <span className="text-red-500 text-3xl">Lammshoppedia!</span>
          </h2>
          <p className="mb-6 text-gray-400">
            Buat akun untuk memulai pengalaman belanja yang luar biasa!
          </p>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-400"
              >
                Nama Lengkap
              </label>
              <input
                type="text"
                id="name"
                className="w-full mt-2 rounded-lg border border-gray-600 bg-gray-700 p-3 text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Masukkan nama lengkap Anda"
                name="full_name"
                value={formData.full_name}
                onChange={(e) =>
                  setFormData({ ...formData, full_name: e.target.value })
                }
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-400"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full mt-2 rounded-lg border border-gray-600 bg-gray-700 p-3 text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Masukkan email Anda"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-400"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full mt-2 rounded-lg border border-gray-600 bg-gray-700 p-3 text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Buat password Anda"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-400"
              >
                Konfirmasi Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full mt-2 rounded-lg border border-gray-600 bg-gray-700 p-3 text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Konfirmasi password Anda"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-500 py-3 text-lg font-semibold text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Daftar
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-400">
            Sudah punya akun?
            <Link
              to={"/login"}
              className="font-semibold text-blue-400 hover:underline"
            >
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
