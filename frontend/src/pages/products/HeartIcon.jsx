import { FaHeart, FaRegHeart } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import { addToFavorites, removeFromFavorites, setFavorites } from '../../redux/features/favorites/favoriteSlice'

import { addToFavoritesToLocalStorage, getFavoritesFromLocalSotrage, removeFavoriteFromLocalStorage } from '../../Utils/localStorage'
import { useEffect } from "react"
const HeartIcon = ({ product }) => {
	const dispatch = useDispatch()
	const favorites = useSelector(state => state.favorites)
	const isFavorite = favorites.some((p) => p._id === product._id)
	useEffect(() => {
		const favoritesFromLocalSotrage = getFavoritesFromLocalSotrage()
		dispatch(setFavorites(favoritesFromLocalSotrage))
	}, [])

	const toggleFavorites = () => {
		if (isFavorite) {
			dispatch(removeFromFavorites(product))
			removeFavoriteFromLocalStorage(product._id)
		} else {
			dispatch(addToFavorites(product))
			addToFavoritesToLocalStorage(product)
		}
	}


	return (
		<div onClick={toggleFavorites} className="absolute cursor-pointer top-2 right-2 ">
			{isFavorite ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-slate-gray hover:text-red-500 " />}

		</div>
	)
}

export default HeartIcon