import React, { useEffect, useState } from "react";
import Header from "../components/tailus/Header";
import Footer from "../components/tailus/Footer";
import Sidebar from "../components/Product/Sidebar";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/SupaNiga";
import FloatingButton from "../components/FloatingButton";
import { useSearchParams } from "react-router-dom";
import AllProduct from "../components/Product/AllProduct";
import { Helmet } from "react-helmet-async";

const ProductsPage = () => {
  const [shortby, setShortBy] = useState();
  const [kategori, setKategori] = useState([]);
  const [shortbyclien, setShortByClien] = useState();

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchProduk, setSearchProduk] = useState(
    searchParams.get("search") || ""
  );

  useEffect(() => {
    const params = {
      ...Object.fromEntries(searchParams),
      search: searchProduk,
      k: kategori,
    };
    if (!searchProduk) delete params.search;
    setSearchParams(params);
  }, [searchProduk, setSearchProduk, kategori]);

  const paramsData = {
    kategori: searchParams.getAll("k"),
    search: searchParams.get("search"),
  };

  const { data: product } = useQuery({
    queryKey: ["product", shortby, kategori, paramsData.search],
    queryFn: async () => {
      let query = supabase.from("barang").select("*");

      if (shortby === "termahal") {
        query = query.order("harga", { ascending: false });
      } else if (shortby === "termurah") {
        query = query.order("harga", { ascending: true });
      }
      if (kategori.length > 0) {
        query = query.in("jenis_barang", paramsData.kategori);
      }

      if (paramsData.search) {
        query = query.ilike("nama_barang", `%${paramsData.search}%`);
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

  return (
    <>
      <Helmet>
        <title>{`Lis Produg - ${product?.length}`}</title>
        <meta name="description" content="haloha minna!" />
        <meta name="keyword" content="toko murah, toko bagus" />
      </Helmet>
      <Header />

      <main className="m-4 flex flex-col lg:flex-row gap-4 h-full">
        <Sidebar
          setShortBy={setShortBy}
          setKategori={setKategori}
          setShortByClien={setShortByClien}
        />

        <div className="w-full lg:w-4/5">
          <AllProduct
            product={product}
            searchProduct={searchProduk}
            setSearchProduk={setSearchProduk}
          />
        </div>
      </main>
      <FloatingButton />
      <Footer />
    </>
  );
};

export default ProductsPage;
