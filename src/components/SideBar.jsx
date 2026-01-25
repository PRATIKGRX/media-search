"use client";
import { House, Heart } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
const ActiveIndicator = () => (
    <motion.div className="absolute inset-0 border-[#E1D9BC] border-2 rounded-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
            opacity: { duration: 0.2 },
            type: "spring",
            stiffness: 400,
            damping: 30,
        }}
        layoutId="sideBarIndicator">
    </motion.div>
);
const SideBar = () => {
    const pathname = usePathname();
    return (
        <motion.div variants={{
            hidden: { x: -100 },
            visible: {
                x: 0,
                transition: {
                    staggerChildren: 0.6,
                    delayChildren: 0.2,
                    duration: 0.6
                }
            }
        }} initial="hidden" animate="visible">
            <nav className="sm:h-screen flex items-center justify-center sm:items-start h-12 px-5 py-10 bg-[#30364F] text-[#F0F0DB] sm:rounded-r-2xl sm:rounded-t-none rounded-t-2xl">
                <div className="flex sm:flex-col justify-center sm:justify-start gap-2">
                    <Link href={'/'}>
                        <motion.div variants={{
                            hidden: { scale: 0.5, opacity: 0 },
                            visible: {
                                scale: 1,
                                opacity: 1,
                                transition: { duration: 0.4 }
                            }
                        }} className="relative flex gap-2 items-center p-2 cursor-pointer ">
                            {pathname === "/" && <ActiveIndicator />}<House className="relative z-10" /><span className="relative z-10 ">Home</span></motion.div>
                    </Link>
                    <Link href={'/collection'} >
                        <motion.div variants={{
                            hidden: { scale: 0.5, opacity: 0 },
                            visible: {
                                scale: 1,
                                opacity: 1,
                                transition: { duration: 0.4 }
                            }
                        }} className="relative flex gap-2 items-center p-2  cursor-pointer"> {pathname === "/collection" && <ActiveIndicator />} <Heart className="relative z-10" /><span className="relative z-10" >Collection</span></motion.div>
                    </Link>
                </div>
            </nav>
        </motion.div>
    )
}

export default SideBar