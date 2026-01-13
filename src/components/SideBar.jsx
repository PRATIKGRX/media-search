"use client";
import { House, Heart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
const SideBar = () => {
    const [active, setActive] = useState("Home");
    return (
        <div>
            <nav className="h-screen px-5 py-10 bg-red-500">
                <div>
                    <Link href={'/'} onClick={()=>setActive("Home")}>
                        <div className={`flex gap-2 items-center ${active==='Home'?'underline':''}`}> <House />Home</div>
                    </Link>
                    <Link href={'/collection'} onClick={()=>setActive("Collection")}>
                    <div  className={`flex gap-2 items-center ${active==='Collection'?'underline':''}`}> <Heart />Collection</div>
                    </Link>
                </div>
            </nav>
        </div>
    )
}

export default SideBar