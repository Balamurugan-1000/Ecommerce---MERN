import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { saveShippingAddress, savePaymentMethod } from "../../redux/features/cart/cartSlice"
import ProgressStep from "../../components/ProgressStep"
const Shipping = () => {

	const [paypalMethod, setPaypalMethod] = useState("PayPal")
	const cart = useSelector((state) => state.cart)
	const { shippingAddress } = cart
	const [address, setAddress] = useState(shippingAddress.address || '')
	const [city, setCity] = useState(shippingAddress.city || '')
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
	const [country, setCountry] = useState(shippingAddress.country || '')
	const navigate = useNavigate()
	const user = useSelector((state) => state.user)
	const dispatch = useDispatch()

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(saveShippingAddress({ address, city, postalCode, country }))
		dispatch(savePaymentMethod(paypalMethod))
		navigate('/placeorder')

	}
	useEffect(() => {
		if (!shippingAddress.address) {
			navigate('/shipping')
		}
	}, [shippingAddress, navigate])
	return (
		<div>
			<div className="container mx-auto mt-10 ">
				<ProgressStep step1 step2 />
				<div className="mt-[5rem] flex items-center justify-around flex-wrap 	">
					<form className="w-[40rem]"
						onSubmit={submitHandler}			>
						<h1 className="p-3 mb-4 text-3xl font-semibold">Shipping</h1>
						<div className="mb-4 ">
							<label htmlFor="address" className="block mb-2 ">Address</label>
							<input type="text" id="address" placeholder="Enter Address" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full p-2 border rounded bg-primary" required />
						</div>
						<div className="mb-4 ">
							<label htmlFor="city" className="block mb-2 ">City</label>
							<input type="text" id="city" placeholder="Enter City" value={city} onChange={(e) => setCity(e.target.value)} className="w-full p-2 border rounded bg-primary" required />
						</div>
						<div className="mb-4 ">
							<label htmlFor="postalCode" className="block mb-2 ">Postal Code</label>
							<input type="text" id="postalCode" placeholder="Enter Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="w-full p-2 border rounded bg-primary" required />
						</div>
						<div className="mb-4 ">
							<label htmlFor="country" className="block mb-2 ">Country</label>
							<input type="text" id="country" placeholder="Enter Country" value={country} onChange={(e) => setCountry(e.target.value)} className="w-full p-2 border rounded bg-primary" required />
						</div>
						<div className="mb-4 ">
							<label htmlFor="country" className="block mb-2 ">Payment Method</label>
							<div className="flex items-center">
								<input type="radio" id="paypal" name="paymentMethod" value="PayPal" checked={paypalMethod === "PayPal"} onChange={(e) => setPaypalMethod(e.target.value)} className="mr-2" />
								<label htmlFor="paypal">PayPal</label>
							</div>
						</div>
						<button type="submit" className="w-full p-2 rounded-xl text-primary bg-coral-red ">Continue</button>

					</form>

				</div>
			</div>
		</div>
	)
}

export default Shipping