import React, { useEffect } from "react";
import { address, abi } from "./_context";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  useContract,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useProvider,
  useSigner,
} from "wagmi";
import Script from "next/script";
import Footer from "./_footer";
import Head from "next/head";
const Index = () => {
  const account = useAccount();
  const { data: signer } = useSigner();
  const provider = useProvider();
  const contract = useContract({
    address: address,
    abi: abi,
    signerOrProvider: signer || provider,
  });
  const [connected, setConnected] = React.useState(false);

  const [dataExists, setDataExists] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [tasks, setTasks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const handleAdd = async () => {
    const tx = await contract.addTask(content, title, false);
    setLoading(true);
    await tx.wait();
    setLoading(false);
    await setContent("");
    await setTitle("");
    fetchData();
  };

  const fetchData = async () => {
    setConnected(true);
    const data = await contract.getMyTask();
    // console.log(data)
    if (data.length == 0) {
      console.log("No data");
    } else {
      setDataExists(true);
      setTasks(data);
      // tasks.map((task) => {
      //   task.id=task.id._hex
      // })
    }
  };

  const finishTask = (key) => async () => {
    const tx = await contract.deleteTask(key);
    setLoading(true);
    await tx.wait();
    setLoading(false);
    fetchData();
  };

  useEffect(() => {
    console.log("tasks");
    window.ethereum.on("accountsChanged", function (accounts) {
      window.location.reload();
    });
    window.ethereum.on("chainChanged", function (accounts) {
      alert("Please switch to Polygon Mumbai Testnet");
    });
    window.ethereum.on("disconnect", function (accounts) {
      window.location.reload();
      alert("Please connect to your wallet");
    });
    window.ethereum.on("message", function (accounts) {
      window.location.reload();
    });
  });
  return (
    <div className="flex flex-col h-screen justify-between">
      <Head>
        <meta name="title" content="OnChain Notes" />
        <title>OnChain Notes</title>
        <meta
          name="description"
          content="Store notes on Blockchain with a Decentralized Notes Platform built using Solidity and Next.js"
        />
        <meta
          name="keywords"
          content="Decentralized, Notes, Decentralized Notes App, WEB3 Todo List, Todo List Solidity, OnChain Notes, Next.js Todo List, online notes, temporary notes, todo list"
        />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="author" content="moayaan.eth Mohammad Ayaan Siddiqui" />
        <link rel="icon" href="/icon.jpg" />
      </Head>
      <Script
        src="https://kit.fontawesome.com/9b9304f5bd.js"
        crossorigin="anonymous"
      ></Script>
      <div className="flex flex-row justify-between bg-black text-white items-center ">
        <h1 className="md:text-4xl md:font-bold md:m-4 text-xl m-2 font-semibold items-center">
          OnChain Notes 📝
        </h1>
        <div className="md:m-4 m-2">
          <ConnectButton />
        </div>
      </div>
      <div className="flex items-center justify-center text-center flex-col">
        <input
          type="text"
          placeholder="Enter Note Title"
          className="border-2 border-black p-2 rounded-lg m-2 mt-7"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Note Text"
          className="border-2 border-black p-2 rounded-lg m-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className="bg-black text-white p-2 rounded-lg m-2"
          onClick={() => handleAdd()}
        >
          Add Note
        </button>
      </div>
      <div
        className="flex items-center justify-center text-center flex-col mt-14"
        onClick={fetchData}
      >
        <a
          href="#_"
          className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"
        >
          <span className="w-48 h-48 rounded rotate-[-40deg] bg-purple-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
          <span
            className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white"
            onClick={fetchData}
          >
            Fetch my Notes{" "}
          </span>
        </a>
      </div>
      {loading && (
        <div class="flex items-center justify-center flex-col">
        <h1 className="md:text-4xl md:font-bold md:m-4 text-sm m-2 font-semibold items-center text-center">
          Transacting on Blockchain, please wait for confirmation
        </h1>
          <div
            class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      )}
      {connected && dataExists && !loading && (
        <div>
          <h1 className="md:text-4xl md:font-bold md:m-4 text-xl m-2 font-semibold items-center text-center">
            My Notes 📝
          </h1>
          {/* <div className="flex flex-wrap">
            <div className="w-full sm:w-1/2 md:w-1/4 p-4">
              {tasks.map((task) => {
                <div className="bg-blue-100 rounded-lg p-4">
                  <h2 className="text-lg font-semibold">{9}</h2>
                  <p className="text-gray-700 mt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam vel porta nibh.
                  </p>
                  <div
                    className="flex flex-row  items-center
"
                  >
                    <button
                      className="bg-green-500 text-white p-3 rounded-lg m-2 mt-3"
                      title="Task Finished"
                    >
                      <i className="fa-solid fa-check"></i>
                    </button>
                    <p className="text-gray-700 m-3 italic">Task id:- </p>
                  </div>
                </div>;
              })}
            </div>
          </div> */}
          <div className="flex flex-wrap">
            {tasks.map((task) => (
              <div className="w-full sm:w-1/3 md:w-1/4 p-4 " key={task.id}>
                <div className="bg-blue-100 rounded-lg p-4">
                  <h2 className="text-lg font-semibold">{task.taskTitle}</h2>
                  <p className="text-gray-700 mt-2">{task.taskText}</p>
                  <div className="flex flex-row items-center">
                    <button
                      className="bg-green-500 text-white p-3 rounded-lg m-2 mt-3"
                      title="Finish Task"
                      onClick={finishTask(task.id)}
                    >
                      <i className="fa-solid fa-check-double"></i>
                    </button>
                    <p className="text-gray-700 m-3 italic">
                      Task id:- {task.id._hex}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {connected && !dataExists && (
        <div className="flex items-center justify-center text-center flex-col mt-14">
          <h1 className="md:text-4xl md:font-bold md:m-4 text-xl m-2 font-semibold items-center text-center">
            No Notes Found{" "}
          </h1>
          <h2 className="md:text-4xl md:font-bold md:m-4 text-xl bg-green-200 m-2 font-semibold items-center text-center">
            Add Notes to get started{" "}
          </h2>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Index;
