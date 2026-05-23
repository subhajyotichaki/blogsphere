import { motion } from "framer-motion";

import { Link } from "react-router-dom";

import { useState } from "react";

import ConfirmModal from "./ConfirmModal";

function BlogCard({ blog, onDelete, onFeature }) {


  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );



  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <motion.div
      whileHover={{
        y: -6,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
      }}
      className="group relative overflow-hidden rounded-[24px] md:rounded-[32px] border border-zinc-800 bg-zinc-900/60 backdrop-blur-xl p-8"
    >


      <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500" />


      <div className="relative z-10">

        <div className="flex items-center justify-between mb-8">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center text-lg font-bold">
              {blog.author?.name?.charAt(0)}
            </div>

            <div>

              <p className="font-semibold text-zinc-200">
                {blog.author?.name}
              </p>

              <p className="text-sm text-zinc-500">
                Content Creator
              </p>

            </div>

          </div>


          <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

        </div>



        <h2 className="text-2xl md:text-3xl font-black leading-tight mb-5 group-hover:text-purple-300 transition-all">

          {blog.title}

        </h2>



        <p className="text-zinc-400 leading-relaxed mb-10 line-clamp-4">

          {blog.content}

        </p>



        <div className="flex items-center justify-between gap-4 flex-wrap">


          <Link
            to={`/blog/${blog._id}`}
            className="group relative overflow-hidden bg-gradient-to-r from-white to-zinc-200 text-black hover:scale-105 hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(255,255,255,0.22)] transition-all duration-300 px-5 py-2.5 rounded-xl font-medium"
          >
            <span className="flex items-center gap-2">

              Read

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>

            </span>
          </Link>



          <div className="flex flex-wrap items-center gap-3 justify-end">


            {currentUser?.user?.id === blog.author?._id && (

              <button
                onClick={() => {
                  window.location.href = `/edit/${blog._id}`;
                }}
                className="px-4 py-2 rounded-xl bg-zinc-800/70 hover:bg-purple-500/20 border border-zinc-700 hover:border-purple-500 text-zinc-300 hover:text-white transition-all duration-300"
              >
                Edit
              </button>

            )}


            {currentUser?.user?.id === blog.author?._id && (

              <button
                onClick={() => onFeature(blog)}
                className={`px-4 py-2 rounded-xl border transition-all duration-300 ${blog.featured
                    ? "bg-yellow-500/20 border-yellow-500 text-yellow-300"
                    : "bg-zinc-800/70 border-zinc-700 text-zinc-300 hover:bg-yellow-500/20 hover:border-yellow-500 hover:text-yellow-300"
                  }`}
              >
                {blog.featured ? "★ Featured" : "★ Feature"}
              </button>

            )}


            {currentUser?.user?.id === blog.author?._id && (

              <button
                onClick={() => setShowDeleteModal(true)}
                className="px-4 py-2 rounded-xl bg-zinc-800/70 hover:bg-red-500/20 border border-zinc-700 hover:border-red-500 text-zinc-300 hover:text-red-400 transition-all duration-300"
              >
                Delete
              </button>

            )}

          </div>

        </div>

      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Blog"
        message="Are you sure you want to delete this blog? This action cannot be undone."
        confirmText="Delete"
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={() => {
          onDelete(blog._id);
          setShowDeleteModal(false);
        }}
      />

    </motion.div>
  );
}

export default BlogCard;