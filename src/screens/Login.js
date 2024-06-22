import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/loginuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
       
        console.log(json);
        if (!json.success) {
            alert("Enter valid data!!");
        }
        if (json.success) {
            localStorage.setItem('userEmail', credentials.email);
            console.log(localStorage.getItem('userEmail'));
            localStorage.setItem("authToken", json.authToken); // storing generated authToken to localStorage
            // console.log(localStorage.getItem("authToken"));
            navigate('/');
        }
    }

    return (
        <div>
            <div><Navbar /></div>
            <div>
                <section className="max-height-100% mb-5" style={{ backgroundColor: "dark" }}>
                    <div className="container h-custom mt-5 text-dark rounded-3" style={{ borderRadius: "25px", backgroundColor: "#A1DD70" }}>
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-md-9 col-lg-6 col-xl-5">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample" />
                            </div>
                            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                                <form onSubmit={handleSubmit}>
                                    <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-center mt-3" style={{ opacity: "0.8" }}>
                                        <p className="lead fw-normal mb-0 me-3">New User..??</p><br />
                                        <Link to="/Signup" className='mx-3 btn btn-m rounded-pill' style={{ backgroundColor: "#416D19", color: "white" }}>Register!!</Link>
                                    </div>

                                    <div className="divider d-flex align-items-center justify-content-center my-4">
                                        <p className="text-center fw-bold mx-3 mb-0">Or</p>
                                    </div>

                                    <div data-mdb-input-init className="form-outline mb-4">
                                        <input type="email" id="form3Example3" className="form-control form-control-lg" style={{ backgroundColor: "#416D19", color: "white" }} name="email" value={credentials.email} onChange={onChange} />
                                        <label className="form-label" htmlFor="form3Example3">Email address</label>
                                    </div>

                                    <div data-mdb-input-init className="form-outline mb-3">
                                        <input type="password" id="form3Example4" className="form-control form-control-lg" style={{ backgroundColor: "#416D19", color: "white" }} name="password" value={credentials.password} onChange={onChange} />
                                        <label className="form-label" htmlFor="form3Example4">Password</label>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="form-check mb-0">
                                            <input className="form-check-input me-2" type="checkbox" id="form2Example3" />
                                            <label className="form-check-label" htmlFor="form2Example3">
                                                Remember me
                                            </label>
                                        </div>
                                        <a href="#!" className="mx-3 btn btn-info btn-sm">Forgot password?</a>
                                    </div>

                                    <div className="text-center text-lg-start mt-4 pt-2 pb-3">
                                        <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg" style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem", backgroundColor: "#416D19", color: "white" }}>Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div><Footer /></div>
        </div>
    );
}

export default Login;
