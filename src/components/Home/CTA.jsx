import React from "react";

const CTA = () => {
  return (
    <section
      id="cta"
      className="mb-20 bg-gray-600 rounded-lg "
      style={{
        background:
          "linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)),url('https://steamuserimages-a.akamaihd.net/ugc/1796348505051547888/F5A0BA51358667E078B489A9B71E493770A4A50A/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col items-center gap-4 p-20 max-lg:p-10 max-lg:h-50 max-lg:text-center">
        <h2 className="text-white text-4xl font-bold">
          Tertarik berbelanja disini?
        </h2>
        <p className="text-white">silahkan klik tombol dibawah ini!</p>

        <button className="btn bg-white hover:bg-red-400 border-none text-black">
          Belanja Sekarang
        </button>
      </div>
    </section>
  );
};

export default CTA;
