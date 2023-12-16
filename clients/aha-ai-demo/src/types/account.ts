type Account = {
    name: string,
    email: string
    signUpTime: string,
    verified: boolean,
    _count: {
        logins: number
    }
}

export {type Account}