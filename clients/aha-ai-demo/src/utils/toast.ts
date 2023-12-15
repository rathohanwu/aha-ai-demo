import toast from "react-hot-toast";

const showErrorMessage = (err: any) => {
    toast.error(err?.response?.data?.message ?? "Something is wrong", {duration: 2000})
};

const showSuccessfulMessage = (message: string) => {
    toast.success(message, {duration: 2000})
};

export {showErrorMessage, showSuccessfulMessage}