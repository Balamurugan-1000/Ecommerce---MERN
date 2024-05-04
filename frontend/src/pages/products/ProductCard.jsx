import { Link } from "react-router-dom"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { addToCart } from "../../redux/features/cart/cartSlice"
import { toast } from "react-toastify"
import HeartIcon from "./HeartIcon"
const ProductCard = ({ p }) => {
	const dispatch = useDispatch()
	const addToCartHandler = (product, qty) => {
		dispatch(addToCart({ ...product, qty }));
		toast.success("Item added successfully", { autoClose: 1200 });
	};

	return (
		<div className="lg:w-[260px] sm:w-[300px] overflow-hidden  relative bg-[#1A1A1A]   rounded-lg shaodw dark:bg-gray-800 dark:border-gray-700">
			<section className="relative">
				<Link to={`/product/${p._id}`}>
					<span className="absolute bottom-3 right-3 bg-emerald-50 text-greenishBlueDark text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-greewhring-greenishBlueWhite">
						{p?.brand}
					</span>
					<img
						className="w-full cursor-pointer"
						src={p.image}
						alt={p.name}
						style={{ height: "170px", objectFit: "cover" }}
					/>
				</Link>
				<HeartIcon product={p} />
			</section>

			<div className="p-5">
				<div className="flex justify-between">
					<h5 className="mb-2 text-xl text-whiet dark:text-white">{p?.name}</h5>

					<p className="font-semibold text-greenishBlueDark text-">
						{p?.price?.toLocaleString("en-US", {
							style: "currency",
							currency: "INR",
						})}
					</p>
				</div>

				<p className="mb-3 font-normal text-[#CFCFCF]">
					{p?.description?.substring(0, 60)} ...
				</p>

				<section className="flex items-center justify-between">
					<Link
						to={`/product/${p._id}`}
						className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-greenishBlueDark hover:bg-greenishBlueDark focus:ring-4 focus:outline-none focus:ring-greenishBlueWhite dark:bg-greenishBlueLight dark:hover:bg-greenishBlueDark dark:focus:ring-greenishBlueDark"
					>
						Read More
						<svg
							className="w-3.5 h-3.5 ml-2"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 14 10"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M1 5h12m0 0L9 1m4 4L9 9"
							/>
						</svg>
					</Link>

					<button
						className="p-2 rounded-full"
						onClick={() => addToCartHandler(p, 1)}
					>
						<AiOutlineShoppingCart size={25} />
					</button>
				</section>
			</div>
		</div>
	);
};

export default ProductCard;
