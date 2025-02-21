import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Products() {
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

function handleDelete(id) {
  if (window.confirm("Are you sure to delete this product?")) {
    axios
      .delete(`http://localhost:3000/admin/deleteproduct/${id}`)
      .then((result) => {
        setProducts(products.filter((product) => product._id !== id));
        console.log(result.data.message);
      })
      .catch((err) => {
        consolog.log(err);
      });
  }
}

return (
  <>
    <h1>Products</h1>

    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Image</th>
          <th scope="col">Item Name</th>
          <th scope="col">Description</th>
          <th scope="col">Price</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.length > 0 ? (
          products.map((item, index) => (
            <tr key={item._id}>
              <th scope="row">{index + 1}</th>
              <td>
                <img
                  src={`http://localhost:3000/images/products/${item._id}.jpg`}
                  alt=""
                  style={{ maxWidth: "50px" }}
                />
              </td>
              <td>{item.itemName}</td>
              <td>{item.itemDesc}</td>
              <td>{item.itemPrice}</td>
              <td>
                <Link
                  to={`/admin/dashboard/edit-product/${item._id}`}
                  className="btn btn-outline-primary"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="btn btn-outline-danger ms-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="text-center">
              No products available
            </td>
          </tr>
        )}
      </tbody>
    </table>
    <Link to="/admin/dashboard/addproducts" className="btn btn-success">
      Add Products
    </Link>
  </>
);
}

export default Products;
