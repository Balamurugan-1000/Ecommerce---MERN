import { Link } from "react-router-dom"
import moment from 'moment'
import { useAllProductsQuery } from "../../redux/api/productApiSlice"
import AdminMenu from "./AdminMenu"
import Loader from '../../components/Loader'
import { useEffect } from "react"
import { imageURL } from "../../redux/constants"

const AllProduct = () => {
	const { data: products, isError, isLoading, refetch } = useAllProductsQuery()
	if (isLoading) {
		return <Loader />
	}
	if (isError) {
		return <div> Error in Loading Products</div>
	}
	return (
		<div className="container mx-[5rem] text-slate-gray h-full bg-primary">
			<div className="flex flex-col md:flex-row">
				<div className="p-3">
					<div className="ml-[2rem] mb-5  text-[2rem] font-bold  h-12">
						All Products  ({products.length})
					</div>
					<div className="flex flex-wrap gap-20 mt-10 items-cente justify-evenly">
						{products?.map(product => (

							<div className="flex gap-5 h-[20rem] p-3  shadow-3xl rounded " key={product._id}>
								<img src={`${imageURL}${product.image}`} alt={product.name} className="w-[12rem]  my-auto h-[15rem] object-fill" />
								<div className="flex flex-col justify-around p-4">
									<div className="flex justify-between ">
										<h5 className="text-lg font-semibold text-ellipsis ">	{product?.name}</h5>
										<p className="text-sm text-gray-400">
											{moment(product.createAt).format("MMMM Do YYYY")}
										</p>
									</div>
									<p className="text-gray-400 md:w-[20rem] sm:w-[10rem] text-sm mb-4">
										{product?.description?.substring(0, 100)}...
									</p>
									<div className="flex justify-between">
										<Link to={`/admin/product/update/${product._id}`}
											className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-coral-red hover:bg-coral-red focus:ring-4 focus:outline-none focus:ring-coral-red dark:bg-coral-red
												dark:hover:bg-[#488a9a] dark:focus:ring-pink-800"

										>Update Product
										</Link>
									</div>
								</div>
							</div>

						))}
					</div>
				</div>
				<AdminMenu />
			</div>

		</div>
	)
}

export default AllProduct