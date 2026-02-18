import { Router } from "express";
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from "../controllers/product.controller.js";
import validate from "../middleware/validate.js";
import productSchema from "../schemas/productSchema.js";
import authMiddleware from "../middleware/authMiddleware.js";


const productRouter = Router();

// all product routes are protected with authMiddleware
productRouter.route('/').post(authMiddleware, validate(productSchema), createProduct);
productRouter.route('/').get(authMiddleware, getAllProducts);
productRouter.route('/:id').get(authMiddleware, getProductById);
productRouter.route('/:id').put(authMiddleware, validate(productSchema), updateProduct);
productRouter.route('/:id').delete(authMiddleware, deleteProduct);


export default productRouter;
