export const getFavoritesFromLocalSotrage = () => {
	const favoriteJSON = localStorage.getItem('favorites')
	return favoriteJSON ? JSON.parse(favoriteJSON) : []
}

export const addToFavoritesToLocalStorage = (product) => {
	const favorites = getFavoritesFromLocalSotrage()
	if (!favorites.some((p) => p._id === product._id)) {
		favorites.push(product)
		localStorage.setItem('favorites', JSON.stringify(favorites))
	}
}


export const removeFavoriteFromLocalStorage = (productId) => {
	const favorites = getFavoritesFromLocalSotrage()
	const updatedFavortes = favorites.filter((product) => product._id !== productId)
	localStorage.setItem('favorites', JSON.stringify(updatedFavortes))
}