import React, { useEffect, useState } from "react";
import { supabase } from "../utils/SupaNiga";
import { useNavigate } from "react-router-dom"; // 🔥 Import useNavigate buat tombol back

const HistoryPayment = () => {
  const [history, setHistory] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate(); // 🔥 Gunakan useNavigate

  useEffect(() => {
    const fetchHistory = async () => {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      if (userError) {
        console.error("Error fetching user:", userError);
        return;
      }

      const userId = userData?.user?.id;
      if (!userId) return;

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id_user", userId);

      if (error) {
        console.error("Error fetching history:", error);
      } else {
        setHistory(data);
      }
    };

    fetchHistory();
  }, []);

  // Format harga ke Rupiah
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(angka);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* 🔥 Tombol "Kembali" */}
      <button
        onClick={() => navigate(-1)} // 🔥 Navigasi balik ke halaman sebelumnya
        className="mb-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
      >
        ← Kembali
      </button>

      <h2 className="text-2xl font-semibold text-center mb-6">
        History Payment
      </h2>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full border-collapse bg-white rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-3 text-left">No</th>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Total Harga</th>
              <th className="p-3 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {history.length > 0 ? (
              history.map((order, index) => (
                <tr
                  key={order.order_id}
                  className="border-b hover:bg-gray-100 transition-all"
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{order.order_id}</td>
                  <td className="p-3">{formatRupiah(order.total_harga)}</td>
                  <td className="p-3">
                    <button
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
                      onClick={() => setSelectedOrder(order)}
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 p-4">
                  Tidak ada riwayat pembayaran.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Modal Detail Transaksi */}
      {selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Detail Transaksi</h3>
            <p>
              <strong>Order ID:</strong> {selectedOrder.order_id}
            </p>
            <p>
              <strong>Total Harga:</strong>{" "}
              {formatRupiah(selectedOrder.total_harga)}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`px-3 py-1 text-sm font-semibold rounded-full ${
                  selectedOrder.status === "paid"
                    ? "bg-green-500 text-white"
                    : selectedOrder.status === "pending"
                    ? "bg-yellow-400 text-black"
                    : "bg-red-500 text-white"
                }`}
              >
                {selectedOrder.status}
              </span>
            </p>
            <p>
              <strong>Metode Pembayaran:</strong>{" "}
              {selectedOrder.metode_pembayaran}
            </p>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition w-full"
              onClick={() => setSelectedOrder(null)}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPayment;
