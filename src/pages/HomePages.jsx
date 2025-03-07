import React from "react";
import Header from "../components/tailus/Header";
import Hero from "../components/Home/Hero";
import ProductList from "../components/Home/ProductList";
import WhyChooseUs from "../components/Home/WhyChooseUs";
import SupportPayment from "../components/Home/SupportPayment";
import CTA from "../components/Home/CTA";
import Footer from "../components/tailus/Footer";
import FloatingButton from "../components/FloatingButton";
import { Helmet } from "react-helmet-async";
export default function HomePages() {
  return (
    <>
      <Helmet>
        <title>Lammshoppedia</title>
        <meta name="description" content="haloha minna!" />
        <meta name="keyword" content="toko murah, toko bagus" />
      </Helmet>
      <Header />
      <div className="m-5 overflow-x-hidden">
        <Hero />
        <ProductList />
        <WhyChooseUs />
        <SupportPayment />
        <CTA />
        <FloatingButton />
      </div>
      <Footer />
    </>
  );
}
