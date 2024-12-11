import React from "react";

const HeroSection = () => {
  return (
    <section className="p-8">
      <div className="bg-gray-600 p-8 rounded-lg flex flex-col md:flex-row items-center justify-between my-8 mx-auto max-w-7xl">
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-4xl font-bold text-white">Lorem ipsum dolor</h1>
          <p className="text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat,
            minima consequuntur soluta magni quibusdam perspiciatis.
          </p>
          <button className="px-6 py-2 bg-white text-black font-semibold rounded-md hover:bg-yellow-700 transition duration-200">
            Belanja Sekarang
          </button>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          <img
            src="./public/selfcheckout-amico.svg"
            alt="Shopping Illustration"
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
