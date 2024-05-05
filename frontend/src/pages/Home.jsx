import { Link, useParams } from "react-router-dom"
import { useGetProductsQuery } from "../redux/api/productApiSlice"
import Loader from "../components/Loader"
import Header from "../components/Header"
import Message from "../components/Message"
import Product from "./products/Product"

const Home = () => {
	const { keyword } = useParams()
	const { data, isError, isLoading } = useGetProductsQuery({ keyword })
	return (
		<>
			{!keyword ? <Header /> : null}
			{isLoading ? <Loader /> : isError ? <Message varient={danger} >
				{isError?.data.message || isError.message}
			</Message> : (
				<>
					<div className="flex items-center mt-[5rem] justify-between">
						<h1 className="ml-[20rem] font-bold text-[2rem]  ">
							Special Products
						</h1>
						<Link to='/shop' className="bg-coral-red text-white font-bold rounded-full py-2 px-10 mr-[18rem] " >Shop</Link>
					</div>

					<div className="flex justify-center flex-wrap mt-[2rem]">
						{data.products?.map((product) => (
							<div key={product._id} className="">
								<Product product={product} />
							</div>
						))}
					</div>

				</>
			)}
		</>
	)
}

export default Home