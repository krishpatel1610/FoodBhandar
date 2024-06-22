import { React, useEffect, useRef, useState } from "react";
import { useCart, useDispatchCart } from "./contextReducer";
// import { useDispatchCart,useCart } from './contextReducer';

const Card = (props) => {
  let options = props.options;
  let priceOptions = Object.keys(options);
  let dispatch = useDispatchCart();
  let data = useCart();
  let priceRef = useRef();
  const [qty, setQty] = useState(1);
  const [size, SetSize] = useState("");
  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    SetSize(priceRef.current.value);
  }, []);

  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;

        break;
      }
    }
    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: props.foodItem.img,
        });
        console.log(data);
        return;
      }
      return;
    }
    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
      img: props.foodItem.img,
    });
  };

  return (
    <>
      <div
        className="card mt-3 mx-2 "
        style={{ width: "18rem", maxHeight: "420px", minHeight: "420px" }}
      >
        <img
          src={props.foodItem.img}
          className="card-img-top"
          alt="..."
          style={{
            objectFit: "contain !important",
            maxHeight: "180px",
            minHeight: "180px",
          }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <p className="card-text">Card details.</p>
          <div className="container ">
            <select
              className="m-2 h-100  bg-success rounded"
              onClick={(e) => setQty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100  bg-success rounded"
              ref={priceRef}
              onClick={(e) => SetSize(e.target.value)}
            >
              {priceOptions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
            <br />
            <div className="d-inline h-100 fs-6">Price: ₹{finalPrice}/-</div>
          </div>
          <hr />
          <div
            className="btn btn-success justify-center ms-2"
            onClick={handleAddToCart}
          >
            Add to cart
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
