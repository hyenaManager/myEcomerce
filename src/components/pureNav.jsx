import "@fortawesome/fontawesome-svg-core/styles.css";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faEnvelope,
  faGear,
  faHouse,
  faListUl,
  faAddressCard,
  faUserCircle,
  faChartPie,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CurrentUser, ThemeContext } from "./themeContext";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentNav } from "../features/nav/currentNav";
export default function NavBarMobo() {
  const myTheme = useContext(ThemeContext);
  const currentUser = useContext(CurrentUser);
  const myCarts = useSelector((state) => state.cart.value);
  const myCurrentNav = useSelector((state) => state.navigation.value);
  const currentUrl = useLocation();
  const currentPath = currentUrl.pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName =
    currentUser !== null ? currentUser.user_name : <span>guest</span>;

  function selectedNav(nav) {
    if (myCurrentNav === nav) {
      return {
        backgroundColor: "white",
        color: myTheme,
        fontSize: "28px",
        // borderTop: "2px solid " + myTheme,
      };
    } else {
      return {
        backgroundColor: myTheme,
        color: "white",
        fontSize: "28px",
      };
    }
  }
  console.log(currentPath);
  useEffect(() => {
    dispatch(setCurrentNav(currentPath));
    navigate(currentPath);
  }, []);
  return (
    <>
      <motion.nav
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="navHeading "
        style={{
          backgroundColor: myTheme,
          color: "whitesmoke",
          padding: "6px",
          fontFamily: "cursive",
        }}
      >
        <h3 className="">
          <FontAwesomeIcon icon={faChartPie} />
          <span>E-App</span>
        </h3>
        <div className="profileStatus d-flex justify-content-center flex-column">
          <img
            src={
              currentUser !== null
                ? currentUser.profile_picture
                : "/src/svgs/default.svg"
            }
            className="img-fluid rounded-circle"
            style={{ maxWidth: "40px", maxHeight: "40px", cursor: "pointer" }}
          />
          <i>{userName}</i>
        </div>
      </motion.nav>
      <motion.nav
        className="mainNav bg-body-tertiary"
        initial={{ x: "100vw" }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="navContent">
          <ul>
            <li className="col " style={selectedNav("/")}>
              <motion.button
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                className=" transparentButton "
              >
                <Link to={"/"} onClick={() => dispatch(setCurrentNav("/"))}>
                  <FontAwesomeIcon
                    icon={faHouse}
                    title="Home"
                    style={selectedNav("/")}
                  />
                </Link>
              </motion.button>
            </li>
            <li className="col CartNav " style={selectedNav("/Cart")}>
              <motion.button
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                className=" transparentButton"
                style={{ position: "relative" }}
              >
                <Link
                  to={"Cart"}
                  onClick={() => dispatch(setCurrentNav("/Cart"))}
                >
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    title="cart"
                    style={selectedNav("/Cart")}
                  />
                </Link>
              </motion.button>
              {myCarts.length > 0 && (
                <span
                  className="bg-danger rounded-circle cartBadge"
                  style={{
                    width: "20px",
                    height: "20px",
                    fontSize: "15px",
                    position: "absolute",
                    right: "75%",
                    color: "white",
                  }}
                >
                  {myCarts.length}
                </span>
              )}
            </li>
            <li className="col " style={selectedNav("/order-list")}>
              <motion.button
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                className=" transparentButton "
              >
                <Link
                  to={"order-list"}
                  onClick={() => dispatch(setCurrentNav("/order-list"))}
                >
                  <FontAwesomeIcon
                    icon={faListUl}
                    title="order list"
                    style={selectedNav("/order-list")}
                  />
                </Link>
              </motion.button>
            </li>
            <li className="col " style={selectedNav("/inbox")}>
              <motion.button
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                className=" transparentButton "
              >
                <Link
                  to={"inbox"}
                  onClick={() => dispatch(setCurrentNav("/inbox"))}
                >
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    title="inbox-message"
                    style={selectedNav("/inbox")}
                  />
                </Link>
              </motion.button>
            </li>
            <li className="col " style={selectedNav("/message")}>
              <motion.button
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                className="transparentButton"
              >
                <Link
                  to={"message"}
                  onClick={() => dispatch(setCurrentNav("/message"))}
                >
                  <FontAwesomeIcon
                    icon={faAddressCard}
                    style={selectedNav("/message")}
                    title="contact"
                  />
                </Link>
              </motion.button>
            </li>
            <li className=" themeChanger col" style={selectedNav("/setting")}>
              <motion.button
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                className="transparentButton"
              >
                <Link
                  to={"setting"}
                  onClick={() => dispatch(setCurrentNav("/setting"))}
                >
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    style={selectedNav("/setting")}
                  />
                </Link>
              </motion.button>
            </li>
          </ul>
        </div>
      </motion.nav>
    </>
  );
}
