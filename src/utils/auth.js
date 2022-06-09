export const isBrowser = () => typeof window !== "undefined"

const setUser = user =>
    window.localStorage.setItem("User", JSON.stringify(user))

export const isLoggedIn = () => {
    return isBrowser() && window.localStorage.getItem("access_token") != null
}

export const logout = callback => {
    setUser({})
    callback()
}
