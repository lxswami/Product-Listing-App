import { FiFacebook, FiInstagram, FiTwitter, FiMail } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">ShopNow</h2>
          <p className="text-sm">
            Your one-stop shop for all things fashion, tech, and lifestyle.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Men</a></li>
            <li><a href="#" className="hover:text-white">Women</a></li>
            <li><a href="#" className="hover:text-white">Accessories</a></li>
            <li><a href="#" className="hover:text-white">New Arrivals</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Careers</a></li>
            <li><a href="#" className="hover:text-white">Blog</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-white font-semibold mb-4">Connect</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <FiMail /> support@shopnow.com
            </li>
          </ul>
          <div className="flex mt-4 space-x-4 text-xl">
            <a href="#" className="hover:text-white"><FiFacebook /></a>
            <a href="#" className="hover:text-white"><FiInstagram /></a>
            <a href="#" className="hover:text-white"><FiTwitter /></a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm">
        &copy; {new Date().getFullYear()} ShopNow. All rights reserved.
      </div>
    </footer>
  );
}
