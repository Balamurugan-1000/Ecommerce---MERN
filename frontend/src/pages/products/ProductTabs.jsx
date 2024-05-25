import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Ratings from './Ratings'
import { useGetTopProductsQuery } from '../../redux/api/productApiSlice'
import SmallProduct from './SmallProduct'
import Loader from '../../components/Loader'
const ProductTabs = ({
	loadingProductReview,
	userInfo,
	submitHandler,
	rating,
	setRating,
	comment,
	setComment,
	product
}) => {
	const { data, isLoading, refetch } = useGetTopProductsQuery()
	const [activeTab, setActiveTab] = useState(1)
	useEffect(() => {
		refetch()
	}, [activeTab, data])
	const HandleTabClick = (tabNumber) => {
		setActiveTab(tabNumber)
	}
	if (isLoading) return <Loader />
	return (
		<div className='flex flex-col ml-0 border md:flex-row '>
			<section className='mr-[5rem]'>
				<div className={`flex-1 p-4 cursor-pointer text-lg ${activeTab == 1 ? 'font-bold' : 'text-gray-400'}`} onClick={() => HandleTabClick(1)}>
					Write Your Review
				</div>
				<div className={`flex-1 p-4 cursor-pointer text-lg ${activeTab == 2 ? 'font-bold' : 'text-gray-400'}`} onClick={() => HandleTabClick(2)}>
					All reviews
				</div>
				<div className={`flex-1 p-4 cursor-pointer text-lg ${activeTab == 3 ? 'font-bold' : 'text-gray-400'}`} onClick={() => HandleTabClick(3)}>
					Related Reviews
				</div>

			</section>
			<section>
				{activeTab === 1 && (
					<div className="mt-4">
						{userInfo ? (
							<form onSubmit={(e) => {
								e.preventDefault()
								submitHandler(e)


							}}>
								<div className="my-2">
									<label htmlFor="rating" className="block mb-2 text-xl">
										Rating
									</label>

									<select
										id="rating"
										required
										value={rating}
										onChange={(e) => setRating(e.target.value)}
										className="p-2 border rounded-lg xl:w-[40rem] text-slate-gray"
									>
										<option value="">Select</option>
										<option value="1">Inferior</option>
										<option value="2">Decent</option>
										<option value="3">Great</option>
										<option value="4">Excellent</option>
										<option value="5">Exceptional</option>
									</select>
								</div>

								<div className="my-2">
									<label htmlFor="comment" className="block mb-2 text-xl">
										Comment
									</label>

									<textarea
										id="comment"
										rows="3"
										required
										value={comment}
										onChange={(e) => setComment(e.target.value)}
										className="p-2 border rounded-lg xl:w-[40rem] text-slate-gray"
									></textarea>
								</div>
								<button
									type="submit"
									disabled={loadingProductReview}

									onClick={(e) => {
										e.preventDefault()
										submitHandler(e)
									}}
									className="px-4 py-2 text-white rounded-lg bg-coral-red"
								>
									Submit
								</button>
							</form>
						) : (
							<p>
								Please <Link to="/login">sign in</Link> to write a review
							</p>
						)}
					</div>
				)}
			</section>

			<section>
				{activeTab === 2 && (
					<>
						<div>{product.reviews.length === 0 && <p>No Reviews</p>}</div>

						<div>
							{product.reviews.map((review) => (
								<div
									key={review._id}
									className="bg-white p-4 rounded-lg xl:ml-[2rem] sm:ml-[0rem] xl:w-[50rem] sm:w-[24rem] mb-5"
								>
									<div className="flex justify-between">
										<strong className="text-coral-red font-xl">{review.name}</strong>
										<p className="text-[#B0B0B0]">
											{review.createdAt.substring(0, 10)}
										</p>
									</div>

									<p className="my-4">{review.comment}</p>
									<Ratings value={review.rating} />
								</div>
							))}
						</div>
					</>
				)}
			</section>

			<section>
				{activeTab === 3 && (
					<section className="ml-[4rem] flex flex-wrap">
						{!data ? (
							<Loader />
						) : (
							data.map((product) => (
								<div key={product._id}>
									<SmallProduct product={product} />
								</div>
							))
						)}
					</section>
				)}
			</section>

		</div>
	)
}

export default ProductTabs