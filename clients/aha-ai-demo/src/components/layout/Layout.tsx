import React from "react";
import {Toaster} from "react-hot-toast";
import {NavBar} from "./NavBar";

function Layout({children}: { children: any }) {
    return (
        <>
            <div>
                <NavBar/>
                <main style={{padding: "1em"}}>{children}</main>
                <Toaster/>
            </div>
        </>
    )
}

export {Layout}