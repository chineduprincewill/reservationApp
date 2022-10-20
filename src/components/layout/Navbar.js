import { Link } from "react-router-dom"

const Navbar = () => {

    return (
        <div className="app-menu navbar-menu">
            
            <div className="navbar-brand-box">
                
                <a href="index.html" className="logo logo-dark">
                    <span className="logo-sm">
                        <img src="assets/images/logo-sm.png" alt="" height="22" />
                    </span>
                    <span className="logo-lg">
                        <img src="assets/images/logo-dark.png" alt="" height="60" />
                    </span>
                </a>
                <button type="button" className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover" id="vertical-hover">
                    <i className="ri-record-circle-line"></i>
                </button>
            </div>

            <div id="scrollbar">
                <div className="container-fluid">

                    <div id="two-column-menu">
                    </div>
                    <ul className="navbar-nav" id="navbar-nav">
                        <li className="menu-title"><span data-key="t-menu">Menu</span></li>

                        <li className="nav-item">
                            <Link className="nav-link menu-link" to="/dashboard">
                                <i className="ri-honour-line"></i> <span data-key="t-widgets">Dashboard</span>
                            </Link>
                        </li>

                        <li className="menu-title"><span data-key="t-menu">Hotel Manager</span></li>
                        <li className="nav-item">
                            <Link className="nav-link menu-link" to="/hotels">
                                <i className="ri-honour-line"></i> <span data-key="t-widgets">Hotels</span>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link menu-link" to="/reservations">
                                <i className="ri-honour-line"></i> <span data-key="t-widgets">Reservations</span>
                            </Link>
                        </li>
                        <li className="menu-title"><span data-key="t-menu">User Manager</span></li>
                        <li className="nav-item">
                            <Link className="nav-link menu-link" to="/users">
                                <i className="ri-honour-line"></i> <span data-key="t-widgets">Users</span>
                            </Link>
                        </li>


                    </ul>
                </div>
            </div>

            <div className="sidebar-background"></div>
        </div>
    )
}

export default Navbar