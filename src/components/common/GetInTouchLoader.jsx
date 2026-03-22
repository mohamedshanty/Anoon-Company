"use client";
// Client-only loader — defers GSAP + reCAPTCHA GetInTouch to the client
// so its heavy deps never inflate the server bundle or block SSR.
import dynamic from "next/dynamic";

const GetInTouch = dynamic(() => import("./GetInTouch"), { ssr: false });

export default function GetInTouchLoader(props) {
  return <GetInTouch {...props} />;
}
