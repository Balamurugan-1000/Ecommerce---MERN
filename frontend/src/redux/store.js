import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./api/apiSlice";
import favoritesReducer from "./features/favorites/favoriteSlice";
import authReducer from './features/auth/authSlice'
import { getFavoritesFromLocalSotrage } from "../Utils/localStorage";
import cartSliceReducer from "./features/cart/cartSlice";


const initialFavorites = getFavoritesFromLocalSotrage() || []
const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        favorites: favoritesReducer,
        cart: cartSliceReducer,
    },
    preloadedState: {
        favorites: initialFavorites,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,

})


setupListeners(store.dispatch)
export default store