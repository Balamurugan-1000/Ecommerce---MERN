import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, removeFromCart } from '../redux/features/cart/cartSlice'
const Cart = () => {

	const navigate = useNavigate()
	const dispatch = useDispatch()
	const cart = useSelector((state) => state.cart)




	return (
		<div>Cart</div>
	)
}

export default Cart