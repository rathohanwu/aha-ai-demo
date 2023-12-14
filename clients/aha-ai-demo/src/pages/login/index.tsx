import { useSearchParams } from "next/navigation"




function Login() {

    const searchPrams = useSearchParams();
    const code = searchPrams.get('code');

    return (
        <div>
            Login... {code}
        </div>
    )
}

export default Login