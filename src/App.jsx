import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePages from "./pages/HomePages";
import AboutPages from "./pages/AboutPages";
import ContactPages from "./pages/ContactPages";
import DetailProductPages from "./pages/DetailProductPages";
import ProductsPage from "./pages/ProductsPage";
import Login from "./Auth/LoginPages";
import CounterApp from "./pages/CounterApp";
import Register from "./Auth/RegisterPage";
import { useEffect } from "react";
import { useAuth } from "./utils/store/useAuth";
import Profile from "./pages/Profile";
import AuthRoute from "./Auth/AuthRoute";
import ProtectedAuth from "./Auth/ProtectedAuth";
import { useCart } from "./utils/store/useCart";
import Cart from "./components/Home/Cart";

function App() {
  const { fetchUser, loading } = useAuth();
  const { fetchcart } = useCart();

  useEffect(() => {
    fetchcart();
    fetchUser();
  }, [fetchUser, fetchcart]);

  if (loading) {
    return (
      <h2 className="text-center h-screen flex justify-center items-center text-2xl">
        Loading...
      </h2>
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/about" element={<AboutPages />} />
        <Route path="/contact" element={<ContactPages />} />
        <Route path="/detail/:id" element={<DetailProductPages />} />
        <Route path="/product" element={<ProductsPage />} />
        <Route path="/count" element={<CounterApp />} />
        <Route path="/cart" element={<Cart />} />

        <Route element={<AuthRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route element={<ProtectedAuth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
