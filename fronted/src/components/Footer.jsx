import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitterSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Company Info */}
          <div>
            <Link to="/">
              <img
                src="/Ekart.png"
                alt="Ekart Logo"
                className="w-32 mb-4"
              />
            </Link>

            <p className="text-sm leading-relaxed text-gray-400">
              Powering your world with the best in electronics. 
              Premium quality products at unbeatable prices.
            </p>

            <div className="mt-4 space-y-1 text-sm text-gray-400">
              <p>123 Electronics St, Style City, NY 10001</p>
              <p>Email: support@zaptro.com</p>
              <p>Phone: (123) 456-7890</p>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Customer Service
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer transition">
                Contact Us
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Shipping & Returns
              </li>
              <li className="hover:text-white cursor-pointer transition">
                FAQs
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Order Tracking
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Size Guide
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer transition">
                About Us
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Shop
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Blog
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Privacy Policy
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Terms & Conditions
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Subscribe
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Get updates about new products and special offers.
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 rounded-l-md text-sm text-gray-900 focus:outline-none"
              />
              <button className="bg-pink-600 hover:bg-pink-700 px-4 rounded-r-md text-sm text-white transition">
                Join
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-4 mt-6 text-xl">
              <FaFacebook className="hover:text-white cursor-pointer transition" />
              <FaInstagram className="hover:text-white cursor-pointer transition" />
              <FaPinterest className="hover:text-white cursor-pointer transition" />
              <FaTwitterSquare className="hover:text-white cursor-pointer transition" />
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Ekart. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;