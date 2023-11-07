import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { ThemeContext } from "./themeContext";
import { motion } from "framer-motion";
import {
  faBurger,
  faCakeCandles,
  faCarrot,
  faHatCowboy,
  faListAlt,
  faMartiniGlassCitrus,
  faPizzaSlice,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setItemType } from "../features/itemsType/items";
export default function Catagories() {
  const myTheme = useContext(ThemeContext);
  const itemsType = useSelector((state) => state.itemType.value);
  const dispatch = useDispatch();
  return (
    <>
      <div className="">
        <ul className="  list-group catagoriesList ">
          <motion.li
            whileHover={{
              scale: 1.1,
              backgroundColor: "greenyellow",
              color: "white",
            }}
            whileTap={{ scale: 0.9 }}
            className={
              "list-group-item text-center " +
              (itemsType === "all" ? " bg-secondary" : "")
            }
            onClick={() => {
              dispatch(setItemType("all"));
            }}
            // style={
            //   itemsType === "cake"
            //     ? { color: "white", backgroundColor: myTheme }
            //     : { color: myTheme, backgroundColor: "white" }
            // }
          >
            <FontAwesomeIcon
              style={{ color: myTheme }}
              icon={faListAlt}
              title="all"
            />
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.1, backgroundColor: "greenyellow" }}
            whileTap={{ scale: 0.9 }}
            className={
              "list-group-item text-center " +
              (itemsType === "fruit" ? " bg-secondary" : "")
            }
            onClick={() => {
              dispatch(setItemType("fruit"));
            }}
            // style={
            //   itemsType === "fruit"
            //     ? { color: "white", backgroundColor: myTheme }
            //     : { color: myTheme, backgroundColor: "white" }
            // }
          >
            <FontAwesomeIcon
              style={{ color: myTheme }}
              icon={faCarrot}
              title="fruit"
            />
          </motion.li>
          <motion.li
            whileHover={{
              scale: 1.1,
              backgroundColor: "greenyellow",
              color: "white",
            }}
            whileTap={{ scale: 0.9 }}
            className={
              "list-group-item text-center " +
              (itemsType === "snack" ? " bg-secondary" : "")
            }
            onClick={() => {
              dispatch(setItemType("snack"));
            }}
            // style={
            //   itemsType === "snack"
            //     ? { color: "white", backgroundColor: myTheme }
            //     : { color: myTheme, backgroundColor: "white" }
            // }
          >
            <FontAwesomeIcon
              style={{ color: myTheme }}
              icon={faBurger}
              title="snack"
            />
          </motion.li>
          <motion.li
            whileHover={{
              scale: 1.1,
              backgroundColor: "greenyellow",
              color: "white",
            }}
            whileTap={{ scale: 0.9 }}
            className={
              "list-group-item text-center " +
              (itemsType === "cake" ? " bg-secondary" : "")
            }
            onClick={() => {
              dispatch(setItemType("cake"));
            }}
            // style={
            //   itemsType === "cake"
            //     ? { color: "white", backgroundColor: myTheme }
            //     : { color: myTheme, backgroundColor: "white" }
            // }
          >
            <FontAwesomeIcon
              style={{ color: myTheme }}
              icon={faCakeCandles}
              title="cake"
            />
          </motion.li>
          <motion.li
            whileHover={{
              scale: 1.1,
              backgroundColor: "greenyellow",
              color: "white",
            }}
            whileTap={{ scale: 0.9 }}
            className={
              "list-group-item text-center " +
              (itemsType === "hat" ? " bg-secondary" : "")
            }
            onClick={() => {
              dispatch(setItemType("hat"));
            }}
            // style={
            //   itemsType === "hat"
            //     ? { color: "white", backgroundColor: myTheme }
            //     : { color: myTheme, backgroundColor: "white" }
            // }
          >
            <FontAwesomeIcon
              style={{ color: myTheme }}
              icon={faHatCowboy}
              title="hat"
            />
          </motion.li>
          <motion.li
            whileHover={{
              scale: 1.1,
              backgroundColor: "greenyellow",
              color: "white",
            }}
            whileTap={{ scale: 0.9 }}
            className={
              "list-group-item text-center " +
              (itemsType === "pizza" ? " bg-secondary" : "")
            }
            onClick={() => {
              dispatch(setItemType("pizza"));
            }}
            // style={
            //   itemsType === "pizza"
            //     ? { color: "white", backgroundColor: myTheme }
            //     : { color: myTheme, backgroundColor: "white" }
            // }
          >
            <FontAwesomeIcon
              style={{ color: myTheme }}
              icon={faPizzaSlice}
              title="pizza"
            />
          </motion.li>
          <motion.li
            whileHover={{
              scale: 1.1,
              backgroundColor: "greenyellow",
              color: "white",
            }}
            whileTap={{ scale: 0.9 }}
            className={
              "list-group-item text-center " +
              (itemsType === "beverage" ? " bg-secondary" : "")
            }
            onClick={() => {
              dispatch(setItemType("beverage"));
            }}
            // style={
            //   itemsType === "beverage"
            //     ? { color: "white", backgroundColor: myTheme }
            //     : { color: myTheme, backgroundColor: "white" }
            // }
          >
            <FontAwesomeIcon
              style={{ color: myTheme }}
              icon={faMartiniGlassCitrus}
              title="beverage"
            />
          </motion.li>
        </ul>
      </div>
    </>
  );
}
