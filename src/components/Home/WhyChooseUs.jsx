import React from "react";
import CardChoose from "../daisyui/CardChoose";

const WhyChooseUs = () => {
  return (
    <div className="py-12">
      <h2 className="text-5xl font-bold text-center mb-10 text-black dark:text-white">
        Kenapa memilih kami?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        <CardChoose
          title="Reason 1"
          description="Lorem ipsum dolor sit amet consectetur, adipisicing elit."
          image="/selfcheckout-amico.svg"
        />
        <CardChoose
          title="Reason 2"
          description="Harum, minus quos! Officiis non sapiente, odit corrupt."
          image="/selfcheckout-amico.svg"
        />
        <CardChoose
          title="Reason 3"
          description="Laboriosam ipsa expedita ipsam, ducimus repellat delectus."
          image="/selfcheckout-amico.svg"
        />
        <CardChoose
          title="Reason 4"
          description="Fuga neque maxime inventore!"
          image="/selfcheckout-amico.svg"
        />
        <CardChoose
          title="Reason 5"
          description="Officiis non sapiente, odit corrupt."
          image="/selfcheckout-amico.svg"
        />
        <CardChoose
          title="Reason 6"
          description="Laboriosam ipsa expedita ipsam, ducimus repellat delectus."
          image="/selfcheckout-amico.svg"
        />
      </div>
    </div>
  );
};

export default WhyChooseUs;
