import { useState, useEffect } from "react"
import { Route, useNavigate, useParams } from 'react-router-dom'
import { useUpdateProductMutation, useDeleteProductMutation, useGetProductByIdQuery, useUploadProductImageMutation, useAllProductsQuery } from "../../redux/api/productApiSlice"
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice"
import { toast } from "react-toastify"
import AdminMenu from "./AdminMenu"
const UpdateProducts = () => {
	const params = useParams()

	const { data: productData } = useGetProductByIdQuery(params._id)
	const [image, setImage] = useState(productData?.image || "")
	const [name, setName] = useState(productData?.name || '')
	const [price, setPrice] = useState(productData?.price || '')
	const [description, setDescription] = useState(productData?.description || '')
	const [category, setCategory] = useState(productData?.category || '')
	const [brand, setBrand] = useState(productData?.brand || "")
	const [stock, setStock] = useState(productData?.countInStock || '')
	const [imageUrl, setImageUrl] = useState(productData?.image || "")
	const [quantity, setQuantity] = useState(productData?.quantity || '')

	const navigate = useNavigate()
	const { data: categories = [] } = useFetchCategoriesQuery()
	const [uploadProductImage] = useUploadProductImageMutation()
	const [updateProduct] = useUpdateProductMutation()
	const [deleteProduct] = useDeleteProductMutation()

	useEffect(() => {
		if (productData && productData._id) {
			setName(productData.name)
			setBrand(productData.brand)
			setPrice(productData.price)
			setImage(productData.image)
			setCategory(productData?.category);
			setDescription(productData.description)
			setQuantity(productData.quantity)
			setStock(productData.countInStock)
		}
	}, [productData])
	const uploadFileHandler = async (e) => {
		const formData = new FormData()
		formData.append('image', e.target.files[0])
		try {
			const res = await uploadProductImage(formData).unwrap()
			toast.success('Item added successfully')
			setImage(res.image)
		} catch (error) {
			toast.error(error?.message || "Error in Uploading the image")
		}
	}
	const handleUpdate = async (e) => {
		e.preventDefault()
		try {
			const formData = new FormData()
			formData.append('image', image)
			formData.append('name', name)
			formData.append('description', description)
			formData.append('price', price)
			formData.append("category", category);
			formData.append('quantity', quantity)
			formData.append('brand', brand)
			formData.append('countInStock', stock)
			const data = await updateProduct({ productId: params._id, formData });
			if (data?.error) {
				toast.error(data.error)
			} else {
				toast.success(`product Updated successfully`)
				navigate('/admin/allproductslist')

			}

		} catch (error) {
			console.error(error)
			toast.error('product Update failed Try again')
		}
	}

	const handleDelete = async (e) => {
		try {
			let answer = window.confirm("Are you sure to delete this product!!")
			if (!answer) return

			const { data } = await deleteProduct(params._id)
			toast.success(`${data.name} Deleted Successfully`)
			navigate('/admin/allproductslist')
		} catch (error) {
			console.log(error)
			toast.error(`Deletion failed Try again`)
		}
	}
	return (
		<div className="container xl:mx-[9rem] sm:mx-[0rem] text-slate-gray overflow-auto">
			<div className="flex flex-col overflow-auto md:flex-row">
				<AdminMenu />
				<div className="p-3 md:w-3/4">
					<div className="h-12 my-5 text-[#14ceb5] text-4xl font-semibold uppercase">Update Product</div>

					{image && (
						<div className="text-center">
							<img src={image} alt="product" className="block mx-auto max-h-[200px]" />
						</div>
					)}

					<div className="mb-3">
						<label className="text-[#14ceb5] block w-full px-4 font-bold text-center  border rounded-lg cursor-pointer py-11">
							{image ? image.name : "Upload image"}
							<input type="file" name="image" accept="image/*"
								onChange={(e) => {
									uploadFileHandler(e)
								}}
								className={`${!image ? "hidden" : "text-slate-gray"}`}
							/>
						</label>
					</div>

					<div className="p-3">
						<div className="flex flex-wrap justify-center md:justify-normal gap-11">
							<div className="one">
								<label className="text-[#14ceb5]" htmlFor="name">Name</label><br />
								<input type="text" value={name} className="p-4 mb-3 w-[25rem] border rounded-lg bg-[#101011] text-slate-gray"
									onChange={e => setName(e.target.value)}
								/>
							</div>
							<div className=" two">
								<label className="text-[#14ceb5]" htmlFor="name block">Price</label><br />
								<input type="number" value={price} className="p-4 mb-3 w-[25rem] border rounded-lg bg-[#101011] text-slate-gray"
									onChange={e => setPrice(e.target.value)}
								/>
							</div>
						</div>
						<div className="flex flex-wrap justify-center md:justify-normal gap-11 ">
							<div className="one">
								<label className="text-[#14ceb5]" htmlFor="name block">Quantity</label><br />
								<input type="number" value={quantity} className="p-4 mb-3 w-[25rem] border rounded-lg bg-[#101011] text-slate-gray"
									onChange={e => setQuantity(e.target.value)}
								/>
							</div>
							<div className=" two">
								<label className="text-[#14ceb5]" htmlFor="name block">Brand</label><br />
								<input type="text" value={brand} className="p-4 mb-3 w-[25rem] border rounded-lg bg-[#101011] text-slate-gray"
									onChange={e => setBrand(e.target.value)}
								/>
							</div>
						</div>
						<div className="flex flex-wrap justify-center md:justify-normal gap-11 ">
							<div className="flex flex-col one">
								<label htmlFor="" className="text-[#14ceb5] mt-5">Description</label>
								<textarea className="p-2 mb-3  bg-[#101011] text-slate-gray border rounded-lg xl:w-[53rem] w-[25rem]  " value={description}
									onChange={e => setDescription(e.target.value)}></textarea>
							</div>
						</div>
						<div className="flex flex-wrap justify-center md:justify-normal gap-11 ">
							<div className="one">
								<label className="text-[#14ceb5]" htmlFor="name block">Stock</label><br />
								<input type="number" value={stock} className="p-4 mb-3 w-[25rem] border rounded-lg bg-[#101011] text-slate-gray"
									onChange={e => setStock(e.target.value)}
								/>
							</div>
							<div className=" two">
								<label htmlFor="name block" className="text-[#14ceb5]">Category</label><br />
								<select placeholder="Choose category" className="p-4 mb-3 w-[25rem] border rounded-lg bg-[#101011] text-slate-gray"
									value={category}
									onChange={(e) => setCategory(e.target.value)}
								>
									{categories?.map((c) => (
										<option key={c._id} value={c._id}>
											{c.name}
										</option>
									))}
								</select>
							</div>
						</div>
						<div className="flex gap-10">
							<button
								onClick={(e) => handleUpdate(e)}
								className="px-10 py-4 mt-5 text-lg font-bold rounded-lg bg-green-500 active:bg-[#14ceb5] transition-colors delay-[10ms]">Update</button>
							<button
								onClick={handleDelete}
								className="px-10 py-4 mt-5 text-lg font-bold rounded-lg bg-red-500 active:bg-[#14ceb5] transition-colors delay-[10ms]">Delete</button>
						</div>
					</div>

				</div>
			</div>

		</div>
	)
}

export default UpdateProducts