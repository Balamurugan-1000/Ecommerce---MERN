import express from "express";
import formidable from "express-formidable";
import checkId from "../middlewares/checkId.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import {
	addProduct,
	updateProduct,
	removeProduct,
	fetchProducts,
	fetchProductsById,
	fetchAllProducts,
	addProductReview,
	fetchTopProducts,
	fetchNewProducts,
	filteredProducts

} from "../controllers/productController.js";
const router = express.Router()



router.route('/').get(fetchProducts).post(authenticate, authorizeAdmin, formidable(), addProduct)

router.route('/allproducts').get(fetchAllProducts)
router.route('/top').get(fetchTopProducts)
router.route('/new').get(fetchNewProducts)
router.route('/:id')
	.get(fetchProductsById)
	.put(authenticate, authorizeAdmin, formidable(), updateProduct)
	.delete(authenticate, authorizeAdmin, removeProduct)

router.route('/:id/reviews').post(authenticate, checkId, addProductReview)

router.route('/filtered').post(filteredProducts)
export default router