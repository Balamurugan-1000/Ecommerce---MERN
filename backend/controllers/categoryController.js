import Category from '../models/categoryModel.js'
import asyncHandler from "../middlewares/asyncHandler.js";
const createCategory = asyncHandler(async (req, res) => {
	try {
		const { name } = req.body;

		if (!name)
			return res.status(404).json({ error: "Name is required" })

		const existingCategory = await Category.findOne({ name })

		if (existingCategory)
			res.status(400).json({ error: "Category Already Existed" })

		const newCategory = new Category({ name })
		newCategory.save()

		res.status(200).json(newCategory)

	} catch (error) {
		console.log(error)
		return res.status(400).json(error)
	}
})
const updateCategory = asyncHandler(async (req, res) => {
	try {
		const { categoryId } = req.params;

		const category = await Category.findOne({ _id: categoryId })
		if (!category) return res.status(404).json({ error: "Category Not found" })
		const { name } = req.body;

		category.name = name || category.name
		await category.save()
		res.json(category)

	} catch (error) {
		console.log(error)
		res.status(500).json(error)
	}

})

const removeCategory = asyncHandler(async (req, res) => {

	try {
		const { categoryId } = req.params
		const category = await Category.findOne({ _id: categoryId })
		if (!category) return res.status(404).json({ error: "Category Not found" })
		const removed = await Category.findByIdAndDelete(categoryId)

		res.json(removed)
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: "Internal server Error" })
	}
})

const allCategories = asyncHandler(async (req, res) => {
	try {
		const all = await Category.find({})
		res.json(all)
	} catch (error) {
		console.log(error)
		res.status(400).json(error.message)

	}
})
const readCategory = asyncHandler(async (req, res) => {
	try {
		const category = await Category.findOne({ _id: req.params.id })
		res.json(category)
	} catch (error) {
		console.log(error)
		res.status(400).json(error.message)

	}
})
export { createCategory, updateCategory, removeCategory, allCategories, readCategory }