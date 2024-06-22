import {React,useState} from "react";
import {
    Link,
    useNavigate
  } from "react-router-dom";
  import { Badge } from "react-bootstrap";
import Model from "../Model";
import Cart from "./Cart";
import { useCart, useDispatchCart } from "./contextReducer";

function Navbar() {
  let data = useCart();
  let dispatch = useDispatchCart();
  const [cartView,setCartView] = useState(false);
  const navigate = useNavigate();
  const handleLogout =() =>{
      localStorage.removeItem("authToken");
      navigate('/login');
  }

  return (
    <>
      <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
            <Link className="navbar-brand fs-4 fst-italic" to="/">FoodBhandar</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mt-2">
                <li className="nav-item">
                <Link className="nav-link active fs-6" aria-current="page" to="/">Home</Link>
                </li>
                {(localStorage.getItem("authToken"))?
                  <li className="nav-item">
                  <Link className="nav-link active fs-6" aria-current="page" to="/Myorder">My Orders</Link>
                  </li>
                :""}
            </ul>
            {!(localStorage.getItem("authToken"))?
            <div className="d-flex">
                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/Signup">SignUp</Link>
            </div>
            :
            <div>
              <div className="btn bg-white text-success mx-2" onClick={()=>{setCartView(true)}}>
                My Cart {"    "}
                <Badge pill bg="danger">{data.length}</Badge>
              </div>
              {cartView? <Model onClose={()=>{setCartView(false)}}><Cart/></Model> : null}

              <div className="btn bg-white text-danger mx-2" onClick={handleLogout}>
                Logout
              </div>
            </div>
            }
            </div>
        </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
