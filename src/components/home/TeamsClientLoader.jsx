"use client";
// Client-only loader — wraps the Swiper-heavy TeamsServer with ssr:false
// so Swiper's JS is never included in the server bundle.
import dynamic from "next/dynamic";

const TeamsServer = dynamic(() => import("./TeamsServer"), { ssr: false });

export default function TeamsClientLoader(props) {
  return <TeamsServer {...props} />;
}
