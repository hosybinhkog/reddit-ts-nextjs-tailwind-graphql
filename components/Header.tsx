import Image from "next/image";
import React from "react";

import { ChevronDownIcon, HomeIcon, SearchIcon } from "@heroicons/react/solid";
import {
  BellIcon,
  ChatIcon,
  GlobeIcon,
  MenuIcon,
  PlusIcon,
  SparklesIcon,
  SpeakerphoneIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";

const Header = () => {
  return (
    <header className="w-full fixed top-0 z-50 flex items-center px-4 bg-white shadow-sm">
      <div className="relative h-10 w-20 cursor-pointer flex-shrink-0">
        <Image
          objectFit="contain"
          src="https://links.papareact.com/fqy"
          layout="fill"
        />
      </div>
      <div className="flex items-center mx-7 xl:min-w-[300px]">
        <HomeIcon className="h-5 w-5" />
        <p className="flex-1 ml-2 hidden lg:inline">Home</p>
        <ChevronDownIcon className="h5 w-5" />
      </div>

      {/*=================SEARCH BOX====================*/}
      <form className="flex flex-1 items-center space-x-2 border border-gray-200 rounded-sm bg-gray-100 px-3 py-1">
        <SearchIcon className="h-6 w-6 text-gray-400" />
        <input
          className="flex-1 bg-transparent outline-none"
          type="text"
          placeholder="Search Reddit"
        />
        <button type="submit" hidden />
      </form>

      <div className="items-center space-x-2 text-gray-500 mx-5 hidden lg:inline-flex">
        <SparklesIcon className="icon" />
        <GlobeIcon className="icon" />
        <VideoCameraIcon className="icon" />
        <hr className="h-10 border border-gay-100" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <PlusIcon className="icon" />
        <SpeakerphoneIcon className="icon" />
      </div>
      <div className="ml-5 flex items-center lg:hidden">
        <MenuIcon className="icon" />
      </div>

      {/* Action Login && Logout */}
      <div className="hidden lg:flex lg:items-center cursor-pointer space-x-2 border border-gray-100 p-2">
        <div className="relative h-5 w-5  flex-shrink-0">
          <Image
            src="https://links.papareact.com/23l"
            alt="images"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <p className="text-gray-400">Sign In</p>
      </div>
    </header>
  );
};

export default Header;
