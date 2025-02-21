import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function AddProducts() {
  const [itemName, setItemName] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [itemPrice, setItemPrice] = useState();
  const [itemImage, setItemImage] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("itemName", itemName);
    formData.append("itemDesc", itemDesc);
    formData.append("itemPrice", itemPrice);
    formData.append("itemImage", itemImage);

    axios
      .post("http://localhost:3000/admin/addproducts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        console.log(result);
        toast.success(result.data.message);
        setItemName("");
        setItemDesc("");
        setItemPrice("");
        document.getElementById("itemImage").value = "";
      })
      .catch((err) => {
        toast.error(err.data.response.error);
      });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label forHtml="itemName" className="form-label">
            Item Name
          </label>
          <input
            type="text"
            className="form-control"
            id="itemName"
            value={itemName}
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
            value={itemDesc}
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
            value={itemPrice}
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

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

export default AddProducts;
