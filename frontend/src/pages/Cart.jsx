import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, removeFromCart } from '../redux/features/cart/cartSlice'
import { FaTrash } from 'react-icons/fa'
import { imageURL } from "../redux/constants"
const Cart = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const cart = useSelector((state) => state.cart)
	const { cartItems } = cart

	const addToCartHandler = (product, qty) => {
		dispatch(addToCart({ ...product, qty }))
	}
	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id))
	}
	const checkoutHandler = () => {
		navigate("/login?redirect=/shipping");
	};

	return (
		<>
			<div className="container flex flex-wrap items-center justify-around mx-auto mt-8">
				{cartItems.length === 0 ? (<div className="text-slate-gray"> Your Cart is empty  <Link to={'/shop'}>Go back to the Shop</Link></div>) : (<>
					<div className="flex flex-col w-[80%]">
						<h1 className="mb-4 text-2xl font-semibold ">Shopping Cart</h1>
						{cartItems?.map((item) => (
							<div key={item._id} className="flex items-center mb-[1rem] pb-2">
								<div className="w-[5rem] h-[5rem] ">
									<img src={`${imageURL}${item.image}`} alt={item.name} className="object-cover w-full h-full rounded" />
								</div>
								<div className="flex-1 ml-4">
									<Link to={`/product/${item._id}`} className="text-coral-red">{item.name}</Link>
									<div className="mt-2 text-slate-gray"> {item.brand}</div>
									<div className="mt-2 font-bold text-slate-gray"> Rs.{item.price}</div>
								</div>
								<div className="w-24">
									<select className="w-full p-1 border rounded bg-primary" value={item.qty} onChange={(e) => addToCartHandler(item, Number(e.target.value))}>{[...Array(item.countInStock).keys()].map((x) => (
										<option className="text-slate-gray" value={x + 1} key={x + 1}>{x + 1}</option>
									))}</select>
								</div>
								<div className="">
									<button className="text-red-500 MR-[5rem] " onClick={() => removeFromCartHandler(item._id)}>
										<FaTrash className="ml-[1rem] mt-[4px]" />
									</button>
								</div>
							</div>
						))}

						<div className="mt-8 w-[40rem] ">
							<div className="p-4 rounded-lg">
								<h2 className="mb-2 text-xl font-semibold text-coral-red">
									Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)}){" "}
								</h2>
								<div className="text-2xl font-bold">
									Rs.{" "}
									{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
										.toFixed(2)
									}
								</div>
								<button
									className="w-1/2 px-4 py-2 mt-4 text-lg text-white rounded-full bg-coral-red"
									disabled={cartItems.length === 0}
									onClick={checkoutHandler}
								>
									Proceed To Checkout
								</button>
							</div>
						</div>
					</div>
				</>)}
			</div>
		</>
	)
}

export default Cart