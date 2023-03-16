import React from "react";

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-auto w-full static bottom-0">
      <div className="container mx-auto py-4 flex md:justify-between md:items-center flex-wrap justify-center">
        <div className="text-xl font-bold">
          Built by <i className="fa-brands fa-ethereum"></i><a href="https://linktr.ee/ayaaneth" className="text-2xl underline cursor-pointer" target={'_blank'} rel="noopener noreferrer">moayaan.eth</a><i className="fa-brands fa-ethereum"></i>
        </div>
        <div className="text-sm">
          <span>&copy; {currentYear} All Rights Reserved</span>
        </div>
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/moayaan1911/todo-web3"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition duration-300"
          >
            Github Repo
          </a>
          <a
            href="https://youtu.be/mZiYfmovLNI"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition duration-300"
          >
            Video Demo
          </a>
          <a
            href="https://mumbaifaucet.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition duration-300"
          >
            Faucet
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
