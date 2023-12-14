import React from "react";
import {NavBar} from "./NavBar";

function Layout({children}) {
    return (
        <>
            <div style={{backgroundColor: "lightgray"}}>
                <NavBar/>
                <main>{children}</main>
            </div>
        </>
    )
}

export {Layout}