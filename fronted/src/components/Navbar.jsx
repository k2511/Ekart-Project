import { ShoppingCart, Menu, X } from "lucide-react"; // Menu और X icons ऐड किए
import React, { useState } from "react"; // Mobile menu के लिए state
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/userSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.user);
  const { cart } = useSelector((store) => store.product);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false); // Mobile sidebar state

  const admin = user?.role === "admin" ? true : false;
  const accessToken = localStorage.getItem("accessToken");

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (res.data.success) {
        dispatch(setUser(null));
        toast.success(res.data.message);
        setIsOpen(false); // Logout के बाद menu बंद कर दें
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="bg-pink-50 fixed w-full top-0 left-0 z-50 border-b border-pink-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-4 md:px-8">
        
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <Link to="/">
            <img src="/Ekart.png" alt="Logo" className="w-[80px] md:w-[100px]" />
          </Link>
        </div>

        {/* Desktop Navigation (Hidden on Mobile) */}
        <nav className="hidden md:flex gap-10 items-center">
          <ul className="flex gap-7 items-center text-lg font-semibold text-gray-700">
            <Link to={"/"} className="hover:text-pink-600 transition"><li>Home</li></Link>
            <Link to={"/products"} className="hover:text-pink-600 transition"><li>Products</li></Link>
            {user && (
              <Link to={`/profile/${user._id}`} className="hover:text-pink-600 transition">
                <li>Hello, {user.firstName} 👋</li>
              </Link>
            )}
            {admin && (
              <Link to={`/dashbord/sales`} className="hover:text-pink-600 transition">
                <li>Dashboard</li>
              </Link>
            )}
          </ul>
        </nav>

        {/* Right Side Icons & Auth (Desktop + Mobile) */}
        <div className="flex items-center gap-4 md:gap-6">
          <Link to={"/cart"} className="relative p-2">
            <ShoppingCart className="w-6 h-6" />
            <span className="bg-pink-500 rounded-full absolute text-white -top-1 -right-1 px-1.5 text-xs font-bold">
              {cart?.items?.length || 0}
            </span>
          </Link>

          {/* Desktop Login/Logout */}
          <div className="hidden md:block">
            {user ? (
              <Button onClick={logoutHandler} className="bg-pink-600 text-white">Logout</Button>
            ) : (
              <Button onClick={() => navigate("/login")} className="bg-gradient-to-tl from-blue-600 to-purple-600 text-white">
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button className="md:hidden p-2 text-pink-600" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div className={`md:hidden absolute top-[100%] left-0 w-full bg-pink-50 border-b border-pink-200 transition-all duration-300 ease-in-out ${isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-5"}`}>
        <ul className="flex flex-col items-center gap-5 py-6 font-semibold text-gray-700">
          <Link to="/" onClick={() => setIsOpen(false)}><li>Home</li></Link>
          <Link to="/products" onClick={() => setIsOpen(false)}><li>Products</li></Link>
          {user && (
            <Link to={`/profile/${user._id}`} onClick={() => setIsOpen(false)}>
              <li>Profile ({user.firstName})</li>
            </Link>
          )}
          {admin && (
            <Link to={`/dashbord/sales`} onClick={() => setIsOpen(false)}>
              <li>Dashboard</li>
            </Link>
          )}
          <div className="pt-2">
            {user ? (
              <Button onClick={logoutHandler} className="bg-pink-600 text-white w-32">Logout</Button>
            ) : (
              <Button onClick={() => { navigate("/login"); setIsOpen(false); }} className="bg-gradient-to-tl from-blue-600 to-purple-600 text-white w-32">
                Login
              </Button>
            )}
          </div>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;