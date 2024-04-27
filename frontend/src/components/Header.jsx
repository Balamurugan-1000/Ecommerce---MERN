import ProductCarousel from "../pages/products/ProductCarousel"
import SmallProduct from "../pages/products/SmallProduct"
import { useGetTopProductsQuery } from "../redux/api/productApiSlice"
import Loader from "./Loader"

const Header = () => {
	const { data, isError, isLoading } = useGetTopProductsQuery()
	if (isLoading) {
		return <Loader />
	}
	if (isError) {
		return <h1>----------ERROR ---------</h1>
	}
	return (
		<>
			<div className="flex justify-around">
				<div className="hidden xl:block">
					<div className="grid grid-cols-2 gap-2  ml-[4rem] ">
						{data.map((product) => (
							<div className="" key={product._id}>
								<SmallProduct product={product} />
							</div>
						))}
					</div>
				</div>
				<ProductCarousel />
			</div>
		</>
	)
}

export default Header