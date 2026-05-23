import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";

import { motion } from "framer-motion";

function Navbar() {

  const { user, logout } = useContext(AuthContext);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <div className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 w-full px-6">

        <motion.nav
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-7xl mx-auto overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_80px_rgba(139,92,246,0.12)]"
        >


          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-fuchsia-500/5 to-blue-500/10" />

          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[300px] h-[120px] bg-purple-500/20 blur-3xl rounded-full" />


          <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-8 py-4 md:py-5">


            <Link
              to="/"
              className="flex items-center gap-3"
            >

              <div className="w-3 h-3 rounded-full bg-purple-400 shadow-[0_0_20px_rgba(168,85,247,1)] animate-pulse" />

              <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-r from-white via-purple-200 to-blue-300 bg-clip-text text-transparent">
                BlogSphere
              </h1>

            </Link>



            <div className="flex flex-wrap justify-center items-center gap-3 w-full md:w-auto">


              <Link
                to="/blogs"
                className={`px-4 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl text-sm md:text-base transition-all duration-300 ${isActive("/blogs")
                  ? "bg-white text-black shadow-lg"
                  : "text-zinc-300 hover:bg-white/10 hover:text-white"
                  }`}
              >
                Explore
              </Link>



              <Link
                to="/create"
                className="relative overflow-hidden bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-105 transition-all duration-300 px-4 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl text-sm md:text-base font-semibold text-white shadow-[0_0_30px_rgba(168,85,247,0.35)]"            >

                <span className="relative z-10">
                  Write
                </span>

              </Link>

              {user ? (

                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="bg-zinc-900/80 hover:bg-red-500/20 border border-zinc-800 hover:border-red-500 transition-all px-5 py-2.5 rounded-xl text-zinc-300 hover:text-red-400"
                >

                  Logout

                </button>

              ) : (

                <a
                  href="/login"
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-105 transition-all duration-300 px-5 py-2.5 rounded-xl font-medium text-white"
                >

                  Login

                </a>

              )}

            </div>

          </div>


        </motion.nav>

      </div>
      <ConfirmModal
        isOpen={showLogoutModal}
        title="Logout"
        message="Are you sure you want to logout from BlogSphere?"
        confirmText="Logout"
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={() => {
          logout();
          setShowLogoutModal(false);
        }}
      />

    </>

  );
}

export default Navbar;