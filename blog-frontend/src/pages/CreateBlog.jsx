import { useContext, useEffect } from "react";

import { AuthContext } from "../context/AuthContext";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import toast from "react-hot-toast";

import API from "../services/api";

import BackButton from "../components/BackButton";



function CreateBlog() {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [featured, setFeatured] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {

    if (!user) {

      navigate("/login");

    }

  }, [user]);


  const createBlog = async (e) => {
    e.preventDefault();

    try {

      await API.post(
        "/blogs",
        {
          title,
          content,
          featured,
        },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );

      toast.success("Story published");

      navigate("/blogs");

    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="h-screen bg-black text-white relative overflow-hidden px-6 py-12 flex items-center">


      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/10 blur-[150px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full" />



      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-7xl mx-auto"
      >




        <div className="flex items-center justify-between mb-8">

          <button
            onClick={() => navigate("/")}
            className="hidden sm:inline-flex items-center gap-2 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 transition-all px-5 py-2.5 rounded-xl text-zinc-300 hover:text-white"
          >

            <span>
              ←
            </span>

            <span>
              Back
            </span>

          </button>



          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none">

            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-blue-300">

              Write your next story

            </span>

          </h1>





          <div className="w-[90px]" />

        </div>




        <form
          onSubmit={createBlog}
          className="relative flex flex-col h-[72vh] mt-10 overflow-hidden rounded-[40px] border border-zinc-800 bg-zinc-900/60 backdrop-blur-xl p-8 md:p-12"
        >


          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full" />


          <div className="relative z-10 flex flex-col h-full">


            <input
              type="text"
              placeholder="Story title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-transparent border-b border-zinc-700 pb-5 text-3xl md:text-4xl font-extrabold outline-none placeholder:text-zinc-600 focus:border-purple-500 transition-all"
            />



            <textarea
              placeholder="Start writing your story..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="bg-transparent flex-1 overflow-y-auto text-xl leading-relaxed outline-none resize-none placeholder:text-zinc-600 pr-4 custom-scrollbar"
            />



            <div className="flex items-center justify-between gap-6 flex-wrap pt-6 border-t border-zinc-800 mt-6">

              <label className="flex items-center gap-3 text-zinc-300">

                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-5 h-5 accent-purple-500"
                />

                Mark as Featured

              </label>

              <button
                type="submit"
                className="bg-white text-black hover:bg-zinc-200 transition-all px-8 py-4 rounded-2xl font-semibold"
              >
                Publish Story
              </button>

            </div>

          </div>

        </form>

      </motion.div>

    </div>
  );
}

export default CreateBlog;