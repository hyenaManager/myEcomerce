import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useMemo } from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faCartShopping,
  faCoins,
  faListUl,
  faMinus,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { CurrentUser, ThemeContext } from "./themeContext";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCarts,
  decreaseQuantity,
  increaseQuantity,
  removeCart,
} from "../features/cart/cartStore";
import { makeANewOrder } from "../features/order/order";

export default function Carts() {
  const [paying, setPaying] = useState(false);
  const myTheme = useContext(ThemeContext);
  const dispatch = useDispatch();
  const all_carts = useSelector((state) => state.cart.value);
  const totalPrice = useMemo(() =>
    all_carts.reduce((accumulateValue, cart) => accumulateValue + cart.price, 0)
  );
  function isPaying(Boolean) {
    setPaying(Boolean);
  }
  const tableTheme = { backgroundColor: myTheme, color: "white" };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        exit={{ opacity: 0 }}
        className="mainDiv"
        style={paying ? { pointerEvents: "none", zIndex: "-1" } : null}
      >
        <div className=" row cart-table">
          <div className="col itemTable">
            <table className="table text-center">
              <thead className="" style={{ height: "40px" }}>
                <tr>
                  <th scope="col" style={tableTheme}>
                    #
                  </th>
                  <th scope="col" style={tableTheme}>
                    icon
                  </th>
                  <th scope="col" style={tableTheme}>
                    name
                  </th>
                  <th scope="col" style={tableTheme}>
                    price
                  </th>
                  <th scope="col" style={tableTheme}>
                    quantity
                  </th>
                  <th scope="col" style={tableTheme}></th>
                </tr>
              </thead>
              <tbody>
                {all_carts.map((cart, index) => (
                  <tr key={index} style={{ alignItems: "center" }}>
                    <td>{index + 1}</td>
                    <td className="img-column">
                      <img
                        src={`${cart.icon}`}
                        alt="icon"
                        className="img-fluid img-thumbnail"
                        style={{
                          height: "100px",
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                      />
                    </td>
                    <td className="">{cart.name}</td>
                    <td>{cart.price}</td>
                    <Modifier cart={cart} />
                    <td>
                      <button
                        className="transparentButton"
                        onClick={() => {
                          dispatch(removeCart(cart));
                          console.log(
                            "delete cart name and id:",
                            cart.id,
                            cart.name
                          );
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{ color: "red" }}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {all_carts.length < 1 && (
              <h1 className="container text-center " style={{ color: myTheme }}>
                Cart <FontAwesomeIcon icon={faCartShopping} /> is empty :)
                <br />
                <span>
                  Your orders my be in the order list{" "}
                  <FontAwesomeIcon icon={faListUl} />
                </span>
              </h1>
            )}
          </div>
          <div className={all_carts.length > 0 ? "col" : "d-none"}>
            <Cashier totalPrice={totalPrice} />
          </div>
        </div>
      </motion.div>
    </>
  );
}

function Modifier({ cart }) {
  const dispatch = useDispatch();
  const decreasedCart = {
    ...cart,
    price: cart.price - cart.initialPrice,
    quantity: cart.quantity - 1,
  };
  const increasedCart = {
    ...cart,
    price: cart.price + cart.initialPrice,
    quantity: cart.quantity + 1,
  };
  return (
    <>
      <td className="quantity-cell ">
        <div className="input-group quantity-container">
          <div className="input-group-prepend">
            <button
              className="btn btn-warning"
              type="button"
              id="reduceButton"
              onClick={() => dispatch(decreaseQuantity(decreasedCart))}
            >
              -
            </button>
          </div>

          <input
            style={{ margin: "auto", width: "30px", padding: "2px" }}
            type="text"
            className="form-control text-center"
            value={cart.quantity}
            id="valueInput"
            disabled
          />

          <div className="input-group-append">
            <button
              className="btn btn-success"
              type="button"
              id="addButton"
              onClick={() => dispatch(increaseQuantity(increasedCart))}
            >
              +
            </button>
          </div>
        </div>
      </td>
    </>
  );
}
function Cashier({ totalPrice }) {
  const [addedRedeemPoints, setAddedRedeemPoints] = useState(0);
  const [isPaying, setIsPaying] = useState(false);
  const currentUser = useContext(CurrentUser);
  const allRedeemPoints = useSelector((state) => state.redeem.value);
  const [isRedeem, setIsRedeem] = useState(false);
  const allCarts = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  const totalItems = useMemo(
    () => allCarts.reduce((accu, cart) => accu + cart.quantity, 0),
    [allCarts]
  );
  const allPrice = useMemo(
    () => allCarts.reduce((accu, cart) => accu + cart.price, 0),
    [allCarts]
  );
  const newOrder = {
    quantity: totalItems,
    totalPrice: totalPrice + 1000,
    user_name: currentUser?.name,
    approved: false,
    originalOrder: allCarts,
    used_RDpoints: 100,
  };
  function handleAddRedeem() {
    if (addedRedeemPoints < allRedeemPoints) {
      setAddedRedeemPoints((point) => parseInt(point) + 1);
    }
  }
  function handleRemoveRedeem() {
    if (addedRedeemPoints > 0) {
      setAddedRedeemPoints((point) => parseInt(point) - 1);
    }
  }
  function handleMakeNewOrder() {
    dispatch(clearCarts());
    dispatch(makeANewOrder(newOrder));
  }
  const myTheme = useContext(ThemeContext);
  const confirmNoti = isPaying && (
    <ConfirmWidget
      isPaying={() => setIsPaying(false)}
      totalPrice={allPrice - addedRedeemPoints * 100}
      points={addedRedeemPoints}
      addNewOrder={() => handleMakeNewOrder()}
    />
  );
  return (
    <>
      <div className="cashier">
        <h3
          className=" text-center"
          style={{ color: "white", height: "40px", backgroundColor: myTheme }}
        >
          Cashier
        </h3>
        <div className="totalCash list-group">
          <li className="list-group-item LRdisplay">
            <h5>Total price</h5>
            <p>{allPrice}ks</p>
          </li>
          <li className="list-group-item LRdisplay">
            <h5>Delivery fee</h5>
            <p>1000ks</p>
          </li>

          {isRedeem ? (
            <>
              <li className="list-group-item LRdisplay d-flex justify-content-between border">
                <button
                  className="btn btn-outline-success"
                  style={{ maxWidth: "90px" }}
                  onClick={() => {
                    handleAddRedeem();
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} />
                  <FontAwesomeIcon icon={faCoins} />
                </button>
                <i>{addedRedeemPoints} point</i>
                <button
                  className="btn btn-outline-warning"
                  style={{ maxWidth: "90px" }}
                  onClick={() => {
                    handleRemoveRedeem();
                  }}
                >
                  <FontAwesomeIcon icon={faMinus} />
                  <FontAwesomeIcon icon={faCoins} />
                </button>
              </li>
              {addedRedeemPoints > 0 ? (
                <li className="list-group-item LRdisplay d-flex justify-content-center">
                  <i style={{ marginRight: "3px" }}>
                    Your redeem point will be deducted to{" "}
                  </i>{" "}
                  {allRedeemPoints - addedRedeemPoints}{" "}
                  <FontAwesomeIcon
                    icon={faCoins}
                    style={{
                      color: "gold",
                      marginTop: "auto",
                      marginBottom: "auto",
                      marginLeft: "3px",
                    }}
                  />
                  points
                </li>
              ) : null}
            </>
          ) : null}
          <button
            className="btn btn-success"
            style={{
              maxWidth: "130px",
              margin: "auto",
            }}
            onClick={() => setIsRedeem(!isRedeem)}
          >
            {isRedeem ? "hide redeem" : "show redeem"}
          </button>
        </div>
        <hr />
        <div className="LRdisplay">
          <h2>Total</h2>
          <h4>
            {allPrice + parseInt(1000) - addedRedeemPoints * 100}
            <span style={{ color: "gold" }}>
              {addedRedeemPoints > 0
                ? "(" + addedRedeemPoints + " redeem points )"
                : null}
            </span>
            ks
          </h4>
        </div>
        <button
          className="btn btn-secondary "
          onClick={() => setIsPaying(true)}
        >
          Order Now
        </button>
      </div>
      {confirmNoti}
    </>
  );
}

function ConfirmWidget({ isPaying, totalPrice, points, addNewOrder }) {
  const allCarts = useSelector((state) => state.cart.value);
  return (
    <>
      <div className="confirmWidget-overlay">
        <div className="container confirmWidget">
          <div className="reminder">
            <h4 className="text-center">Are you sure to order this</h4>
            <ul className="list-group">
              <li className="list-group-item row">
                <span className="col text-primary">Name</span>
                <span className="col text-primary">Quantity</span>
                <span className="col text-primary">Total price</span>
              </li>
              {allCarts.map((cart) => (
                <li className="list-group-item row" key={cart.name}>
                  <span className="col">{cart.name}</span>
                  <span className="col">{cart.quantity}</span>
                  <span className="col">{cart.price} kyats</span>
                </li>
              ))}
              <li className="list-group-item active">
                Total price + delivery fee -{" "}
                <span style={{ color: "gold" }}>
                  {points > 0 ? points + " redeem point used" : null}
                </span>{" "}
                = {totalPrice + parseInt(1000)} kyats
              </li>
            </ul>
            <div className="buttons mt-2 ">
              <button
                onClick={() => isPaying(false)}
                className="cancel btn btn-outline-warning"
              >
                back
              </button>
              <button
                className="confirm btn btn-outline-success"
                onClick={() => {
                  addNewOrder();
                  isPaying(false);
                }}
              >
                confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
