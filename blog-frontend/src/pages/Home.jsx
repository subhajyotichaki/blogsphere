import { motion } from "framer-motion";

import { useEffect, useState } from "react";

import API from "../services/api";

import BlogCard from "../components/BlogCard";

import toast from "react-hot-toast";

import BackButton from "../components/BackButton";

import ConfirmModal from "../components/ConfirmModal";

function Home() {

    const [blogs, setBlogs] = useState([]);

    const currentUser = JSON.parse(
        localStorage.getItem("user")
    );

    const [search, setSearch] = useState("");

    const [showFeaturedDeleteModal, setShowFeaturedDeleteModal] = useState(false);

    useEffect(() => {
        fetchBlogs();
    }, []);


    const fetchBlogs = async () => {
        try {

            const response = await API.get("/blogs");

            setBlogs(response.data.reverse());

        } catch (error) {
            console.log(error);
        }
    };


    const deleteBlog = async (id) => {



        try {

            await API.delete(
                `/blogs/${id}`,
                {
                    headers: {
                       authorization: localStorage.getItem("token"),
                    },
                }
            );

            toast.success("Blog deleted");

            fetchBlogs();

        } catch (error) {
            console.log(error);
        }
    };

    const makeFeatured = async (selectedBlog) => {

        try {

            await API.put(
                `/blogs/${selectedBlog._id}`,
                {
                    title: selectedBlog.title,
                    content: selectedBlog.content,
                    featured: true,
                },
                {
                    headers: {
                        authorization: localStorage.getItem("token"),
                    },
                }
            );

            toast.success("Featured story updated");

            fetchBlogs();

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to feature blog"
            );

        }

    };

    const filteredBlogs = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(search.toLowerCase())
    );

    const featuredBlog =
        blogs.find((blog) => blog.featured) || blogs[0];


    return (
        <div className="min-h-screen bg-black text-white overflow-hidden">

            <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 blur-3xl rounded-full" />

            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 blur-3xl rounded-full" />


            <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 pt-16 md:pt-24 pb-14 md:py-20">

                <BackButton />

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >

                    <div className="flex justify-center mb-6 md:mb-20">

                        <div className="group relative overflow-hidden w-full max-w-6xl rounded-[24px] md:rounded-[40px] border border-white/10 bg-gradient-to-br from-zinc-900/90 via-zinc-900/70 to-black/80 backdrop-blur-2xl px-4 sm:px-10 md:px-14 py-4 md:py-12">


                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5" />


                            <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-70" />


                            <div className="absolute -top-20 right-0 w-80 h-80 bg-purple-500/20 blur-3xl rounded-full" />

                            <div className="absolute -bottom-20 left-0 w-80 h-80 bg-blue-500/20 blur-3xl rounded-full" />


                            <div className="absolute top-10 right-16 w-2 h-2 rounded-full bg-purple-400 animate-pulse" />

                            <div className="absolute bottom-10 left-20 w-2 h-2 rounded-full bg-blue-400 animate-pulse" />



                            <div className="relative z-10 text-center">

                                <p className="uppercase tracking-[0.45em] text-xs text-zinc-500 mb-3">
                                    BLOG PLATFORM
                                </p>


                                <h1 className="text-[1.8rem] sm:text-5xl md:text-7xl font-black tracking-tight leading-none bg-gradient-to-r from-white via-purple-200 to-blue-300 bg-clip-text text-transparent">

                                    Discover Ideas

                                </h1>




                            </div>

                        </div>

                    </div>

                </motion.div>



                <div className="max-w-full md:max-w-xl mx-auto mb-6 md:mb-16">

                    <div className="relative">

                        <input
                            type="text"
                            placeholder="Search stories..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-zinc-900/70 border border-zinc-800 rounded-2xl px-5 md:px-6 py-4 md:py-5 outline-none text-base md:text-lg backdrop-blur-sm focus:border-purple-500 transition-all"
                        />

                    </div>

                </div>



                {filteredBlogs.length === 0 ? (

                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-20 text-center backdrop-blur-sm">

                        <h2 className="text-4xl font-bold mb-4">
                            No Blogs Found
                        </h2>

                        <p className="text-zinc-400 text-lg">
                            Try searching for something else.
                        </p>

                    </div>

                ) : (

                    <div className="space-y-10">

                        {featuredBlog && search === "" && (

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                               className="relative overflow-hidden rounded-[20px] md:rounded-[44px] border border-zinc-800 bg-gradient-to-br from-zinc-900/90 via-zinc-900/70 to-black/80 backdrop-blur-2xl p-3 sm:p-7 md:p-14 shadow-[0_0_80px_rgba(168,85,247,0.08)]"
                            >

                                <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/20 blur-3xl rounded-full" />

                                <div className="relative z-10 max-w-5xl">

                                    <p className="inline-flex items-center gap-3 uppercase tracking-[0.28em] text-xs font-semibold bg-purple-500/10 border border-purple-500/20 text-purple-300 px-4 py-2 rounded-full mb-8">
                                        Trending Story
                                    </p>

                                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-black leading-[0.95] mb-5">

                                        {featuredBlog.title}

                                    </h2>

                                    <p className="text-zinc-300 text-base md:text-lg leading-relaxed mb-6 md:mb-8 max-w-3xl">

                                        {featuredBlog.content}

                                    </p>


                                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 w-full">

                                        <div className="flex items-center gap-4">

                                            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 flex items-center justify-center text-2xl font-bold shadow-[0_0_25px_rgba(168,85,247,0.12)]">
                                                {featuredBlog.author?.name?.charAt(0)}
                                            </div>

                                            <div>
                                                <p className="font-semibold text-lg">
                                                    {featuredBlog.author?.name}
                                                </p>

                                                <p className="text-zinc-500">
                                                    Featured Author
                                                </p>
                                            </div>

                                        </div>


                                        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto md:ml-auto">

                                            <a
                                                href={`/blog/${featuredBlog._id}`}
                                                className="group relative overflow-hidden bg-white text-black hover:bg-zinc-200 transition-all duration-300 px-5 py-2.5 rounded-2xl font-semibold shadow-[0_0_30px_rgba(255,255,255,0.12)]"
                                            >

                                                <span className="relative z-10 flex items-center gap-2">

                                                    Read Story

                                                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                                                        →
                                                    </span>

                                                </span>

                                            </a>



                                            {currentUser?.id === featuredBlog.author?._id && (
                                                <a href={`/edit/${featuredBlog._id}`}>

                                                    <span className="relative z-10 flex items-center gap-2">

                                                        Edit

                                                        <span className="transition-transform duration-300 group-hover:rotate-12">
                                                            ✦
                                                        </span>

                                                    </span>

                                                </a>
                                            )}



                                            {currentUser?.id === featuredBlog.author?._id && (
                                                <button
                                                    onClick={() => setShowFeaturedDeleteModal(true)}
                                                    className="group bg-zinc-800/80 hover:bg-red-500/20 border border-zinc-700 hover:border-red-500 transition-all duration-300 px-5 py-2.5 rounded-2xl font-semibold text-zinc-300 hover:text-red-400"
                                                >

                                                    <span className="flex items-center gap-2">

                                                        Delete

                                                        <span className="transition-transform duration-300 group-hover:scale-110">
                                                            ×
                                                        </span>

                                                    </span>

                                                </button>

                                            )}

                                        </div>
                                    </div>

                                </div>

                            </motion.div>

                        )}

                        <ConfirmModal
                            isOpen={showFeaturedDeleteModal}
                            title="Delete Featured Blog"
                            message="Are you sure you want to delete this featured blog?"
                            confirmText="Delete"
                            onCancel={() => setShowFeaturedDeleteModal(false)}
                            onConfirm={() => {
                                deleteBlog(featuredBlog._id); setShowFeaturedDeleteModal(false);
                            }}
                        />



                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="grid grid-cols-1 gap-5 md:gap-8 xl:grid-cols-2"
                        >

                            {(search ? filteredBlogs : blogs.slice(1)).map((blog) => (
                                <BlogCard
                                    key={blog._id}
                                    blog={blog}
                                    onDelete={deleteBlog}
                                    onFeature={makeFeatured}
                                />
                            ))}

                        </motion.div>

                    </div>

                )}

            </div>

        </div>
    );
}

export default Home;