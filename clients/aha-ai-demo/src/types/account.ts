type Account = {
    name: string,
    email: string
    signUpTime: string,
    activeTime: string,
    verified: boolean,
    _count: {
        logins: number
    }
}

export {type Account}