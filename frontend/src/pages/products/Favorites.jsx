import { useSelector } from "react-redux"
import Product from "./Product"
const Favorites = () => {
	const favorites = useSelector(state => state.favorites)
	return (
		<div className="ml-[10rem] bg-primary">
			<h1 className="text-xl p-5 font-bold ml-[3rem] mt-[3rem]">
				FAVORITE PRODUCT
			</h1>
			<div className='flex flex-wrap'>
				{favorites.map((p) => (
					<Product product={p} />
				))}
			</div>
		</div>
	)
}

export default Favorites