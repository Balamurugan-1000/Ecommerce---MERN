import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useGetOrdersQuery } from '../../redux/api/orderApiSlice'
import AdminMenu from './AdminMenu'
const OrderList = () => {
	const { data: orders, isLoading, error, refetch } = useGetOrdersQuery()
	useEffect(() => {
		refetch()
	}, [orders])
	return (
		<div>
			<AdminMenu />
			<div className="container w-full mx-auto ml-[7rem] ">
				<h2 className='mb-4 ml-10 text-2xl font-semibold text-coral-red '>Users Orders List</h2>
				{isLoading && <Loader />}
				{error && <Message varient='danger'>{error?.data?.error || error.error}</Message>}
				{orders && orders.length === 0 && <Message varient='info'>No Orders</Message>}
				<table className='w-full border'>
					<thead>
						<tr className='border-2'>

							<th className='py-2 text-center  text-ellipsis border-r-[1px] px-7 '>Image</th>
							<th className='py-2 text-center border-r-[1px] px-7 '>User</th>
							<th className='py-2 text-center border-r-[1px] px-7 '>ID</th>
							<th className='py-2 text-center border-r-[1px] px-7 '>DATE</th>
							<th className='py-2 text-center border-r-[1px] px-7 '>TOTAL</th>
							<th className='py-2 text-center border-r-[1px] px-7 '>PAID</th>
							<th className='py-2 text-center border-r-[1px] px-7 '>DELIVERED</th>
							<th className='py-2 text-center border-r-[1px] px-7 '>DETAILS</th>


						</tr>
					</thead>
					<tbody>
						{orders && orders.map(order => (
							<tr className='mb-[2rem]' key={order._id}>
								<td className='py-2 text-center border-r-[1px] px-7 '>
									{order.orderItems[0].image ? <img src={order.orderItems[0].image} alt={order.orderItems[0].name} className='w-20 h-14' /> : 'No Image'}
								</td>								<td className='py-2 text-center border-r-[1px] px-7 '>
									{order.user ? order.user.username : 'No User'}
								</td>
								<td className='py-2 text-center border-r-[1px] px-7 '>{order._id}</td>
								<td className='py-2 text-center border-r-[1px] px-7 '>{order.createdAt?.substring(0, 10)}</td>
								<td className='py-2 text-center border-r-[1px] px-7 '>{order.totalPrice}</td>
								<td className='py-2 text-center border-r-[1px] px-7 '>{order.isPaid ? (<p className='p-1 text-white bg-green-500 rounded-full'>Completed</p>) : (<p className='p-1 text-white bg-yellow-400 rounded-full'>Pending</p>)}</td>
								<td className='py-2 text-center border-r-[1px] px-7 '>
									{order.isPaid ? (<p className='p-1 text-white bg-green-500 rounded-full'>Completed</p>) : (<p className='p-1 text-white bg-yellow-400 rounded-full'>Pending</p>)}</td>
								<td className='py-2 text-center border-r-[1px] text-white px-7 '>
									<Link to={`/order/${order._id}`} className='p-1 px-3 text-white bg-blue-500 rounded-full'>Details</Link>
								</td>
							</tr>

						)
						)}
					</tbody>
				</table>
				<hr />
			</div>

		</div>
	)
}

export default OrderList
