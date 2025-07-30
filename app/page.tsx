"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/vendors");
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="mx-auto w-[600px] bg-myBlack rounded-xl overflow-hidden drop-shadow-2xl">
        <div className="bg-myGrey flex items-center p-[20px] text-white relative rounded-t-xl">
          <div className="flex absolute left-3 space-x-2">
            <span className="h-3.5 w-3.5 bg-[#ff605c] rounded-full transition-all hover:scale-125 hover:bg-[#ff3b36]"></span>
            <span className="h-3.5 w-3.5 bg-[#ffbd44] rounded-full transition-all hover:scale-125 hover:bg-[#ffaa33]"></span>
            <span className="h-3.5 w-3.5 bg-[#00ca4e] rounded-full transition-all hover:scale-125 hover:bg-[#00b44e]"></span>
          </div>

          <div className="flex-1 text-center text-white font-semibold text-lg relative animate-pulse">
            <div className="text-xl">Loading...</div>
          </div>

          <div className="absolute w-full bottom-0 left-0 bg-[#333333] h-1 rounded-t-xl">
            <div className="w-[30%] bg-myViolet h-full animate-progressBar"></div>
          </div>
        </div>

        <div className="flex bg-[#121212] p-8 justify-center items-center h-[450px]">
          <div className="text-center space-y-6">
            <div className="w-24 h-24 border-4 border-t-myViolet border-gray-700 rounded-full animate-spin mx-auto"></div>
            <div className="text-myViolet font-semibold text-4xl opacity-90 animate-fadeIn">
              Almost There...
            </div>
            <div className="text-[#9e9e9e] text-sm opacity-80 animate-fadeIn">
              <p>We&apos;re getting everything ready for you...</p>
              <p>Sit tight for just a moment.</p>
            </div>
          </div>
        </div>

        <div className="bg-myGrey p-4 text-center text-gray-400 text-xs font-mono">
          <p>Appreciate your patience. Almost there!</p>
        </div>
      </div>
    </div>
  );
}
