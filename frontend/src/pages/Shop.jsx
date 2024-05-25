import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice"
import { setCategories, setChecked, setProducts } from "../redux/features/shop/shopSlice"
import Loader from "../components/Loader"
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice"
import ProductCard from "./products/ProductCard"

const Shop = () => {

	const dispatch = useDispatch()
	const { categories, products, checked, radio } = useSelector((state) => state.shop)
	const categoriesQuery = useFetchCategoriesQuery()
	const [maxPriceFilter, setMaxPriceFilter] = useState('')
	const [minpriceFilter, setMinPriceFilter] = useState('')
	const filteredProductsQuery = useGetFilteredProductsQuery({
		checked, radio
	})
	useEffect(() => {
		if (!categoriesQuery.isLoading)
			dispatch(setCategories(categoriesQuery.data))
	}, [categoriesQuery.data, dispatch])

	useEffect(() => {
		if (!checked.length || !radio.length) {
			if (!filteredProductsQuery.isLoading) {
				const filteredProducts = filteredProductsQuery.data.filter((product) => {
					return (
						(!maxPriceFilter || product.price < maxPriceFilter) && (!minpriceFilter || product.price > minpriceFilter)
					)
				})
				dispatch(setProducts(filteredProducts))
			}
		}
	}, [checked, radio, filteredProductsQuery.data, dispatch, maxPriceFilter, minpriceFilter])




	const handleBrandClick = (brand) => {
		const productByBrand = filteredProductsQuery.data?.filter((product) => product.brand === brand)
		dispatch(setProducts(productByBrand))
	}

	const handleCheck = (value, id) => {
		const updateChecked = value ? [...checked, id] : checked.filter((c) => c !== id)
		dispatch(setChecked(updateChecked))
	}

	const uniqueBrand = [
		...Array.from(
			new Set(filteredProductsQuery.data?.map((p) => p.brand).filter((b) => b !== undefined))
		)
	]

	const handlePriceChange = e => {
		setMaxPriceFilter(e.target.value)
	}
	const handleMinPriceChange = e => {
		setMinPriceFilter(e.target.value)
	}


	return (
		<>
			<div className="container mx-auto">
				<div className="flex md:flex-row">
					<div className="p-3 my-2 ml-12 text-slate-gray bg-primary ">
						<h2 className="py-2 mb-2 font-bold text-center rounded-full bg-primary text-coral-red ">Filter by categories</h2>
						<div className="py-5 w-[15rem]">
							{categories?.map((c) => (
								<div className="mb-2" key={c._id}>
									<div className="flex items-center mr-4">
										<input type="checkbox" id="red-checkbox" onChange={(e) => handleCheck(e.target.checked, c._id)}
											className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-coral-red focus:ring-coral-red dark:focus:ring-coral-red dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"

										/>
										<label htmlFor="pink-checkBox" className="ml-2 text-sm font-medium text-slate-gray dark:text-gray-300">{c.name}</label>
									</div>
								</div>
							))}
						</div>

						<h2 className="py-2 mb-2 font-bold text-center rounded-full text-coral-red bg-primary h4">Filter by Brands</h2>
						<div className="p-5">
							{uniqueBrand?.map((brand) => (
								<div key={brand}>
									<input type="radio" id={brand} name={"brand"} onChange={() => handleBrandClick(brand)}
										className="w-4 h-4 bg-gray-100 border-gray-300 text-coral-red focus:ring-coral-red dark:focus:ring-coral-red dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
									/>
									<label htmlFor="pink-checkBox" className="ml-2 text-sm font-medium text-slate-gray dark:text-gray-300">{brand}</label>

								</div>
							))}
						</div>

						<h2 className="py-2 mb-2 font-bold text-center rounded-full text-coral-red bg-primary h4">
							Filer by Price
						</h2>
						<div className="px-5 py-2 w-[15rem]">
							<input
								type="text"
								placeholder="Enter minimum Price"
								value={minpriceFilter}
								onChange={handleMinPriceChange}
								className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg bg-primary focus:outline-none focus:ring focus:border-coral-red "
							/>
						</div>
						<div className="px-5 py-2 w-[15rem]">
							<input
								type="text"
								placeholder="Enter maximum Price"
								value={maxPriceFilter}
								onChange={handlePriceChange}
								className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg bg-primary focus:outline-none focus:ring focus:border-coral-red "
							/>
						</div>
						<div className="px-5 py-2 pt-0">
							<button
								className="w-full my-4 text-white border rounded-xl bg-coral-red"
								onClick={() => window.location.reload()}
							>
								Reset
							</button>
						</div>
					</div>
					<div className="p-3">
						<h2 className="mb-2 font-bold text-center text-coral-red">{products?.length} Products  <span className="text-slate-gray">Available for shopping</span></h2>
						<div className="flex flex-wrap gap-10">
							{products.length === 0 ? (
								<Loader />
							) : (
								products?.map((p) => (
									<div className="p-3" key={p._id}>
										<ProductCard p={p} />
									</div>
								))
							)}
						</div>
					</div>
				</div>
			</div>

		</>
	)
}

export default Shop