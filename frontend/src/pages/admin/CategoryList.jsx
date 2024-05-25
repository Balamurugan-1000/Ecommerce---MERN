import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'

import {
	useCreateCategoryMutation,
	useDeleteCategoryMutation,
	useFetchCategoriesQuery,
	useUpdateCategoryMutation,
} from '../../redux/api/categoryApiSlice'
import CategoryForm from '../../components/CategoryForm'
import Model from '../../components/Model'
import AdminMenu from './AdminMenu'
const categoryList = () => {
	const { data: categories, refetch } = useFetchCategoriesQuery()

	const [name, setName] = useState('')
	const [selectCategory, setSelectCategory] = useState(null)
	const [updateName, setUpdateName] = useState('')
	const [modelVisible, setModelVisible] = useState(false)
	const [createCategory] = useCreateCategoryMutation()
	const [updateCategory] = useUpdateCategoryMutation()
	const [deleteCategory] = useDeleteCategoryMutation()


	const handleCreateCategory = async (e) => {
		e.preventDefault()
		if (!name) {
			toast.error('Category name is required!')
			return
		}
		try {
			const result = createCategory({ name }).unwrap
			refetch()
			if (result.error) {
				toast.error(result.error)
			}
			else {
				// refetch()
				setName("");
				toast.success('category created successfully');
				await refetch()
			}
		} catch (error) {
			console.error(error)
			toast.error('creating category failed try again')
		}
		refetch()

	}
	const handleUpdateCategory = async (e) => {
		e.preventDefault();
		if (!updateName) {
			toast.error('Category name is required')
			return
		}
		try {
			const result = await updateCategory({ categoryId: selectCategory._id, updateCategory: { name: updateName } }).unwrap()
			if (result.error) {
				toast.error(result.error)
			}
			else {
				toast.success(`${result.name} updated successfully`);
				setSelectCategory(null);
				setUpdateName('')
				setModelVisible(false)
				refetch()
			}
		} catch (error) {
			console.log(error)
		}
	}
	const handleDeleteCategory = async () => {
		try {
			const result = await (deleteCategory(selectCategory._id)).unwrap()
			if (result.error) {
				toast.error(result.error)


			}
			else {
				toast.success(`${selectCategory.name} is deleted successfully`)
				setModelVisible(false)
				setSelectCategory(null)
				refetch()
			}
		} catch (error) {
			console.error(error)
			toast.error('Category deletion failed Try again...')
		}

	}
	return (
		<div className='ml-[10rem] flex flex-col bg-primary md:flex-row'>
			<AdminMenu />
			<div className="p-3 md:3/4">
				<div className="h-12 text-xl font-bold text-coral-red ">Manage Categories</div>
				<CategoryForm value={name} setValue={setName} handleSubmit={handleCreateCategory} />
				<br />
				<hr />
				<div className="flex flex-wrap">
					{categories?.map(category => (
						<div className="" key={category._id}>
							<button className='px-4 py-2 m-3 bg-white border rounded-lg text-coral-red border-coratext-coral-red hover:bg-coratext-coral-red hover:text-slate-gray focus:outline-none foucs:ring-2 focus:ring-coratext-coral-red focus:ring-opacity-50' onClick={() => {
								setModelVisible(true)
								setSelectCategory(category)
								setUpdateName(category.name)

							}}>{category.name}</button>
						</div>
					))}
				</div>
				<Model isOpen={modelVisible} onClose={() => { setModelVisible(false) }} >
					<CategoryForm
						value={updateName}
						setValue={(value) => setUpdateName(value)}
						handleSubmit={handleUpdateCategory}
						buttonText='Update'
						handleDelete={handleDeleteCategory}
					/>
				</Model>

			</div>

		</div>
	)
}

export default categoryList