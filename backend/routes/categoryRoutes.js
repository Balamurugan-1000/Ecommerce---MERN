import express from "express";
import { createCategory, updateCategory, readCategory, removeCategory, allCategories } from "../controllers/categoryController.js"
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/').post(authenticate, authorizeAdmin, createCategory)
router.route('/:categoryId')
	.put(authenticate, authorizeAdmin, updateCategory)
	.delete(authenticate, authorizeAdmin, removeCategory)
router.route('/categories').get(allCategories)
router.route('/:id').get(readCategory)

export default router