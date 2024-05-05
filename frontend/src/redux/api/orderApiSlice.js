import { apiSlice } from './apiSlice'
import { ORDER_URL, PAYPAL_URL } from '../constants'
import { get } from 'mongoose'


export const orderApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createOrder: builder.mutation({
			query: (order) => ({
				url: ORDER_URL,
				method: "POST",
				body: order
			})
		}),
		getOrderDetails: builder.query({
			query: (orderId) => ({
				url: `${ORDER_URL}/${orderId}`,
				method: "GET"
			})
		}),
		payOrder: builder.mutation({
			query: ({ orderId, details }) => ({
				url: `${ORDER_URL}/${orderId}/pay`,
				method: "PUT",
				body: details,
			})
		}),
		getPaypalClientId: builder.query({
			query: () => ({
				url: PAYPAL_URL,
				method: "GET"
			})
		}),
		getMyOrders: builder.query({
			query: () => ({
				url: `${ORDER_URL}/myorders`,
				method: "GET",
				keepUnusedDataFor: 5
			})
		}),
		deliverOrder: builder.mutation({
			query: (orderId) => ({
				url: `${ORDER_URL}/${orderId}/deliver`,
				method: "PUT"
			})
		}),
		getTotalOrders: builder.query({
			query: () => ({
				url: `${ORDER_URL}/total-orders`,
				method: "GET"
			})
		}),
		getTotalSales: builder.query({
			query: () => ({
				url: `${ORDER_URL}/total-sales`,
				method: "GET"
			})
		}),
		getTotalSalesByDate: builder.query({
			query: (date) => ({
				url: `${ORDER_URL}/total-sales-by-date`,

			})
		}),
		getOrders: builder.query({
			query: () => ({
				url: `${ORDER_URL}/`,
				method: "GET"
			})
		}),

	})
})



export const {
	useCreateOrderMutation,
	useGetOrderDetailsQuery,
	usePayOrderMutation,
	useGetPaypalClientIdQuery,
	useGetMyOrdersQuery,
	useDeliverOrderMutation,
	useGetTotalOrdersQuery,
	useGetTotalSalesQuery,
	useGetTotalSalesByDateQuery,
	useGetOrdersQuery
} = orderApiSlice