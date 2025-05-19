import { use, useContext } from "react";
import { FiShoppingCart, FiUser, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { context } from "../Store";

export default function Header() {
  const {cart}=useContext(context)
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">
          <Link to="">Shop<span className="text-blue-600">Now</span></Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/shop" className="hover:text-blue-600">Shop</Link>
          <Link to="/about" className="hover:text-blue-600">About</Link>
          <Link to="/contact" className="hover:text-blue-600">Contact</Link>
        </nav>

        {/* Search + Icons */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FiSearch className="absolute top-3.5 left-3 text-gray-500" />
          </div>
          <FiUser className="text-2xl text-gray-700 hover:text-blue-600 cursor-pointer" />
          <Link to={"/cart"}>
            <div className="relative">
              <FiShoppingCart className="text-2xl text-gray-700 hover:text-blue-600 cursor-pointer" />
              <span className="absolute top-[-10px] right-[-10px] h-5 w-5 flex items-center justify-center
               text-[12px] rounded-full bg-green-700 text-white border ">{cart.length}</span>
            </div>
          </Link>

        </div>
      </div>
    </header>
  );
}
