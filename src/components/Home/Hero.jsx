import React, { Component } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export class Hero extends Component {
  render() {
    const FADE_DOWN_ANIMATION_VARIANTS = {
      hidden: { opacity: 0, y: -10 },
      show: { opacity: 1, y: 0, transition: { type: "spring" } },
    };
    return (
      <section id="home" className=" max-lg:pt-24">
        <div className="bg-yellow-300 dark:bg-gray-700 rounded-md p-10 md:p-14 flex flex-col md:flex-row items-center justify-between h-auto md:h-[520px] max-lg:text-center">
          <div className="w-full md:w-1/2">
            <motion.div
              initial="hidden"
              animate="show"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.15,
                  },
                },
              }}
            >
              <motion.h1
                className="text-white font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] drop-shadow-sm md:leading-[4rem] lg:leading-[5rem]"
                variants={FADE_DOWN_ANIMATION_VARIANTS}
              >
                Selamat Datang Pelanggan! Di{" "}
                <span className="font-bold text-red-400 text-5xl">
                  Lammshoppedia
                </span>
                !
              </motion.h1>
              <motion.p
                className="mt-4 text-lg md:text-2xl text-white"
                variants={FADE_DOWN_ANIMATION_VARIANTS}
              >
                <span className="font-bold text-red-400 text-2xl">
                  Lammshoppedia
                </span>{" "}
                menyediakan berbagai macam produk yang berkualitas dan
                terpercaya!.
              </motion.p>
              <motion.div
                className="mx-auto mt-6 flex justify-center md:justify-start"
                variants={FADE_DOWN_ANIMATION_VARIANTS}
              >
                <Link
                  to="/product"
                  className="btn border-none bg-white text-gray-800 hover:bg-red-400  rounded-xl px-5 py-3 mt-4 transition duration-300"
                >
                  Belanja Sekarang
                </Link>
              </motion.div>
            </motion.div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0">
            <img
              src="./public/selfcheckout-amico.svg"
              alt="Shopping Illustration"
              className="w-full max-w-[400px] md:max-w-[500px]"
            />
          </div>
        </div>
      </section>
    );
  }
}

export default Hero;
