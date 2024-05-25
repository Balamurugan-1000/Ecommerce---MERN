import { useParams, useNavigate } from "react-router"
import { Link } from "react-router-dom"
import {
	useGetProductDetailsQuery, useCreateReviewMutation,
} from "../../redux/api/productApiSlice"
import { toast } from 'react-toastify'
import Loader from "../../components/Loader"
import Message from "../../components/Message"
import { FaBox, FaClock, FaShoppingCart, FaStar, FaStore } from 'react-icons/fa'
import moment from "moment"
import HeartIcon from "./HeartIcon"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import Ratings from "./Ratings"
import ProductTabs from "./ProductTabs"
import { addToCart } from "../../redux/features/cart/cartSlice"

const ProductDetails = () => {
	const params = useParams()
	const navigate = useNavigate()

	const [qty, setQty] = useState(1);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");

	const { id: productId } = params


	const { data: product, error, isLoading, refetch } = useGetProductDetailsQuery(productId)
	console.log(product)

	const { userInfo } = useSelector(state => state.auth)
	const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation()
	const dispatch = useDispatch()
	const submitHandler = async (e) => {

		try {
			const data = { productId, rating, comment }
			await createReview(data).unwrap()
			toast.success('Review Added successfully')

		} catch (error) {
			toast.error(error?.data?.message || error.message)
		}
	}

	const addToCartHandler = () => {
		dispatch(addToCart({ ...product, qty }))
		navigate('/cart')
	}


	return (
		<>
			<div className="">
				<Link to={'/'} className="font-semibold text-slate-gray hover:underline ml-[10rem]">Go Back</Link>
			</div>
			{isLoading ? <Loader /> : error ? (<Message varient={'danger'}>
				{error?.data.message || error.message}</Message>) : (
				<>
					<div className="relative flex flex-wrap   mr-[2rem] gap-[1rem] items-between ml-[10rem] mt-[2rem]">
						<div className="">

							<img src={`http://localhost:5000${product.image}`} alt={product.name} className="w-full xl:w-[35rem] lg:w-[30rem] md:w-[25rem]  sm:w-[20rem] rounded-lg" />
							<HeartIcon product={product} />
						</div>
						<div className="flex flex-col justify-between ">
							<h2 className="text-2xl font-semibold">{product.name}</h2>
							<p className="my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-sm text-[#b0b0b0]">{product.description}</p>
							<p className="my-4 text-3xl font-extrabold text-coral-red "><span className="text-slate-gray">Rs{"  "}</span>{product.price}/-</p>
							<div className="flex justify-evenly mr-12 w-[20rem]">
								<div className="one ">
									<h1 className="text-slate-gray flex items-center mb-3 w-[20rem]">
										<FaStore className="mr-2 mt-[-8px]" /> Brand : {product.brand}
									</h1>
									<h1 className="text-slate-gray flex items-center mb-3 w-[13rem]">
										<FaClock className="mr-2 mt-[-8px]" /> Added : {moment(product.createdAt).fromNow()}
									</h1>
									<h1 className="text-slate-gray flex items-center mb-3 w-[13rem]">
										<FaStar className="mr-2 mt-[-8px]" /> Reviews : {product.numReviews}
									</h1>
								</div>
								<div className="two">
									<h1 className="text-slate-gray flex items-center mb-3 w-[13rem]">
										<FaStar className="mr-2 mt-[-8px]" /> Ratings : {(product.rating)}
									</h1>
									<h1 className="text-slate-gray flex items-center mb-3 w-[13rem]">
										<FaShoppingCart className="mr-2 mt-[-8px]" /> Quantity : {product.quantity}
									</h1>
									<h1 className="text-slate-gray flex items-center mb-3 w-[13rem] overflow-auto">
										<FaBox className="mr-2 mt-[-8px]" /> CountInStock : {product.countInStock}
									</h1>
								</div>
							</div>



							<div className="flex flex-wrap justify-between">
								<Ratings value={product.rating} text={`${product.numReviews} reviews`} />
								{product.countInStock > 0 && (
									<div className="">
										<select value={qty} onChange={(e) => setQty(e.target.value)} className="p-2 w-[6rem] text-slate-gray rounded-lg">{[...Array(product.countInStock).keys()].map(x => (
											<option key={x + 1} value={x + 1}>{x + 1}</option>
										))}</select>
									</div>
								)}
							</div>

							<div className="btn-container">
								<button
									disabled={product.countInStock === 0}
									className="px-2 py-2 mt-4 ml-4 text-white rounded bg-coral-red md:mt-0"
									onClick={addToCartHandler}
								>Add to cart</button>
							</div>

						</div>

						<div className="mt-[2rem] container flex flex-wrap items-start justify-between xl:ml-[10rem]">
							<ProductTabs
								loadingProductReview={loadingProductReview}
								userInfo={userInfo}
								submitHandler={submitHandler}
								rating={rating}
								setRating={setRating}
								comment={comment}
								setComment={setComment}
								product={product}

							/>
						</div>
					</div>
				</>
			)
			}
		</>
	)
}

export default ProductDetails