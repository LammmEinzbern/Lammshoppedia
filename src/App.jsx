import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePages from "./pages/HomePages";
import AboutPages from "./pages/AboutPages";
import ContactPages from "./pages/ContactPages";
import DetailProductPages from "./pages/DetailProductPages";
import ProductsPage from "./pages/ProductsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/about" element={<AboutPages />} />
        <Route path="/contact" element={<ContactPages />} />
        <Route path="/detail/:id" element={<DetailProductPages />} />
        <Route path="/product" element={<ProductsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
