import Image from "next/image";
import React from "react";

const Testimonials = () => {
  return (
    <div className="flex items-center justify-center p-6">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12">
        {/* Card 1 - Alla */}
        <div className="bg-white rounded-2xl px-12 py-10 relative transform -skew-x-10">
          <div className="skew-x-10">
            <div className="flex items-center gap-6 mb-4">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-100 shadow-sm shrink-0">
                <Image
                  src="/images/alaa.png"
                  alt="Alla Abu Hamaza"
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-black leading-tight">
                  Alla Abu Hamaza
                </h4>
                <p className="text-brand-sky text-2xl font-bold italic tracking-tight">
                  Front End Development
                </p>
              </div>
            </div>

            <div className="relative px-5">
              {/* Top Vector Quote */}
              <div className="absolute -top-2 -left-8">
                <Image
                  src="/images/quote1.png"
                  alt="quote"
                  width={100}
                  height={100}
                />
              </div>

              <p className="text-gray-500 text-sm leading-relaxed italic font-normal text-center px-4 py-10">
                Thank You Tamkeen I Didn&apos;t just make money i was able to
                achieve my dreams, i know that i have the skill but you give me
                the tools and platform and the network i need it was a lovely
                journey, yes it was taught but we made it through together
              </p>

              {/* Bottom Vector Quote (Rotated) */}
              <div className="absolute -bottom-6 -right-4">
                <Image
                  src="/images/quote.png"
                  alt="quote"
                  width={100}
                  height={100}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 - Yazan */}
        <div className="bg-white rounded-2xl px-12 py-10 relative transform -skew-x-10">
          <div className="skew-x-10">
            <div className="flex items-center gap-6 mb-4">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-100 shadow-sm shrink-0">
                <Image
                  src="/images/yazan.png"
                  alt="Yazan Deher"
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-black leading-tight">
                  Yazan Deher
                </h4>
                <p className="text-brand-sky text-2xl font-bold italic tracking-tight">
                  UI UX Designer
                </p>
              </div>
            </div>

            <div className="relative px-5">
              {/* Top Vector Quote */}
              <div className="absolute -top-2 -left-8">
                <Image
                  src="/images/quote1.png"
                  alt="quote"
                  width={100}
                  height={100}
                />
              </div>

              <p className="text-gray-500 text-sm leading-relaxed italic font-normal text-center px-4 py-10">
                I Believe That i was my destiny, i am amazing UX Designer yet i
                learned a lot of empathy from the staff i needed a place to feel
                where i belong and i found it here, Now i am in a better place,
                happy where i am and still rising and i will never give up
              </p>

              {/* Bottom Vector Quote (Rotated) */}
              <div className="absolute -bottom-6 -right-4">
                <Image
                  src="/images/quote.png"
                  alt="quote"
                  width={100}
                  height={100}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
