import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import React from "react";
import {
  faCartShopping,
  faCircleInfo,
  faMagnifyingGlass,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CurrentUser, ThemeContext } from "./themeContext";
import LoginError from "./loginFirstError";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../features/cart/cartStore";
import { myDatas } from "./datas";

export default function Items() {
  const [addWithoutLogin, setAddWithoutLogin] = useState(false);
  const [filterText, setFilterText] = useState("");
  const allCartss = useSelector((state) => state.cart.value);
  const selectedItemCatagory = useSelector((state) => state.itemType.value);
  const myTheme = useContext(ThemeContext);
  const [filteredImages, setFilteredImages] = useState(myDatas);
  function handleIsLogin(boolean) {
    setAddWithoutLogin(boolean);
  }
  function handleSearch() {
    setFilteredImages((filteredImages) =>
      filteredImages.filter((data) =>
        data.name.toLowerCase().includes(filterText.toLowerCase())
      )
    );
  }

  // function shouldHiddenOrAll(type) {
  //   //hiding the item in the coditions of the catagory type
  //   if (cataType === "all") {
  //     return true;
  //   } else {
  //     return type === cataType; //e.g cataType === fruits, show only the item that type is fruit
  //   }
  // }

  const imgItems = filteredImages.map((data, index) => {
    if (selectedItemCatagory === "all") {
      return (
        <Images
          imgData={data}
          key={index}
          handleIsLogin={handleIsLogin}
          placeholderSrc={"/src/svgs/loadingAnimated.gif"}
        />
      );
    } else {
      if (selectedItemCatagory === data.type) {
        return (
          <Images
            imgData={data}
            key={index}
            handleIsLogin={handleIsLogin}
            placeholderSrc={"/src/svgs/loadingAnimated.gif"}
          />
        );
      }
    }
  });
  // useEffect(() => {
  //   if (selectedItemCatagory === "all") {
  //     setFilteredImages(myDatas);
  //   } else {
  //     setFilteredImages(
  //       myDatas.filter((data) => data.type === selectedItemCatagory)
  //     );
  //   }
  // }, [selectedItemCatagory]);
  console.log(selectedItemCatagory);
  return (
    <div className="itemContainer rounded">
      <div
        className="searchBar mb-2 p-2"
        style={{ backgroundColor: myTheme, alignItems: "center" }}
      >
        <form className="d-flex">
          <button
            className="btn me-1 rounded refreshButton"
            type="button"
            onClick={() => {
              setFilteredImages(myDatas);
              setFilterText("");
            }}
          >
            <FontAwesomeIcon icon={faArrowsRotate} />
          </button>
          <input
            className="form-control me-1"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            type="search"
            placeholder="Search"
            aria-label="Search"
          />

          <button
            className="btn btn-outline-success searchButton"
            type="button"
            onClick={handleSearch}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </form>
      </div>
      <div className="row" style={{ overflowX: "hidden" }}>
        {imgItems}
        {filteredImages.length > 0 ? null : (
          <i className="text-center">There is no such item</i>
        )}
      </div>
      {addWithoutLogin ? (
        <LoginError
          handleIsLogin={handleIsLogin}
          ErrorMessage={"Login first to purchase"}
        />
      ) : null}
    </div>
  );
}

function Images({ imgData, handleIsLogin, placeholderSrc }) {
  const currentUser = useContext(CurrentUser);
  const dispatch = useDispatch();
  const allCarts = useSelector((state) => state.cart.value);
  const [imgSrc, setImgSrc] = useState(placeholderSrc || imgData.source);
  const alreadyInCart = allCarts.find((cart) => cart.id === imgData.id);

  const customClass =
    placeholderSrc && imgSrc === placeholderSrc ? "loading" : "loaded";
  function userExist() {
    if (alreadyInCart) {
      return;
    }
    if (currentUser !== null) {
      const newCart = {
        name: imgData.name,
        price: imgData.value,
        id: imgData.id,
        quantity: 1,
        initialPrice: imgData.value,
        icon: imgData.source,
      };
      return dispatch(addCart(newCart));
    }
    handleIsLogin(true);
  }
  useEffect(() => {
    const img = new Image();
    img.src = imgData.source;
    img.onload = () => {
      setImgSrc(imgData.source);
    };
  }, [imgData.source]);

  const myTheme = useContext(ThemeContext);
  const buttonDisplay = (
    <button
      className="transparentButton"
      title="add to cart"
      onClick={() => userExist()}
    >
      <motion.div whileHover={{ scale: 1.4 }} whileTap={{ scale: 1.3 }}>
        <FontAwesomeIcon
          icon={faCartShopping}
          style={{ color: "whitesmoke" }}
        />
      </motion.div>
    </button>
  );

  return (
    <>
      <div
        className={" col-4 image-container position-relative p-2 "}
        key={imgData.name}
      >
        <section className=" cartImageMain position-relative">
          <motion.img
            src={imgSrc}
            alt={imgData.source}
            className={
              " rounded image-fluid cartImageSection " + `${customClass}`
            }
          />
          <span
            style={{
              position: "absolute",
              top: "2%",
              right: "16px",
              fontSize: "25px",
              color: "white",
              cursor: "pointer",
            }}
            title="item Detail"
          >
            <Link
              to={"detail/" + imgData.id}
              style={{
                textDecoration: "none",
                color: myTheme,
              }}
            >
              <FontAwesomeIcon
                icon={faCircleInfo}
                className="rounded-circle p-1"
                style={{ backgroundColor: "white" }}
              />
            </Link>
          </span>
          <footer
            className="cartingFunction rounded align-items-center position-absolute w-100 bottom-0 pull-right w-75 pull-left text-center"
            style={{ backgroundColor: myTheme }}
          >
            <div
              className="name "
              style={{
                fontFamily: "cursive",
                color: "white",
              }}
            >
              {imgData.name}
            </div>
            <div
              className="price rounded"
              style={{
                fontFamily: "cursive",
                color: "white",
                border: "1px solid white",
                padding: "2px",
              }}
            >
              {imgData.value} kyats
            </div>
            <div className="theee">{buttonDisplay}</div>
          </footer>
        </section>
      </div>
    </>
  );
}
