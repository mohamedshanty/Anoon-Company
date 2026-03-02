import Link from "next/link";
import Image from "next/image";

export default function NavBrand({ scrolled }) {
  return (
    <Link href="/" className="flex items-center group shrink-0">
      <Image
        src="/images/logo1.png"
        alt="Logo"
        width={90}
        height={40}
        priority
        className={`w-auto h-7 sm:h-8 md:h-10 transition-transform duration-300 ${
          !scrolled ? "drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" : ""
        }`}
      />
    </Link>
  );
}
