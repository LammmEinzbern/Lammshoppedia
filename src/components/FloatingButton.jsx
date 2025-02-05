import React from "react";
import { Link } from "react-router-dom";

const FloatingButton = () => {
  return (
    <Link
      to={
        "https://wa.me/+6285824697925?text=Haloooo%20bolehhh%20kenalan%20gaaa?"
      }
      target="blank"
      className="fixed bottom-4 right-12 flex items-center bg-green-500 p-2 rounded-lg gap-1"
    >
      <img src="./whatsapp.jpg" alt="" className="size-5" />
      <h2 className="text-white font-bold">Hubungi Kami</h2>
    </Link>
  );
};

export default FloatingButton;
