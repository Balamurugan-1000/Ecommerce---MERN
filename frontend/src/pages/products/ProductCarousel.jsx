import { useGetTopProductsQuery } from "../../redux/api/productApiSlice"
import Message from "../../components/Message"
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import moment from "moment"
import {
	FaBox,
	FaClock,
	FaShoppingCart,
	FaStar,
	FaStore
} from 'react-icons/fa'

const ProductCarousel = () => {

	const { data: products, isLoading, error } = useGetTopProductsQuery()
	console.log(products)
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		sildesToScroll: 1,
		arrows: true,
		autoplay: true,
		autoplaySpeed: 3000
	}
	return (
		<div className="mb:4 md:block ">
			{isLoading ? null : error ? (
				<Message varient={'danger'}>
					{error?.data?.message || error.message}
				</Message>
			) : <Slider {...settings} className="md:w-[48rem] xl:w-[45rem]  sm:w-[40rem] overflow-x-hidden  sm:block">
				{products?.map(({ image, _id, name, description, price, brand, createdAt, numReviews, rating, quantity, countInStock }) => (
					<div className="flex flex-col items-center justify-center max-w-full mx-auto text-center " key={_id}>
						<img src={image} alt={name} className="max-w-full rounded-lg object-cover h-[25rem] overflow-x-hidden" />
						<div className="flex flex-row justify-between mt-[2rem]">
							<div className="flex justify-center w-[20rem]">
								<div className="one">
									<h2 className="p-2 text-2xl font-bold">{name}</h2>
									<p>Rs{price}</p><br /><br />
									<p className="w-[15rem] text-justify">{description.substring(0, 110)}....</p>
								</div>


							</div>
							<div className="flex justify-evenly mr-12 w-[20rem]">
								<div className="one ">
									<h1 className="flex items-center mb-6 w-[13rem]">
										<FaStore className="mr-2" /> Brand : {brand}
									</h1>
									<h1 className="flex items-center mb-6 w-[13rem]">
										<FaClock className="mr-2" /> Added : {moment(createdAt).fromNow()}
									</h1>
									<h1 className="flex items-center mb-6 w-[13rem]">
										<FaStar className="mr-2" /> Reviews : {numReviews}
									</h1>
								</div>
								<div className="two">
									<h1 className="flex items-center mb-6 w-[13rem]">
										<FaStar className="mr-2" /> Ratings : {Math.round(rating)}
									</h1>
									<h1 className="flex items-center mb-6 w-[13rem]">
										<FaShoppingCart className="mr-2" /> Quantity : {quantity}
									</h1>
									<h1 className="flex items-center mb-6 w-[13rem] overflow-auto">
										<FaBox className="mr-2" /> CountInStock : {countInStock}
									</h1>
								</div>
							</div>
						</div>
					</div>
				))}


			</Slider>}

		</div>
	)
}

export default ProductCarousel