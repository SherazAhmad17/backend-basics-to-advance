import CustomError from "../handler/CustomError.handler.js";
import Product from "../models/product.model.js";
import AsyncHandler from "../handler/AsyncHandler.js";


// create product
const createProduct = AsyncHandler(async(req,res,next)=>{

    const { name, description, price, category, stock, sku } = req.body;

    // check for duplicate sku
    const skuExist = await Product.findOne({ sku });
    if(skuExist){
        return next(new CustomError(400, "Product with this SKU already exists"));
    }

    const product = await Product.create({
        name,
        description,
        price,
        category,
        stock,
        sku
    })

    if(!product){
        return next(new CustomError(500, "Something went wrong while creating product"));
    }

    res.status(201).json({
        success: true,
        message: "Product created successfully",
        product
    })

})


// get all products
const getAllProducts = AsyncHandler(async(req,res,next)=>{

    const products = await Product.find();

    res.status(200).json({
        success: true,
        count: products.length,
        products
    })

})


// get product by id
const getProductById = AsyncHandler(async(req,res,next)=>{

    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new CustomError(404, "Product not found"));
    }

    res.status(200).json({
        success: true,
        product
    })

})


// update product
const updateProduct = AsyncHandler(async(req,res,next)=>{

    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new CustomError(404, "Product not found"));
    }

    // check for duplicate sku if sku is being changed
    if(req.body.sku && req.body.sku !== product.sku){
        const skuExist = await Product.findOne({ sku: req.body.sku });
        if(skuExist){
            return next(new CustomError(400, "Product with this SKU already exists"));
        }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    res.status(200).json({
        success: true,
        message: "Product updated successfully",
        product: updatedProduct
    })

})


// delete product
const deleteProduct = AsyncHandler(async(req,res,next)=>{

    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new CustomError(404, "Product not found"));
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    })

})


export { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };
