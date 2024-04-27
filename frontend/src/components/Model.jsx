
const Model = ({ children, onClose, isOpen }) => {
	return (
		<>
			{isOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center " >
					<div className="fixed inset-0 border border-[#17f0d3] ">
						<div className="absolute top-[40%] right-[50%] bg-[#414141] p-4 rounded-lg z-10 text-right">
							<button className="p-1 mr-2 text-xl font-semibold text-red-500 hover:text-red-700 focus:outline-none " onClick={onClose}>
								X
							</button>
							{children}
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default Model