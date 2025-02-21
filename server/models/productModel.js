import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    itemName : {type: String, required: true},
    itemDesc : {type: String, required: true},
    itemPrice : {type: String, required: true},
})

const productModel = mongoose.model("product", productSchema)

export default productModel

