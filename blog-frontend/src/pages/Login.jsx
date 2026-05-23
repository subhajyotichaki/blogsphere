import { useContext, useState } from "react";

import { motion } from "framer-motion";

import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import API from "../services/api";

import { AuthContext } from "../context/AuthContext";


function Login() {

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");


    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await API.post(
                "/api/auth/login",
                {
                    email,
                    password,
                }
            );

            login(response.data);

            toast.success("Welcome back");

            navigate("/");

        } catch (error) {

            toast.error("Invalid credentials");

        }
    };


    return (

        <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 relative overflow-hidden">


            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/10 blur-[150px] rounded-full" />

            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full" />


            <div className="absolute top-8 left-8 z-20">

                <h1 className="text-2xl font-black tracking-tight">

                    <span className="hidden md:block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">

                        BlogSphere

                    </span>

                </h1>

            </div>



            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full max-w-md"
            >


                <div className="relative overflow-hidden bg-zinc-900/60 border border-zinc-800 backdrop-blur-2xl rounded-[32px] p-10 shadow-[0_0_100px_rgba(168,85,247,0.18)]">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-70" />

                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-70" />

                    <div className="mb-12 text-center">

                        <p className="uppercase tracking-[0.45em] text-xs text-purple-400 mb-4">
                            BLOGSPHERE
                        </p>


                        <h1 className="text-5xl font-black tracking-tight leading-none mb-5">

                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-blue-300">

                                Welcome Back

                            </span>

                        </h1>


                        <p className="text-zinc-400 leading-relaxed max-w-sm mx-auto text-[15px]">

                            Enter your creative universe and continue sharing stories, ideas, and perspectives with the world.

                        </p>

                    </div>



                    <form
                        onSubmit={handleLogin}
                        className="space-y-6"
                    >


                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            className="w-full bg-zinc-950/70 border border-zinc-800 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 transition-all"
                        />



                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            className="w-full bg-zinc-950/70 border border-zinc-800 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 transition-all"
                        />



                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-[1.02] transition-all duration-300 py-4 rounded-2xl font-semibold shadow-[0_0_40px_rgba(168,85,247,0.25)]"
                        >

                            Login

                        </button>

                    </form>



                    <p className="text-zinc-500 text-sm mt-8 text-center">

                        Don’t have an account?{" "}

                        <Link
                            to="/register"
                            className="text-purple-400 hover:text-purple-300"
                        >
                            Register
                        </Link>

                    </p>

                </div>

            </motion.div>

        </div>
    );
}

export default Login;