import { useState } from "react";
import { NavLink } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'

const AdminMenu = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}
	return (
		<>
			<button className={`${isMenuOpen ? "top-2 right-2 z-10  " : "top-5 right-7"} bg-[#151515] fixed p-2 rounded-lg `} onClick={toggleMenu}>
				{isMenuOpen ? <FaTimes className="text-xl" color="white" /> : (
					<>
						<div className="w-6 h-0.5 bg-gray-200 my-1"></div>
						<div className="w-6 h-0.5 bg-gray-200 my-1"></div>
						<div className="w-6 h-0.5 bg-gray-200 my-1"></div>
					</>
				)}
			</button>
			{isMenuOpen && (
				<section className="bg-[#101010] border border-[#3aaec8] p-4 fixed right-7 top-5">
					<ul className="mt-2 list-none">
						<li>
							<NavLink className='block px-3 py-2 mb-5 text-gray-500 hover:text-white' to="/admin/dashboard" style={({ isActive }) => ({

								color: isActive ? 'greenyellow' : 'white'
							})}>Admin Dashboard</NavLink>
						</li>
						<li>
							<NavLink className='block px-3 py-2 mb-5 text-gray-500 hover:text-white'
								to="/admin/categorylist" style={({ isActive }) => ({

									color: isActive ? 'greenyellow' : 'white'
								})}>Create Category</NavLink>
						</li>
						<li>
							<NavLink className='block px-3 py-2 mb-5 text-gray-500 hover:text-white' to="/admin/productlist" style={({ isActive }) => ({

								color: isActive ? 'greenyellow' : 'white'
							})}>Create Product</NavLink>
						</li>
						<li>
							<NavLink className='block px-3 py-2 mb-5 text-gray-500 hover:text-white' to="/admin/allproductslist" style={({ isActive }) => ({

								color: isActive ? 'greenyellow' : 'white'
							})}>All Products</NavLink>
						</li>
						<li>
							<NavLink className='block px-3 py-2 mb-5 text-gray-500 hover:text-white'
								to={"/admin/userlist"}
								style={({ isActive }) => ({

									color: isActive ? 'greenyellow' : 'white'
								})}>Manage Users</NavLink>
						</li>
						<li>
							<NavLink className='block px-3 py-2 mb-5 text-gray-500 hover:text-white' to="/admin/orderlist" style={({ isActive }) => ({

								color: isActive ? 'greenyellow' : 'white'
							})}>Manage Orders</NavLink>
						</li>
					</ul>

				</section >
			)}
		</>
	)
}

export default AdminMenu