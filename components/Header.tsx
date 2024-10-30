import React from "react";
import Image from "next/image";
import Link from "next/link";
import LoginButton from "./LoginButton";

const Header = () => {
  return (
    <div className="flex justify-between m-2 sm:px-4">
      <Link className="flex items-center border rounded-full p-2 px-3" href="/">
        <Image
          src="/bnblogo.png"
          alt="BNB Logo"
          width={40}
          height={40}
          priority={true}
        />
        <span className="ml-2 font-bold text-xl">stay</span>
      </Link>
      <LoginButton />
    </div>
  );
};

export default Header;
