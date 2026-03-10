"use client";
import { useState, useEffect } from "react";
import { WifiOff } from "lucide-react";

export default function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(() =>
    typeof window !== "undefined" ? navigator.onLine : true,
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed top-0 inset-x-0 z-200 flex items-center justify-center gap-2 bg-amber-500/90 backdrop-blur-sm text-black text-sm font-medium py-2 px-4">
      <WifiOff className="w-4 h-4 shrink-0" />
      <span>You&apos;re offline — showing cached data</span>
    </div>
  );
}
