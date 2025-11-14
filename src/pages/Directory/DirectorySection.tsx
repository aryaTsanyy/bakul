import DirectoryTopSection from "@/components/Directory/DirectoryTopSection";
import UMKMListSection from "@/components/Directory/ListUmkmSection";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import React from "react";

const DirectorySection = () => {
  return (
    <main className="w-full h-full pt-24">
      <Navbar />
      <div>
        <DirectoryTopSection />
        <UMKMListSection />
      </div>
      <Footer />
    </main>
  );
};

export default DirectorySection;
