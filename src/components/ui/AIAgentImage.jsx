import Image from "next/image";

export default function AIAgentImage({ className = "" }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Light Glow */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="w-[140%] h-[140%] rounded-full bg-[radial-gradient(circle,rgba(120,200,255,0.4)_0%,rgba(40,120,255,0.5)_50%,transparent_70%)] blur-[90px] animate-pulse" />
      </div>

      {/* Rotating Circle */}
      <div className="absolute inset-0 animate-spin-slow">
        <Image
          src="/images/Circle.png"
          alt="Rotating Circle"
          fill
          className="object-contain"
          sizes="(max-width: 640px) 280px, (max-width: 768px) 350px, (max-width: 1024px) 400px, (max-width: 1280px) 450px, 500px"
        />
      </div>

      {/* AI Brain */}
      <div className="relative w-[62%] h-[62%] z-10">
        <Image
          src="/images/Ai.png"
          alt="AI Brain"
          fill
          className="object-contain drop-shadow-[0_0_45px_rgba(96,180,255,0.55)]"
          sizes="(max-width: 640px) 170px, (max-width: 768px) 210px, (max-width: 1024px) 250px, (max-width: 1280px) 280px, 310px"
        />
      </div>
    </div>
  );
}
