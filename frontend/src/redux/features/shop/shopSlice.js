import { createSlice } from '@reduxjs/toolkit'


const initialState = {
	categories: [],
	products: [],
	checked: [],
	radio: [],
	selctedrand: [],
	brandCheckboxes: {},
	checkedBrands: [],
}
const shopSlice = createSlice({
	name: 'shop',
	initialState,
	reducers: {
		setCategories: (state, action) => {
			state.categories = action.payload
		},
		setProducts: (state, action) => {
			state.products = action.payload
		},
		setChecked: (state, action) => {
			state.checked = action.payload
		},
		setRadio: (state, action) => {
			state.radio = action.payload
		},
		setSelctedrands: (state, action) => {
			state.selctedrand = action.payload
		},

	}

})


export const { setCategories, setProducts, setChecked, setRadio, setSelctedrands } = shopSlice.actions

export default shopSlice.reducer