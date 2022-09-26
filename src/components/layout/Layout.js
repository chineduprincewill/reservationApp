import { Fragment, useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import Header from "./Header"
import Navbar from "./Navbar"

const Layout = () => {

    const { isAuthenticated } = useContext(AuthContext);
    return (
        isAuthenticated ?
        (<Fragment>
            <Header />
            <Navbar />
        </Fragment>) : ''
    )
}

export default Layout