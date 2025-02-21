import React, { useEffect, useState } from "react";
import axios from "axios";

function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/getproducts")
      .then((result) => {
        console.log(result);
        setProducts(result.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <h1>Shop</h1>
      <ul>Items</ul>
      {products.map((item, index) => (
        <li key={index}>{item.itemName}</li>
      ))}
    </>
  );
}

export default Shop;
