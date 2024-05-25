import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useGetMyOrdersQuery } from '../../redux/api/orderApiSlice'
const UserOrder = () => {
	const { data: orders, isLoading, error, refetch } = useGetMyOrdersQuery()
	useEffect(() => {
		refetch()
	}, [orders])
	return (
		<div>
			<div className="container w-full mx-auto ml-[7rem] ">
				<h2 className='mb-4 text-2xl font-semibold text-coral-red ml-9 '>My Orders </h2>
				{isLoading && <Loader />}
				{error && <Message varient='danger'>{error?.data?.error || error.error}</Message>}
				{orders && orders.length === 0 && <Message varient='info'>No Orders</Message>}
				<table className='w-full border'>
					<thead>
						<tr className='border-2'>

							<td className='py-2 text-center  text-ellipsis border-r-[1px] '>No. of P</td>
							<td className='py-2 text-center border-r-[1px]  '>IMAGE</td>
							<td className='py-2 text-center border-r-[1px]  '>TOTAL</td>
							<td className='py-2 text-center border-r-[1px]  '>DATE</td>
							<td className='py-2 text-center border-r-[1px]  '>PAID</td>
							<td className='py-2 text-center border-r-[1px]  '>DELIVERED</td>
							<td className='py-2 text-center border-r-[1px]  '>Details</td>

						</tr>
					</thead>
					<tbody>
						{orders && orders.map(order => (
							<tr key={order._id}>
								<td className='py-2 text-center border-x-2 '>{order.orderItems.length}</td>
								<td className='py-2 text-center border-r-[1px] '>
									{order.orderItems[0].image ? <img src={order.orderItems[0].image} alt={order.orderItems[0].name} className='w-20 h-14' /> : 'No Image'}
								</td>
								<td className='py-2 text-center border-r-[1px] '>Rs.{order.totalPrice}</td>
								<td className='py-2 text-center border-r-[1px] '>{order.createdAt?.substring(0, 10)}</td>
								<td className='py-2 text-center border-r-[1px] '>{order.isPaid ? (<p className='w-1/2 p-1 mx-auto text-white bg-green-500 rounded-full'>Completed</p>) : (<p className='w-1/2 p-1 mx-auto text-white bg-yellow-400 rounded-full'>Pending</p>)}</td>
								<td className='py-2 text-center border-r-[1px] '>
									{order.isPaid ? (<p className='w-1/2 p-1 mx-auto text-white bg-green-500 rounded-full'>Completed</p>) : (<p className='w-1/2 p-1 mx-auto text-white bg-yellow-400 rounded-full'>Pending</p>)}</td>
								<td className='py-2 text-center border-r-[1px] '>
									<Link to={`/order/${order._id}`} className='w-1/2 px-3 py-2 text-white bg-blue-500 rounded-md'>{" "}More</Link>
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

export default UserOrder
