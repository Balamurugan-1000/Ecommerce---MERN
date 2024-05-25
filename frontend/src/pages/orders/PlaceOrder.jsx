import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Message from '../../components/Message'
import ProgressStep from '../../components/ProgressStep'
import Loader from '../../components/Loader'
import { clearCartItems } from '../../redux/features/cart/cartSlice'
import { useNavigate } from 'react-router-dom'
import { useCreateOrderMutation } from '../../redux/api/orderApiSlice'
const PlaceOrder = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const cart = useSelector(state => state.cart)
	const [createOrder, { isLoading, error }] = useCreateOrderMutation();

	useEffect(() => {
		if (!cart.shippingAddress.address) {
			navigate('/shipping')
		}
	}, [cart.shippingAddress, navigate, cart.paymentMethod])

	const placeOrderHandler = async (e) => {
		e.preventDefault();
		try {
			const res = await createOrder({
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod,
				itemsPrice: cart.itemsPrice,
				shippingPrice: cart.shippingPrice,
				taxPrice: cart.taxPrice,
				totalPrice: cart.totalPrice,
			}).unwrap();
			dispatch(clearCartItems());
			toast.success('Order placed successfully');
			navigate(`/order/${res._id}`);
		} catch (error) {
			toast.error(error);
		}
	};



	return (
		<>
			<ProgressStep step1 step2 step3 />
			<div className="container mx-auto mt-8">
				{cart.clearCartItems?.length === 0 ? (
					// <h1>Your cart is empty</h1>
					<Message>Your cart is empty</Message>
				) : (
					<div className="overflow-x-auto">
						<table className="min-w-[800px] mx-auto">
							<thead>
								<tr>
									<th className="px-4 py-2">Image</th>
									<th className="px-4 py-2">Product</th>
									<th className="px-4 py-2">Quantity</th>
									<th className="px-4 py-2">Price</th>
									<th className="px-4 py-2">Total</th>
									<th className="px-4 py-2">Link</th>


								</tr >
							</thead >
							<tbody>
								{cart.cartItems.map((item) =>
								(

									<tr key={item._id}>
										<td className="px-4 py-2 border border-gray-700">
											<img src={`http://localhost:5000${item.image}`} alt={item.name} className="object-cover w-20 h-20" />
										</td>
										<td className="px-4 py-2 border border-gray-700">{item.name}</td>
										<td className="px-4 py-2 border border-gray-700">{item.qty}</td>
										<td className="px-4 py-2 border border-gray-700">Rs.{item.price}</td>
										<td className="px-4 py-2 border border-gray-700">Rs.{item.qty * item.price}</td>
										<td className="px-4 py-2 border border-gray-700">
											<Link to={`/product/Rs.{item._id}`} className="text-blue-500">View</Link>
										</td>
									</tr>
								))}


								{/* {error && <Message varient={`danger`}>{error}</Message>} */}
								{/* console.log(error) */}
							</tbody>
						</table >
						{isLoading && <Loader />}
						<div className="flex flex-col items-center justify-center">
							<h2 className=' mt-[2rem] text-coral-red text-2xl font-semibold '>Order summary</h2><hr />
							<div className="flex mx-auto gap-[4rem] bg-primary justify-between   max-w-[100rem] ">
								<div className="m-8">

									<h2 className='p-2 mb-4 text-2xl font-semibold '>Price Details</h2>
									<hr className='mb-3' />
									<div className="flex justify-between p-2 mt-4">
										<p>Items</p>
										<p>Rs.{cart.itemsPrice}</p>
									</div>
									<div className="flex justify-between p-2 mt-4">
										<p>Shipping</p>
										<p>Rs.{cart.shippingPrice}</p>
									</div>
									<div className="flex justify-between p-2 mt-4">
										<p>Tax</p>
										<p>Rs.{cart.taxPrice}</p>
									</div>
									<hr />
									<div className="flex justify-between p-2 mt-4">
										<p>Total</p>
										<p>Rs.{cart.totalPrice}</p>
									</div>

								</div>
								<div className="m-8">
									<h2 className='p-2 mb-4 text-2xl font-semibold text-coral-red '>Shipping</h2>
									<hr className='mb-3' />
									<p className='p-1'>{cart.shippingAddress.address}</p>
									<p className='p-1'>{cart.shippingAddress.city}</p>
									<p className='p-1'>{cart.shippingAddress.postalCode}</p>
									<p className='p-1'> {cart.shippingAddress.country}</p>
								</div>
								<div className="m-8">
									<h2 className='p-2 mb-4 text-2xl font-semibold '>Payment Method</h2>
									<hr className='mb-3' />
									<p className='p-1'>Method: {cart.paymentMethod}</p>
								</div>
							</div>
							<div className="m-8 ">
								<button
									type='submit'
									className="w-[10rem] p-2 text-white bg-coral-red rounded-md"
									onClick={placeOrderHandler}
								>
									Place Order
								</button>
							</div>
						</div>
					</div >
				)
				}

			</div >
		</>
	)
}

export default PlaceOrder