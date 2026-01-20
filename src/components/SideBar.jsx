"use client";
import { House, Heart } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { usePathname } from "next/navigation";
const SideBar = () => {
    const pathname = usePathname();
    const isHome = pathname === '/';
    const isCollection = pathname === '/collection';
    const [active, setActive] = useState("Home");
    return (
        <div>
            <nav className="sm:h-screen flex items-center justify-center sm:items-start h-12 px-5 py-10 bg-red-500">
                <div className="flex sm:flex-col justify-center sm:justify-start gap-2">
                    <Link href={'/'} onClick={() => setActive("Home")}>
                        <div className="relative flex gap-2 items-center p-2 text-black cursor-pointer">
                            {isHome && (
                                <motion.div className="absolute inset-0 bg-white" layoutId="test">

                                </motion.div>
                            )}<House className="relative z-10" /><span className="relative z-10 ">Home</span></div>
                    </Link>
                    <Link href={'/collection'} onClick={() => setActive("Collection")}>
                        <div className="relative flex gap-2 items-center p-2 text-black cursor-pointer">{isCollection && (
                            <motion.div className="absolute inset-0 bg-white" layoutId="test">

                            </motion.div>
                        )} <Heart className="relative z-10" /><span className="relative z-10" >Collection</span></div>
                    </Link>
                </div>
            </nav>
        </div>
    )
}

export default SideBar