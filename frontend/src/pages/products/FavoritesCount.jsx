import { useSelector } from "react-redux"
const FavoritesCount = () => {
	const favorites = useSelector(state => state.favorites)
	const favoriteCount = favorites.length
	return (
		<div className='absolute px-1.5 py-0 text-sm rounded-full left-4 bg-coral-red text-primary  top-8'>
			{favoriteCount > 0 && <span>{favoriteCount}</span>}
		</div>
	)
}

export default FavoritesCount