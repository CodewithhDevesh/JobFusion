import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-6 lg:px-16">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-semibold text-white">Company Name</h2>
            <p className="mt-2 text-sm text-gray-400">
              Innovating the Future, One Step at a Time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-2 space-y-2">
              {["Home", "About", "Services", "Contact"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <p className="mt-2 text-sm text-gray-400">📍 1234 Street, City, Country</p>
            <p className="mt-1 text-sm">
              📧{" "}
              <a href="mailto:contact@company.com" className="hover:text-white transition duration-300">
                contact@company.com
              </a>
            </p>
            <p className="mt-1 text-sm">
              📞{" "}
              <a href="tel:+11234567890" className="hover:text-white transition duration-300">
                +1 (123) 456-7890
              </a>
            </p>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center md:justify-start mt-6 space-x-5">
          {[
            { icon: <FaLinkedinIn />, link: "#" },
            { icon: <FaFacebookF />, link: "#" },
            { icon: <FaTwitter />, link: "#" },
            { icon: <FaInstagram />, link: "#" },
          ].map(({ icon, link }, index) => (
            <a key={index} href={link} className="text-gray-400 hover:text-white transition duration-300 text-lg">
              {icon}
            </a>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="mt-6 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Company Name. All Rights Reserved.</p>
          <p className="mt-1">
            <a href="#" className="hover:text-white transition duration-300">Privacy Policy</a> |
            <a href="#" className="ml-2 hover:text-white transition duration-300">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
