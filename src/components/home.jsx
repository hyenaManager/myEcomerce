import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Catagories from "/src/components/catagories";
import Items from "/src/components/items";
import "@fortawesome/fontawesome-svg-core/styles.css";

export default function Home() {
  return (
    <>
      <motion.div
        className="components container-fluid row"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <aside className="col-3">
          <Catagories />
        </aside>
        <main className="taskContainer col">
          <Items />
        </main>
      </motion.div>
    </>
  );
}
