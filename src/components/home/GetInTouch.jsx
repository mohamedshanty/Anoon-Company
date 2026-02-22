"use client";

import { Mail } from "lucide-react";
import { Phone } from "lucide-react";
import React from "react";

const GetInTouch = () => {
  return (
    <section className="py-24">
      <div className="main-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Form + Contact Info */}
          <div className="space-y-8">
            <div className="mb-12">
              <h2 className="font-medium">
                Get in <span className="text-sky-400">Touch</span>
              </h2>
              <p className="mt-2 text-gray-300">
                Your Opinion is what makes the difference
              </p>
            </div>
            {/* Form */}
            <form className="space-y-6">
              <input
                type="text"
                placeholder="Name *"
                className="w-full p-4 rounded-md bg-transparent border border-gray-300 placeholder-gray-400 outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-4 rounded-md bg-transparent border border-gray-300 placeholder-gray-400 outline-none"
              />
              <input
                type="tel"
                placeholder="Phone number *"
                className="w-full p-4 rounded-md bg-transparent border border-gray-300 placeholder-gray-400 outline-none"
              />
              <select
                defaultValue=""
                className="w-full p-4 rounded-md bg-transparent border border-gray-300 outline-none text-gray-400"
              >
                <option value="" disabled>
                  How did you find us?
                </option>
                <option value="google" className="text-brand-blue">
                  Google
                </option>
                <option value="friend" className="text-brand-blue">
                  Friend
                </option>
                <option value="social" className="text-brand-blue">
                  Social Media
                </option>
              </select>

              <button
                type="submit"
                className="w-full py-4 bg-sky-400 hover:bg-sky-500 rounded-md font-semibold transition"
              >
                SEND NOW
              </button>
            </form>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-16">
                <div className="flex items-center gap-5">
                  <Phone className="text-white" size={25} />
                  <div>
                    <p className="font-semibold">PHONE</p>
                    <p className="text-gray-300">+972 567098648</p>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <Mail className="text-white" size={25} />
                  <div>
                    <p className="font-semibold">EMAIL</p>
                    <p className="text-gray-300">info@anoonsolutions.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Google Map */}
          <div className="w-full rounded-md overflow-hidden">
            <iframe
              title="Company Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0921962908023!2d106.82496491476962!3d-6.202044195495702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d5a5e0efb1%3A0x5c4a6f23456789ab!2sKebon%20Melati!5e0!3m2!1sen!2sid!4v1600000000000!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              suppressHydrationWarning={true}
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
