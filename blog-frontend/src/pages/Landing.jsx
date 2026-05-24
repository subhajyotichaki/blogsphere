import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import { useEffect, useState } from "react";

import API from "../services/api";

function Landing() {

    const [featuredBlog, setFeaturedBlog] = useState(null);

    useEffect(() => {
        fetchFeaturedBlog();
    }, []);

    const fetchFeaturedBlog = async () => {
        try {

            const response = await API.get("/blogs");

            const featured = response.data.find(
                (blog) => blog.featured
            );

            if (featured) {
                setFeaturedBlog(featured);
            } else if (response.data.length > 0) {
                setFeaturedBlog(response.data[0]);
            }

        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="min-h-screen overflow-hidden bg-black text-white relative px-4 md:px-6 pt-44 md:pt-32 md:flex md:items-center md:justify-center">
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/20 blur-[150px] rounded-full" />


            <div className="relative z-10 max-w-6xl w-full grid lg:grid-cols-2 gap-10 md:gap-16 items-center pb-16 md:pb-20">

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >


                    <div className="inline-flex items-center gap-3 bg-zinc-900/70 border border-zinc-800 rounded-full px-5 py-2 mb-10 backdrop-blur-sm">

                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

                        <span className="text-sm text-zinc-300">
                            Live Publishing Platform
                        </span>

                    </div>


                    <h1 className="text-[2.3rem] sm:text-5xl md:text-7xl font-black leading-[0.92] tracking-tight mb-6 md:mb-8">

                        Stories
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                            that matter.
                        </span>

                    </h1>


                    <p className="text-zinc-400 text-lg md:text-xl leading-relaxed max-w-lg mb-12">

                        Publish ideas beautifully with a modern writing
                        experience built for creators and thinkers.

                    </p>


                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full sm:w-auto">

                        <Link
                            to="/blogs"
                            className="group relative overflow-hidden bg-white text-black px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] w-full sm:w-auto text-center"                        >

                            <span className="relative z-10 flex items-center justify-center gap-3">

                                Explore

                                <span className="transition-transform duration-300 group-hover:translate-x-1">
                                    →
                                </span>

                            </span>


                            <div className="absolute inset-0 bg-gradient-to-r from-white to-zinc-200 opacity-0 group-hover:opacity-100 transition-all duration-300" />

                        </Link>



                        <Link
                            to="/create"
                            className="group relative overflow-hidden border border-zinc-700 bg-zinc-900/70 backdrop-blur-xl px-8 py-4 rounded-2xl text-lg transition-all duration-300 hover:scale-105 hover:border-purple-500 hover:shadow-[0_0_40px_rgba(168,85,247,0.25)] w-full sm:w-auto text-center"                        >

                            <span className="relative z-10 flex items-center gap-3">

                                Write

                                <span className="transition-transform duration-300 group-hover:translate-x-1">
                                    ✦
                                </span>

                            </span>


                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-r from-purple-500/10 to-blue-500/10" />

                        </Link>

                    </div>
                </motion.div>



                <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-center mt-4 md:mt-0"
                >

                    <div className="w-full max-w-md relative overflow-hidden rounded-[28px] md:rounded-[40px] border border-zinc-800 bg-zinc-900/60 backdrop-blur-xl p-8 shadow-2xl shadow-purple-500/10">


                        <div className="absolute top-0 right-0 w-52 h-52 bg-purple-500/10 blur-3xl rounded-full" />


                        <div className="relative z-10">


                            <div className="flex items-center gap-3 mb-8">

                                <div className="w-3 h-3 rounded-full bg-red-400" />

                                <div className="w-3 h-3 rounded-full bg-yellow-400" />

                                <div className="w-3 h-3 rounded-full bg-green-400" />

                            </div>



                            {featuredBlog ? (

                                <>

                                    <p className="uppercase tracking-[0.3em] text-xs text-purple-400 mb-5">
                                        Featured Story
                                    </p>


                                    <h2 className="text-3xl md:text-4xl font-black leading-tight mb-6">

                                        {featuredBlog.title}

                                    </h2>


                                    <p className="text-zinc-400 leading-relaxed mb-10 line-clamp-4">

                                        {featuredBlog.content}

                                    </p>



                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

                                        <div className="flex items-center gap-4">

                                            <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center font-bold">
                                                {featuredBlog.author?.name?.charAt(0)}
                                            </div>

                                            <div>

                                                <p className="font-semibold">
                                                    {featuredBlog.author?.name}
                                                </p>

                                                <p className="text-zinc-500 text-sm">
                                                    Published Author
                                                </p>

                                            </div>

                                        </div>



                                        <a
                                            href={`/blog/${featuredBlog._id}`}
                                            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-105 transition-all duration-300 px-5 py-3 rounded-2xl font-semibold shadow-[0_0_30px_rgba(168,85,247,0.3)] w-full sm:w-auto text-center"                                        >
                                            Read
                                        </a>

                                    </div>

                                </>

                            ) : (

                                <div className="h-[350px] flex items-center justify-center text-zinc-500">
                                    No featured blog yet
                                </div>

                            )}

                        </div>

                    </div>

                </motion.div>

            </div>

        </div>
    );
}

export default Landing;