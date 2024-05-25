import { useState } from "react";
import { NavLink } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'

const AdminMenu = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}
	return (
		<div className="mt-[7rem] text-slate-gray">
			<button className={`${isMenuOpen ? "top-2 right-2 z-10  " : "top-24 right-7"} text-slate-gray fixed p-2 rounded-lg `} onClick={toggleMenu}>
				{isMenuOpen ? <FaTimes className="text-xl mt-[6rem]" color="#6D6D6D" /> : (
					<div className="mt-5">
						<div className="w-6 h-0.5 bg-slate-gray my-1"></div>
						<div className="w-6 h-0.5 bg-slate-gray my-1"></div>
						<div className="w-6 h-0.5 bg-slate-gray my-1"></div>
					</div>
				)}
			</button>
			{isMenuOpen && (
				<section className="fixed p-4 mt-[7rem] border bg-primary text-slate-gray border-coral-red right-7 top-5">
					<ul className="mt-2 list-none">
						<li>
							<NavLink className='block px-3 py-2 mb-5 text-gray-500 hover:text-slate-gray' to="/admin/dashboard" style={({ isActive }) => ({

								color: isActive ? '#FF6452' : '#6D6D6D'
							})}>Admin Dashboard</NavLink>
						</li>
						<li>
							<NavLink className='block px-3 py-2 mb-5 text-gray-500 hover:text-slate-gray'
								to="/admin/categorylist" style={({ isActive }) => ({

									color: isActive ? '#FF6452' : '#6D6D6D'
								})}>Create Category</NavLink>
						</li>
						<li>
							<NavLink className='block px-3 py-2 mb-5 text-gray-500 hover:text-slate-gray' to="/admin/productlist" style={({ isActive }) => ({

								color: isActive ? '#FF6452' : '#6D6D6D'
							})}>Create Product</NavLink>
						</li>
						<li>
							<NavLink className='block px-3 py-2 mb-5 text-gray-500 hover:text-slate-gray' to="/admin/allproductslist" style={({ isActive }) => ({

								color: isActive ? '#FF6452' : '#6D6D6D'
							})}>All Products</NavLink>
						</li>
						<li>
							<NavLink className='block px-3 py-2 mb-5 text-gray-500 hover:text-slate-gray'
								to={"/admin/userlist"}
								style={({ isActive }) => ({

									color: isActive ? '#FF6452' : '#6D6D6D'
								})}>Manage Users</NavLink>
						</li>
						<li>
							<NavLink className='block px-3 py-2 mb-5 text-gray-500 hover:text-slate-gray' to="/admin/orderlist" style={({ isActive }) => ({

								color: isActive ? '#FF6452' : '#6D6D6D'
							})}>Manage Orders</NavLink>
						</li>
					</ul>

				</section >
			)}
		</div>
	)
}

export default AdminMenu