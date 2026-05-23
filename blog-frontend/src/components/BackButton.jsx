import { Link } from "react-router-dom";

function BackButton({ to = "/", text = "Back" }) {
    return (

        <div
            className="sm:flex hidden absolute fixed top-8 left-8 z-[9999]"
            style={{
                transform: "none",
            }}
        >

            <Link
                to={to}
                className="group inline-flex items-center gap-2 bg-zinc-900/80 backdrop-blur-xl px-5 py-2.5 rounded-2xl border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800/80 hover:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"            >

                <span className="transition-transform duration-300 group-hover:-translate-x-1">
                    ←
                </span>

                <span>
                    {text}
                </span>

            </Link>

        </div>

    );
}

export default BackButton;