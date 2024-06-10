import { Link } from "react-router-dom"
import HeartIcon from "./HeartIcon"
import { imageURL } from "../../redux/constants"
const SmallProduct = ({ product }) => {
	return (

		<div className="relative flex flex-col items-center m-5 w-[15rem] h-[15rem] shadow-[0_3px_10px_rgb(0,0,0,0.2)] border">
			<img src={`${imageURL}${product.image}`} alt={product.name} className="h-[10rem] w-full rounded " />
			{<HeartIcon product={product} />}
			<div className="">
				<Link to={`/product/${product._id}`}>
					<h2 className="flex items-center justify-between min-w-full gap-2 p-1 text-coral-red ">
						<div className="text-clip">{product.name}</div>
						<span className="bg-coral-red text-center  text-primary text-sm font-medium  px-2.5 py-1 rounded-full dark:bg-[#33606b] dark:text-[#62bbd1]">{product.price}</span>
					</h2>
				</Link>
			</div>
		</div>

	)
}

export default SmallProduct