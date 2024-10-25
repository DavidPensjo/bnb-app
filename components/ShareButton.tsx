"use client";

import { Share } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const ShareButton = () => {
  const handleShareClick = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        toast("Copied link to clipboard");
      })
      .catch((error) => {
        console.error("Failed to copy the link: ", error);
      });
  };

  return (
    <>
      <div
        onClick={handleShareClick}
        className="bg-white rounded-full w-10 h-10 flex justify-center items-center shadow-xl cursor-pointer"
      >
        <Share size={24} />
      </div>
    </>
  );
};

export default ShareButton;
