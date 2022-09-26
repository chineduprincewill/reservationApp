import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const LOGIN_API = 'auth/login';

const Login = () => {

    const navigate = useNavigate();

    const { authenticate } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState('Sign In');
    const [errmsg, setErrmsg] = useState('');



    const handleSubmit = async (e) => {

        e.preventDefault();

        setIsLogin('Signing In...');

        try{
            const body = {
                email,
                password
            }

            const response = await axios.post(LOGIN_API,
                body,
                {
                    headers: { 'Accept' : 'application/json' }
                }
            );
            
            console.log(response.data);
            authenticate(response.data.accessToken, response.data.user);
            navigate("/dashboard");
            window.location.reload();

        } catch (err) {
            if (!err?.response) {
                setErrmsg('No Server Response');
            } else {
                console.log(err.response.data);
                setErrmsg(err.response.data.message);
            }
        }

        setIsLogin('Sign In');

    }

    return (
        <div className="auth-page-wrapper pt-5">
            <div className="auth-one-bg-position auth-one-bg" id="auth-particles">
                <div className="bg-overlay"></div>

                <div className="shape">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 1440 120">
                        <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
                    </svg>
                </div>
            </div>

            <div className="auth-page-content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="text-center mt-sm-5 mb-4 text-white-50">
                                <div>
                                    <a href="index.html" className="d-inline-block auth-logo">
                                        <img src="assets/images/logo-light.png" alt="" height="150" />
                                    </a>
                                </div>
                                <p className="mt-3 fs-15 fw-medium">LCM RESERVATION PORTAL</p>
                            </div>
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-md-8 col-lg-6 col-xl-5">
                            <div className="card mt-4">

                                <div className="card-body p-4">
                                    <div className="text-center mt-2">
                                        <h5 className="text-primary">Welcome Back !</h5>
                                        <p className="text-muted">{errmsg !== '' && <span className="text-danger">{errmsg}</span>}</p>
                                    </div>
                                    <div className="p-2 mt-4">
                                        <form onSubmit={handleSubmit}>

                                            <div className="mb-3">
                                                <label htmlFor="email" className="form-label">Email</label>
                                                <input 
                                                    type="email" 
                                                    className="form-control" 
                                                    id="email" 
                                                    placeholder="Enter email" 
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <div className="float-end">
                                                    <Link to="/forgot-password" className="text-muted">Forgot password?</Link>
                                                </div>
                                                <label className="form-label" htmlFor="password-input">Password</label>
                                                <div className="position-relative auth-pass-inputgroup mb-3" >
                                                    <input 
                                                        type="password" 
                                                        className="form-control pe-5" 
                                                        placeholder="Enter password" 
                                                        id="password-input" 
                                                        required
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            <div className="mt-5">
                                                <button className="btn btn-success w-100" type="submit">{isLogin}</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 text-center">
                                <p className="mb-0">Don't have an account ? <Link to="/" className="fw-semibold text-primary text-decoration-underline"> Sign up </Link> </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login