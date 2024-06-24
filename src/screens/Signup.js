import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Signup = () => {
    const onChange = (event)=>{
        setCredantials ({...credantials,[event.target.name]:event.target.value})
    }
    const [credantials, setCredantials] = useState({name:"",email:"",password:"",location:""});

    const handleSubmit = async(e)=>{
        e.preventDefault(); // synthetic event read once
        const response = await fetch("https://foodbhandar-3.onrender.com/api/createuser",{
            method:'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body:JSON.stringify({name:credantials.name, email:credantials.email,password:credantials.password,location:credantials.location})
        });
        const json = await response.json();
        console.log(json);
        if(!json.success){
            alert("Enter valid data!!");
        }
    }


    return (
    <div>
        <div>
            <Navbar/>
        </div>
        <section className="vh-100 mt-4" style={{backgroundColor: "dark"}}>
        <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
                <div className="card text-black" style={{borderRadius:"25",backgroundColor:"#A1DD70"}}>
                <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                        <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>

                        <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div data-mdb-input-init className="form-outline flex-fill mb-0">
                            <input type="text" id="form3Example1c" className="form-control" style={{backgroundColor:"#416D19",color:"white"}} name="name" value={credantials.name} onChange={onChange}/>
                            <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                            </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div data-mdb-input-init className="form-outline flex-fill mb-0">
                            <input type="email" id="form3Example3c" className="form-control" style={{backgroundColor:"#416D19",color:"white"}} name="email" value={credantials.email} onChange={onChange} />
                            <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                            </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div data-mdb-input-init className="form-outline flex-fill mb-0">
                            <input type="password" id="form3Example4c" className="form-control" style={{backgroundColor:"#416D19",color:"white"}} name="password" value={credantials.password} onChange={onChange} />
                            <label className="form-label" htmlFor="form3Example4c">Password</label>
                            </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                            <div data-mdb-input-init className="form-outline flex-fill mb-0">
                            <input type="text" id="form3Example4cd" className="form-control" style={{backgroundColor:"#416D19",color:"white"}} name="location" value={credantials.location} onChange={onChange} />
                            <label className="form-label" htmlFor="form3Example4cd">Address</label>
                            </div>
                        </div>

                        <div className="form-check d-flex justify-content-center mb-5">
                            <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                            <label className="form-check-label" htmlFor="form2Example3">
                            I agree all statements in <a href="#!">Terms of service</a>
                            </label>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button  type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg"  style={{backgroundColor:"#416D19",color:"white"}}>Register</button>
                            <Link to="/login" className='mx-3 btn btn-danger btn-lg'>Already a user?</Link>
                        </div>

                        </form>

                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="Sample"/>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
        <div>
            <Footer/>
        </div>
    </div>
    );
}

export default Signup;
