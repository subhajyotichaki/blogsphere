import { motion } from "framer-motion";

function ConfirmModal({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
    confirmText = "Confirm",
}) {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-6">

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="relative overflow-hidden w-full max-w-md rounded-[32px] border border-zinc-800 bg-zinc-900/90 backdrop-blur-2xl p-8 shadow-[0_0_80px_rgba(168,85,247,0.15)]"
            >

                
                <div className="absolute top-0 right-0 w-52 h-52 bg-purple-500/10 blur-3xl rounded-full" />


                <div className="relative z-10">

                    <h2 className="text-3xl font-black mb-4">
                        {title}
                    </h2>

                    <p className="text-zinc-400 leading-relaxed mb-8">
                        {message}
                    </p>



                    <div className="flex items-center justify-end gap-4">

                        
                        <button
                            onClick={onCancel}
                            className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition-all text-zinc-300"
                        >
                            Cancel
                        </button>



                        <button
                            onClick={onConfirm}
                            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:scale-105 transition-all text-white font-medium shadow-[0_0_30px_rgba(239,68,68,0.35)]"
                        >
                            {confirmText}
                        </button>

                    </div>

                </div>

            </motion.div>

        </div>
    );
}

export default ConfirmModal;