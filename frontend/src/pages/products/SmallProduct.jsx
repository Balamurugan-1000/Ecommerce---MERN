import { Link } from "react-router-dom"
import HeartIcon from "./HeartIcon"
const SmallProduct = ({ product }) => {
	return (

		<div className="relative flex flex-col items-center ">
			<img src={product.image} alt={product.name} className="h-[10rem] w-full rounded " />
			{<HeartIcon product={product} />}
			<div className="">
				<Link to={`/product/${product._id}`}>
					<h2 className="flex items-center justify-between min-w-full gap-2 p-1 ">
						<div className="text-clip">{product.name}</div>
						<span className="bg-[#bafaf568] text-center  text-[#6dd6f0] text-sm font-medium  px-2.5 py-1 rounded-full dark:bg-[#33606b] dark:text-[#62bbd1]">{product.price}</span>
					</h2>
				</Link>
			</div>
		</div>

	)
}

export default SmallProduct