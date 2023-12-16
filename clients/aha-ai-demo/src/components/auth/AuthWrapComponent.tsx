import React from "react";
import {useLoginStore} from "@/stores/loginStore";
import {showErrorMessage} from "@/utils/toast";

function AuthWrapComponent(WrappedComponent: React.ComponentType<any>) {
    return (props: any) => {
        const isLogin = useLoginStore((state) => state.isLogin);
        if (!isLogin) {
            showErrorMessage("user should login first to access to this page");
            window.location.href = "http://localhost:3000/"
        }

        // If logged in, render the original component
        return <WrappedComponent {...props} />;
    };
};

export default AuthWrapComponent;