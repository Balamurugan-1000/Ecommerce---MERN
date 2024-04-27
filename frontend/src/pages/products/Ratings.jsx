import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa"
const Rating = ({ value, text, color }) => {
	const fullStars = Math.floor(value)
	const halfStars = value - fullStars >= 0.5 ? 1 : 0
	const emptyStar = 5 - fullStars - halfStars
	return (
		<div className="flex items-center p-4 text-xl">
			{[...Array(fullStars)].map((_, index) => (
				<FaStar key={index} className="text-yellow-300" />
			))}
			{halfStars === 1 && <FaStarHalfAlt className={`text-yellow-300 ml-1`} />}
			{[...Array(emptyStar)].map((_, index) => (
				<FaRegStar key={index} />
			))}


			<span className={` ml-[2rem]`}>{text && text}</span>
		</div>
	)
}


Rating.defaultProps = {
	color: 'yellow-500'
}

export default Rating