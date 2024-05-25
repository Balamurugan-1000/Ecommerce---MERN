import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useCreateProductMutation, useUploadProductImageMutation } from '../../redux/api/productApiSlice'
import { useFetchCategoriesQuery } from '../../redux/api/categoryApiSlice'
import { toast } from 'react-toastify'
import AdminMenu from "./AdminMenu"
const ProductList = () => {
	const [image, setImage] = useState('')
	const [name, setName] = useState('')
	const [price, setPrice] = useState('')
	const [description, setDescription] = useState('')
	const [category, setCategory] = useState('')
	const [quantity, setQuantity] = useState('')
	const [brand, setBrand] = useState('')
	const [stock, setStock] = useState(0)
	const [imageUrl, setImageUrl] = useState('')

	const navigate = useNavigate()

	const [uploadProductImage] = useUploadProductImageMutation()
	const [createProduct] = useCreateProductMutation()
	const { data: categories } = useFetchCategoriesQuery()

	const uploadFileHandler = async (e) => {
		e.preventDefault()
		const formData = new FormData()
		formData.append('image', e.target.files[0])
		try {
			const res = await uploadProductImage(formData).unwrap()
			toast.success(res.message)
			setImage(res.image)
			setImageUrl(res.image)

		} catch (error) {
			toast.error(error?.data?.message || error.message)

		}
	}



	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const productData = new FormData
			productData.append('image', image)
			productData.append('name', name)
			productData.append('description', description)
			productData.append('price', price)
			productData.append('category', category)
			productData.append('quantity', quantity)
			productData.append('brand', brand)
			productData.append('countInStock', stock)

			const { data } = await createProduct(productData)
			if (data.error) {
				toast.error('product create failed Try again')
			} else {
				toast.success(`${name} is created successfully`)
				navigate('/admin/allproductslist')
			}

		} catch (error) {
			console.error(error)
			toast.error('product create failed Try again')
		}
	}


	return (
		<div className="container xl:mx-[9rem] sm:mx-[0rem] text-slate-gray overflow-auto">
			<div className="flex flex-col overflow-auto md:flex-row">
				<AdminMenu />
				<div className="p-3 md:w-3/4">
					<div className="h-12 my-5 text-4xl font-semibold uppercase text-coral-red">Create Product</div>

					{imageUrl && (
						<div className="text-center">
							<img src={imageUrl} alt="product" className="block mx-auto max-h-[200px]" />
						</div>
					)}

					<div className="mb-3">
						<label className="block w-full px-4 font-bold text-center border rounded-lg cursor-pointer text-coral-red py-11">
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
								<label className="text-coral-red" htmlFor="name">Name</label><br />
								<input type="text" value={name} className="p-4 mb-3 w-[25rem] border rounded-lg bg-white text-slate-gray"
									onChange={e => setName(e.target.value)}
								/>
							</div>
							<div className=" two">
								<label className="text-coral-red" htmlFor="name block">Price</label><br />
								<input type="number" value={price} className="p-4 mb-3 w-[25rem] border rounded-lg bg-white text-slate-gray"
									onChange={e => setPrice(e.target.value)}
								/>
							</div>
						</div>
						<div className="flex flex-wrap justify-center md:justify-normal gap-11 ">
							<div className="one">
								<label className="text-coral-red" htmlFor="name block">Quantity</label><br />
								<input type="number" value={quantity} className="p-4 mb-3 w-[25rem] border rounded-lg bg-white text-slate-gray"
									onChange={e => setQuantity(e.target.value)}
								/>
							</div>
							<div className=" two">
								<label className="text-coral-red" htmlFor="name block">Brand</label><br />
								<input type="text" value={brand} className="p-4 mb-3 w-[25rem] border rounded-lg bg-white text-slate-gray"
									onChange={e => setBrand(e.target.value)}
								/>
							</div>
						</div>
						<div className="flex flex-wrap justify-center md:justify-normal gap-11 ">
							<div className="flex flex-col one">
								<label htmlFor="" className="mt-5 text-coral-red">Description</label>
								<textarea className="p-2 mb-3  bg-white text-slate-gray border rounded-lg xl:w-[53rem] w-[25rem]  " value={description}
									onChange={e => setDescription(e.target.value)}></textarea>
							</div>
						</div>
						<div className="flex flex-wrap justify-center md:justify-normal gap-11 ">
							<div className="one">
								<label className="text-coral-red" htmlFor="name block">Stock</label><br />
								<input type="number" value={stock} className="p-4 mb-3 w-[25rem] border rounded-lg bg-white text-slate-gray"
									onChange={e => setStock(e.target.value)}
								/>
							</div>
							<div className=" two">
								<label htmlFor="name block" className="text-coral-red">Category</label><br />
								<select placeholder="Choose category" className="p-4 mb-3 w-[25rem] border rounded-lg bg-white text-slate-gray"

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
						<button
							onClick={handleSubmit}
							className="px-10 py-4 mt-5 text-lg font-black rounded-lg bg-coral-red text-white active:bg-cotext-coral-red transition-colors delay-[10ms]">Submit</button>
					</div>

				</div>
			</div>

		</div>
	)
}

export default ProductList