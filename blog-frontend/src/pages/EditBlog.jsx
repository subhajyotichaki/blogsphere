import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { motion } from "framer-motion";

import toast from "react-hot-toast";

import API from "../services/api";

import ConfirmModal from "../components/ConfirmModal";

function EditBlog() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);


  useEffect(() => {
    fetchBlog();
  }, []);


  const fetchBlog = async () => {

    try {

      const response = await API.get(`/blogs/${id}`);

      setTitle(response.data.title);
      setContent(response.data.content);
    } catch (error) {
      console.log(error);
    }
  };


  const updateBlog = async (e) => {

    e.preventDefault();

    try {

      await API.put(
        `/blogs/${id}`,
        {
          title,
          content,
        },
        {
          headers: {
            authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token
              }`,
          },
        }
      );

      toast.success("Story updated");

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
            onClick={() => navigate("/blogs")}
            className="hidden sm:inline-flex items-center gap-2 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 transition-all px-5 py-2.5 rounded-xl text-zinc-300 hover:text-white"
          >

            <span>
              ←
            </span>

            <span>
              Back
            </span>

          </button>



          <div>

            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-none">

              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-blue-300">

                Edit your story

              </span>

            </h1>




          </div>



          <div className="w-[90px]" />

        </div>




        <form
          onSubmit={updateBlog}
          className="relative flex flex-col h-[72vh] mt-10 overflow-hidden rounded-[40px] border border-zinc-800 bg-zinc-900/60 backdrop-blur-xl p-8 md:p-12"
        >


          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full" />


          <div className="relative z-10 flex flex-col h-full">


            <input
              type="text"
              placeholder="Story title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-transparent border-b border-zinc-800 pb-5 text-4xl md:text-5xl font-black outline-none placeholder:text-zinc-700 focus:border-purple-500 transition-all"
            />



            <textarea
              placeholder="Update your story..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="bg-transparent flex-1 overflow-y-auto text-xl leading-relaxed outline-none resize-none placeholder:text-zinc-600 pr-4 custom-scrollbar"
            />



            <div className="flex items-center justify-between pt-5 border-t border-zinc-800 mt-5">






              <button
                type="button"
                onClick={() => setShowUpdateModal(true)}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-[1.02] transition-all duration-300 px-6 py-3 rounded-xl font-medium text-white shadow-[0_0_40px_rgba(168,85,247,0.25)]"
              >
                Update Story
              </button>

            </div>

          </div>

        </form>

      </motion.div>

      <ConfirmModal
        isOpen={showUpdateModal}
        title="Update Story"
        message="Are you sure you want to save these changes to your story?"
        confirmText="Update"
        onCancel={() => setShowUpdateModal(false)}
        onConfirm={(e) => {
          updateBlog(e);
          setShowUpdateModal(false);
        }}
      />

    </div>
  );
}

export default EditBlog;