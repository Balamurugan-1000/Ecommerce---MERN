const CategoryForm = ({ value, setValue, handleSubmit, buttonText = 'submit', handleDelete }) => {
	return (
		<div className="p-3">
			<form onSubmit={handleSubmit}>
				<input type="text" className="px-4 py-3 bg-white border rounded-lg " placeholder="Enter Category name" value={value} onChange={(e) => setValue(e.target.value)} />
				<div className="flex justify-between">
					<button className="px-4 py-2 mt-5 text-white rounded-lg bg-coral-red hover:bg-coral-red focus:outline-none focus:ring-2 focus:ring-corabg-coral-red focus:ring-opacity-50">{buttonText}</button>
					{handleDelete && (
						<button className="px-4 py-2 mt-5 bg-red-500 rounded-lg text-slate-gray hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 "
							onClick={handleDelete}
						>Delete</button>
					)}
				</div>
			</form>
		</div>
	)
}

export default CategoryForm