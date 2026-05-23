import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { motion } from "framer-motion";

import API from "../services/api";

import BackButton from "../components/BackButton";

function BlogDetails() {

  const { id } = useParams();

  const [blog, setBlog] = useState(null);


  useEffect(() => {
    fetchBlog();
  }, []);


  const fetchBlog = async () => {
    try {

      const response = await API.get(`/blogs/${id}`);

      setBlog(response.data);

    } catch (error) {
      console.log(error);
    }
  };


  if (!blog) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden px-6 py-24">


      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/10 blur-[150px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full" />


      <BackButton
        to="/blogs"
        text="Back to Blogs"
      />


      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-5xl mx-auto"
      >





        <div className="mb-16">

          <div className="flex items-center gap-4 mb-10">

            <div className="w-14 h-14 rounded-2xl bg-zinc-800 flex items-center justify-center text-xl font-bold">
              {blog.author?.name?.charAt(0)}
            </div>

            <div>

              <p className="font-semibold text-lg">
                {blog.author?.name}              </p>

              <p className="text-zinc-500">
                Published Author
              </p>

            </div>

          </div>



          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-[0.95] tracking-tight max-w-4xl">

            {blog.title}

          </h1>

        </div>




        <div className="relative overflow-hidden rounded-[28px] md:rounded-[40px] border border-zinc-800 bg-zinc-900/60 backdrop-blur-xl p-10 md:p-14">


          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full" />


          <div className="relative z-10">

            <p className="text-zinc-300 text-lg md:text-xl leading-[2.1rem] whitespace-pre-line break-all overflow-hidden">

              {blog.content}

            </p>

          </div>

        </div>

      </motion.div>

    </div>
  );
}

export default BlogDetails;