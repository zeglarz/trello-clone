import React, { useState } from "react";
import Item from "../components/Item";
import DropWrapper from "../components/DropWrapper";
import Col from "../components/Col";
import { data, statuses } from "../data";

const Homepage = () => {
  const [items, setItems] = iseState(data);
  return <div>Time to start coding!</div>;
};

export default Homepage;
