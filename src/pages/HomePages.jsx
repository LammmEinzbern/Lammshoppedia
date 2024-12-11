import React from "react";
import Header from "../components/tailus/Header";
import Hero from "../components/Home/Hero";
import ProductList from "../components/Home/ProductList";
import WhyChooseUs from "../components/Home/WhyChooseUs";
import SupportPayment from "../components/Home/SupportPayment";
import CTA from "../components/Home/CTA";
import Footer from "../components/tailus/Footer";
export default function HomePages() {
  return (
    <>
      <Header />
      <div className="m-5 overflow-x-hidden">
        <Hero />
        <ProductList />
        <WhyChooseUs />
        <SupportPayment />
        <CTA />
      </div>
      <Footer />
    </>
  );
}
