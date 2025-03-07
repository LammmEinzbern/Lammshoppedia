import React, { useState, useEffect } from "react";
import { useAuth } from "../utils/store/useAuth";
import Header from "../components/tailus/Header";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../utils/SupaNiga";
import { Helmet } from "react-helmet-async";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [noTelepon, setNoTelepon] = useState("");
  const [alamat, setAlamat] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("full_name, email, no_telepon, alamat, avatar_url")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Gagal mengambil data profil:", error);
        } else {
          setFullName(data.full_name || "");
          setEmail(data.email || "");
          setNoTelepon(data.no_telepon || "");
          setAlamat(data.alamat || "");
          setAvatarUrl(data.avatar_url || "");
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  const handleUploadAvatar = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    const fileExt = file.name.split(".").pop();
    const filePath = `avatars/${user.id}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      alert("❌ Gagal mengupload foto!");
      setLoading(false);
      return;
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
    setAvatarUrl(data.publicUrl);

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url: data.publicUrl })
      .eq("id", user.id);

    setLoading(false);
    if (updateError) {
      alert("❌ Gagal memperbarui foto profil!");
    } else {
      alert("✅ Foto profil berhasil diperbarui!");
    }
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        email: email,
        no_telepon: noTelepon,
        alamat: alamat,
      })
      .eq("id", user.id);

    setLoading(false);
    if (error) {
      alert("❌ Gagal memperbarui profil!");
    } else {
      alert("✅ Profil berhasil diperbarui!");
    }
  };

  const handleLogout = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (error || !data.session) {
      console.error("Session not found, kemungkinan sudah expired.");
      alert("Sesi sudah tidak valid, silakan login ulang.");
      navigate("/login");
      return;
    }

    const { error: logoutError } = await supabase.auth.signOut();
    if (logoutError) {
      console.error("Logout gagal:", logoutError.message);
      alert("❌ Gagal logout!");
    } else {
      alert("✅ Berhasil logout!");
      navigate("/");
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tl from-blue-900 via-gray-900 to-black text-white">
      <Helmet>
        <title>{`Profile`}</title>
        <meta name="description" content="haloha minna!" />
        <meta name="keyword" content="your profile" />
      </Helmet>
      <Header />

      <div className="flex flex-col items-center py-12 px-6">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl shadow-2xl p-8 w-full max-w-2xl text-center transform transition duration-500 hover:scale-105">
          <div className="relative mx-auto w-36 h-36 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
            <img
              src={avatarUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <label className="mt-4 block cursor-pointer text-sm text-blue-400 hover:text-blue-300 transition">
            Ganti Foto Profil
            <input
              type="file"
              accept="image/*"
              onChange={handleUploadAvatar}
              className="hidden"
            />
          </label>

          <div className="mt-8 space-y-4 text-left">
            <label className="block">
              <span className="text-gray-300 text-sm">Nama Lengkap:</span>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </label>

            <label className="block">
              <span className="text-gray-300 text-sm">Email:</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </label>

            <label className="block">
              <span className="text-gray-300 text-sm">Nomor Telepon:</span>
              <input
                type="text"
                value={noTelepon}
                onChange={(e) => setNoTelepon(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </label>

            <label className="block">
              <span className="text-gray-300 text-sm">Alamat:</span>
              <textarea
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </label>
          </div>

          <div className="flex flex-col gap-4 mt-6">
            <button
              onClick={handleUpdateProfile}
              disabled={loading}
              className={`w-full py-3 bg-green-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-600 transition-all duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>

            <button className="w-full py-3 bg-orange-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-orange-600 transition-all duration-300">
              <Link to="/history-payment"> History Payment</Link>
            </button>

            <button
              onClick={handleLogout}
              className="w-full py-3 bg-red-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-red-600 transition-all duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
