import React from "react";
import {NavBar} from "./NavBar";

function Layout({children}: { children: any }) {
    return (
        <>
            <div>
                <NavBar/>
                <main>{children}</main>
            </div>
        </>
    )
}

export {Layout}