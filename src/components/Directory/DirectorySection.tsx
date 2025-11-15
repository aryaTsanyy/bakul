import DirectoryTopSection from "@/components/Directory/TopSection/DirectoryTopSection";
import UMKMListSection from "@/components/Directory/ListSection/ListUmkmSection";
import React from "react";

const DirectorySection = () => {
  return (
    <main className="w-full h-full pt-24">
      <div>
        <DirectoryTopSection />
        <UMKMListSection />
      </div>
    </main>
  );
};

export default DirectorySection;
