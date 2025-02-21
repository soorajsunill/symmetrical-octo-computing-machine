import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function EditProducts() {
  const [product, setProduct] = useState({});
  const [itemImage, setItemImage] = useState(null);

  let { id } = useParams();

  console.log(id);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/admin/geteditproduct/${id}`)
      .then((result) => {
        console.log(result);
        setProduct(result.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <h1>Edit Product</h1>
      <form onSubmit>
        <div className="mb-3">
          <label forHtml="itemName" className="form-label">
            Item Name
          </label>
          <input
            type="text"
            className="form-control"
            id="itemName"
            value={product.itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label forHtml="itemDesc" className="form-label">
            Item Description
          </label>
          <input
            type="text"
            className="form-control"
            value={product.itemDesc}
            id="itemDesc"
            onChange={(e) => setItemDesc(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label forHtml="itemPrice" className="form-label">
            Item Price
          </label>
          <input
            type="number"
            className="form-control"
            id="itemPrice"
            value={product.itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label forHtml="itemImage" className="form-label">
            Item Image
          </label>
          <input
            type="file"
            className="form-control"
            id="itemImage"
            onChange={(e) => setItemImage(e.target.files[0])}
          />
        </div>
        <div>
          <img
            src={`http://localhost:3000/images/products/${product._id}.jpg`}
            alt={product.itemName}
            style={{ width: "100px", height: "100px" }}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

export default EditProducts;
