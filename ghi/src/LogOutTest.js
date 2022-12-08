import { useToken } from "./useToken";

function Logout() {
    const [, , logout] = useToken()

    const handleSubmit = async (e) => {
        e.preventDefault()
        logout()
    }

    return (
        <>
        <h1>Leaving so soon?</h1>
        <button onClick={handleSubmit}>Logout</button>
        </>
    )
}

export default Logout
