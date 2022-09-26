import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"

const Header = () => {

    const { logout, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {

        logout();
        navigate('/login');
    }


    return (
        <header id="page-topbar">
            <div className="layout-width">
                <div className="navbar-header">
                    <div className="d-flex">
                        <div className="navbar-brand-box horizontal-logo">
                            <a href="#" className="logo logo-dark">
                                <span className="logo-sm">
                                    <img src="assets/images/logo-sm.png" alt="" height="22" />
                                </span>
                            </a>
                        </div>

                    </div>

                    <div className="d-flex align-items-center">

                        <div className="dropdown d-md-none topbar-head-dropdown header-item">
                            <button type="button" className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                                id="page-header-search-dropdown" data-bs-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                                <i className="bx bx-search fs-22"></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                                aria-labelledby="page-header-search-dropdown">
                                <form className="p-3">
                                    <div className="form-group m-0">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Search ..."
                                                aria-label="Recipient's username" />
                                            <button className="btn btn-primary" type="submit"><i
                                                    className="mdi mdi-magnify"></i></button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>



                        <div className="dropdown ms-sm-3 header-item topbar-user">
                            <button type="button" className="btn" id="page-header-user-dropdown" data-bs-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                <span className="d-flex align-items-center">
                                    <img className="rounded-circle header-profile-user" src="assets/images/users/avatar-1.jpg"
                                        alt="Header Avatar" />
                                    <span className="text-start ms-xl-2">
                                        <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">{user.first_name} {user.last_name}</span>
                                        <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">{user.email}</span>
                                    </span>
                                </span>
                            </button>
                            <div className="dropdown-menu dropdown-menu-end">
                                
                                <h6 className="dropdown-header">Welcome {user.first_name}!</h6>
                                <a className="dropdown-item" href="pages-profile.html"><i
                                        className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i> <span
                                        className="align-middle">Profile</span></a>
                                <a className="dropdown-item" href="apps-chat.html"><i
                                        className="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1"></i> <span
                                        className="align-middle">Messages</span></a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="pages-profile-settings.html"><i
                                        className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i> <span
                                        className="align-middle">Settings</span></a>
                                <span className="dropdown-item" href="auth-logout-basic.html"><i
                                        className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i> <span
                                        className="align-middle" data-key="t-logout" onClick={handleLogout}>Logout</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header






