"use client";

import { useEffect, useState } from "react";
import { FiX, FiAlignCenter } from "../utils/icons";
import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import Link from "next/link";
import Modal from "./Modal";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { projects } from "../public/assets/assets";
import Image from "next/image";

const Navbar = () => {
  const //
    [isNavOpen, setIsNavOpen] = useState(false),
    [name, setName] = useState("chidile "),
    [address, setAddress] = useState("987653"),
    [isModalOpen, setIsModalOpen] = useState(false),
    [loading, setLoading] = useState(false),
    testDb = async (e) => {
      console.log("writing");
      try {
        console.log(name, address);
        const response = await axios.post("/api/users", { name, address });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    getUsers = async () => {
      console.log("reading");

      console.log((await axios.get("/api/users")).data.users);
    },
    addProject = async () => {
      for (const project of projects) {
        try {
          const response = await axios.post("/api/projects", project);
          console.log(`Document ${project} sent successfully:`, response.data);
        } catch (error) {
          console.error(`Failed to send Document ${doc.id}:`, error.message);
        }
      }
    },
    getProjects = async () => {
      console.log("reading prjs");

      console.log(await axios.get("/api/projects"));
    };
  const currentAccount = useCurrentAccount();
  const router = useRouter();
  useEffect(() => {
    if (currentAccount) {
      setLoading(true);
      router.push("/dashboard");
    }
  }, [currentAccount, router]);

  const currentPath = usePathname();
  const isActiveNav = (path) => {
    if (path === "/") {
      return currentPath === "/" ? "nav-active" : "";
    }
    return currentPath.startsWith(path) ? "nav-active" : "";
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isNavOpen) {
        setIsNavOpen(false);
      }
    };

    const handleClickOutside = (e) => {
      if (e.target.closest("svg") || e.target.closest("nav")) return;
      setIsNavOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isNavOpen]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center inset-0  w-full fixed bg-black bg-opacity-50 z-[100]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="">
      <Link href={"/"} className="fixed z-30 md:mx-16 backdrop-blur-md">
        <Image src={"/assets/brijlogo.png"} width={100} height={100}></Image>
      </Link>
      <nav className="flex justify-center mt-4 items-center fixed right-0  [&_a]:uppercase space-x-6 z-50 max-md:space-x-0 max-md:justify-end text-white dark:text-white">
        <div className="flex-1 max-md:hidden"></div>
        <div
          className={`flex space-x-4 [&_li]:cursor-pointer [&_li]:text-white pt-2 max-md:fixed max-md:flex-col max-md:inset-0 max-md:w-full max-md:bg-[#29292973] max-md:space-x-0 max-md:-z-10 max-md:pt-20 max-md:items-center max-md:h-[60%] max-md:transform max-md:transition-transform max-md:duration-300 ${
            isNavOpen
              ? "translate-x-0 opacity-100 max-md:backdrop-blur-md max-md:bg-opacity-90"
              : "max-md:-translate-x-[1000%]"
          } `}
        >
          <ul className="flex space-x-7 p-3 px-5 rounded-lg max-md:flex-col max-md:space-x-0 max-md:space-y-3 max-md:items-center max-md:justify-center lg:bg-white lg:bg-opacity-20 lg:backdrop-blur-lg">
            <Link href="/" className={isActiveNav("/")}>
              HOME
            </Link>

            <Link href="/about-us" className={isActiveNav("/about-us")}>
              ABOUT US
            </Link>

            <Link href="/projects" className={isActiveNav("/projects")}>
              PROJECTS
            </Link>

            <Link href="/reviews" className={isActiveNav("/reviews")}>
              REVIEWS
            </Link>

            <Link href="#">Partnership</Link>
            <Link href="/#contact">Contact</Link>
          </ul>
          <ul className="flex  p-3 px-5 rounded-lg max-md:flex-col max-md:text-center max-md:p-0 lg:bg-white lg:bg-opacity-20 lg:backdrop-blur-lg">
            <Link href="#">Apply For Funding</Link>
          </ul>
          {/* experimentally write to DB
          <button onClick={addProject}> DBw</button>
          experimentally read from DB
          <button onClick={getProjects}> DBr</button> */}
        </div>

        <div className="flex space-x-7 cursor-pointer pr-5 pt-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 bg-white text-black rounded-xl p-3 uppercase hover:scale-110 transition-all duration-300"
          >
            GET STARTED
          </button>
          <button
            className="hidden max-md:block"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            {isNavOpen ? (
              <FiX size={30} className="text-white" />
            ) : (
              <FiAlignCenter size={30} className="text-white" />
            )}
          </button>
        </div>
      </nav>

      {/* Modal */}
      <Modal isVisible={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4 text-black">
          Get started with Brij
        </h2>

        <div className="connect-wrapper">
          <ConnectButton
            className="custom-connect-button flex justify-center"
            connectText="Connect wallet"
          />
        </div>
      </Modal>
    </div>
  );
};

export default Navbar;
