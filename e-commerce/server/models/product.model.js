import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "product name is required"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "description is required"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "price is required"],
        min: [0, "price cannot be negative"],
    },
    category: {
        type: String,
        required: [true, "category is required"],
        trim: true,
    },
    stock: {
        type: Number,
        required: [true, "stock is required"],
        min: [0, "stock cannot be negative"],
    },
    sku: {
        type: String,
        required: [true, "sku is required"],
        unique: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Product = mongoose.model("Product", productSchema);

export default Product;
