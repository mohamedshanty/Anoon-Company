"use client";

import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import Image from "next/image";
import Button from "../ui/Button";

export default function Footer() {
  return (
    <footer className="pt-20 pb-10">
      <div className="main-container">
        <div className="grid lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/footer.png"
                alt="footer"
                width={200}
                height={200}
              />
            </Link>
            <p className="text-white leading-relaxed mb-6 max-w-sm">
              OurStudio is a digital agency UI/UX Design and Website Development
              located in Ohio, United States of America
            </p>
          </div>

          {/* Get in Touch */}
          <div>
            <h4 className="text-white font-bold text-lg mb-8">Get in Touch</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <span className="text-white">
                  8819 Ohio St. South Gate, CA 90280
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <span className="text-white">Ourstudio@hello.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <span className="text-white">+1 386-688-3295</span>
              </li>
            </ul>
          </div>

          {/* Social & Description */}
          <div>
            <div className="flex gap-4 mb-8">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <button
                  key={i}
                  className="text-white hover:text-orange-500 transition-colors duration-300 cursor-pointer"
                >
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
            <p className="text-white text-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod.
            </p>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold text-lg mb-8">
              Join a Newsletter
            </h4>
            <div className="space-y-4">
              <p className="text-white text-sm">Your Email</p>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="w-full px-4 py-3 bg-transparent border border-gray-300 rounded-lg text-white placeholder-white focus:outline-none focus:border-orange-500 transition-colors"
                />
                <div className="mt-5">
                  <Button variant="filled" color="orange">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-gray-800">
          <p className="text-white text-sm">Copyright ANoon LLC</p>
        </div>
      </div>
    </footer>
  );
}
