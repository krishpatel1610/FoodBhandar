import { React } from "react";
import { useCart, useDispatchCart } from "./contextReducer";
import { useNavigate } from "react-router";

export default function Cart()  {
  let data = useCart();
  let dispatch = useDispatchCart();
  let navigate = useNavigate();
  if(data.length === 0)
  {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3"> Cart is empty!!</div>
      </div>
    )
  }
  const handleCheckOut = async()=>{
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("https://foodbhandar-3.onrender.com/api/orderData",{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        order_data:data,
        email: userEmail,
        order_date: new Date().toDateString(),
      })
    });
    console.log("Order Response:",response);
    if(response.status === 200)
      {
        dispatch({type:"DROP"});
        navigate('/Myorder');
      }
  }

  let totalPrice = data.reduce((total,food)=> total + food.price,0)
  return (
    <div>
      <div className="hm-gradient">
        <main>
          <div className="container text-success" style={{ marginTop: "15px" }}>
            <div className="card mb-4 rounded ">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <h2 className="pt-3 pb-4 mb-5 text-center font-bold font-up deep-purple-text">
                      Your Cart
                    </h2>
                  </div>
                </div>
                <table className="table table-striped text-success">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Option</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      data.map((food, index) => (
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>{food.name}</td>
                          <td>{food.qty}</td>
                          <td>{food.size}</td>
                          <td>{food.price}</td>
                          <td><button type="button" className="btn p-0" onClick={()=>{ dispatch({type: "REMOVE" , index: index }) }}>delete</button></td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
                <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
                <button className="btn btn-success text-white mt-0 mb-0 mr-3" onClick={handleCheckOut}>
                  Check Out
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

