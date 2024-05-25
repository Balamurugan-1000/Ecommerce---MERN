import { Link } from "react-router-dom"
import HeartIcon from "./HeartIcon"
const Product = ({ product }) => {
	return (
		<div className="w-[20rem] ml-[2rem] p-3 relative shadow-3xl bg-primary mt-[2rem] ">
			<div className="relative">
				<img src={product.image} alt={product.name} className='w-[20rem] h-[15rem] rounded' />
				<HeartIcon product={product} />
			</div>
			<div className="p-4">
				<Link to={`/product/${product._id}`}>
					<h2 className="flex items-center justify-center gap-6 text-coral-red">
						<div className="text-lg">
							{product.name}
						</div>
						<span className="bg-primary text-slate-gray text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-coral-red dark:text-slate-gray">
							Rs.{product.price}
						</span>
					</h2>
				</Link>
			</div>
		</div>
	)
}

export default Product