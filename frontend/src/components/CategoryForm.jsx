const CategoryForm = ({ value, setValue, handleSubmit, buttonText = 'submit', handleDelete }) => {
	return (
		<div className="p-3">
			<form onSubmit={handleSubmit}>
				<input type="text" className="py-3 px-4 border rounded-lg bg-[#0f0f0f] " placeholder="Enter Category name" value={value} onChange={(e) => setValue(e.target.value)} />
				<div className="flex justify-between">
					<button className="px-4 py-2 mt-5 text-white bg-[#3ec3b1] rounded-lg hover:bg-[#40a698] focus:outline-none focus:ring-2 focus:ring-[#3ec3b1] focus:ring-opacity-50">{buttonText}</button>
					{handleDelete && (
						<button className="px-4 py-2 mt-5 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 "
							onClick={handleDelete}
						>Delete</button>
					)}
				</div>
			</form>
		</div>
	)
}

export default CategoryForm