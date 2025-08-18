import {v2 as cloudinary} from 'cloudinary'
import Product from '../models/Product'

// Add Product: /api/product/add
export const addProduct = async (req,res) => {
    try {
        let productData =  JSON.parse(req.body.productData)

        const images = req.files

        let imagesUrl = await Promise.all    (
            images.map(async(item) => {
                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'})
                return result.secure_url
            })
        )

        await Product.create({...productData, image: imagesUrl})

        res.json({success: true, massage: "Product Added"})
    } catch (e) {
        console.log(e.massage);
        res.json({success: false, massage: e.massage})
    }
}

// Get Product: /api/product/list
export const productList = async (req,res) => {
    try {
        const products = await Product.find({})
        res.json({success: true, products})
    } catch (e) {
        console.log(e.massage);
        res.json({success: false, massage: e.massage})
    }
}

//  Get Single Product: /api/product/id
export const productById = async (req,res) => {
    try {
        const { id } = req.body
        const products = await Product.findById({id})
        res.json({success: true, products})
    } catch (e) {
        console.log(e.massage);
        res.json({success: false, massage: e.massage})
    }
}

//  Change Product inStock: /api/product/stock
export const changeStock = async (req,res) => {

}
