export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
    isBrowser() && window.localStorage.getItem("User")
        ? JSON.parse(window.localStorage.getItem("User"))
        : {}

const setUser = user =>
    window.localStorage.setItem("User", JSON.stringify(user))

export const handleLogin = ({ username, password }) => {
    if (username === `admin` && password === `admin`) {
        return setUser({
            username: `admin`,
            name: `Admin`,
            email: `admin@utbm.fr`
        })
    }
    return false
}

export const isLoggedIn = () => {
    const user = getUser()

    return !!user.username
}

export const logout = callback => {
    setUser({})
    callback()
}
