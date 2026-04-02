"use client";

import dynamic from "next/dynamic";

const PhoneMockup = dynamic(() => import("./PhoneMockup"), {
  ssr: false,
  loading: () => (
    <div className="mx-auto w-[320px] h-[660px] rounded-[3rem] border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 animate-pulse" />
  ),
});

export default PhoneMockup;
