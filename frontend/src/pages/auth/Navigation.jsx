import { useEffect, useState } from "react";
import {
	AiOutlineHome,
	AiOutlineShopping,
	AiOutlineLogin,
	AiOutlineUserAdd,
	AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/userApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../products/FavoritesCount";
const Navigation = () => {
	const { userInfo } = useSelector((state) => state.auth);

	const [dropDownOpen, setDropDownOpen] = useState(false);
	const [showSidebar, setShowSidebar] = useState(false);

	const toggleDropDown = () => {
		setDropDownOpen(!dropDownOpen);
	};
	const toggleShowSidebar = () => {
		setShowSidebar(!showSidebar);
	};
	const closeSidebar = () => {
		setShowSidebar(false);
	};
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [logoutApiCall] = useLogoutMutation();

	const logoutHandler = async () => {
		try {
			await logoutApiCall().unwrap();
			dispatch(logout());
			navigate("/login");
		} catch (error) {
			console.error(error);
		}
	};
	const handleMouseLeave = () => {
		setDropDownOpen(false);
	};
	useEffect(() => {
		setDropDownOpen(false);
	}, [userInfo, navigate]);

	const { cartItems } = useSelector(state => state.cart)
	return (
		<div
			onMouseLeave={handleMouseLeave}
			style={{ zIndex: 9999 }}
			className={`${showSidebar ? "hidden" : "flex"
				} xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-[#000] w-[4%] hover:w-[15%] h-screen  fixed `}
			id="navigation-container"
		>
			<div className="flex flex-col justify-center gap-0 space-y-4">
				<Link
					to="/"
					className="flex items-center transition-transform transform hover:translate-x-4"
				>
					<AiOutlineHome className="mr-3 mt-[3rem]" size={26} />
					<span className="nav-item-name mt-[3rem] pt-1 text-2xl text-white">
						Home
					</span>
				</Link>
				<Link
					to="/shop"
					className="flex items-center transition-transform transform hover:translate-x-4"
				>
					<AiOutlineShopping className="mr-3 mt-[3rem]" size={26} />
					<span className="nav-item-name mt-[52px] text-2xl text-white">
						Shop
					</span>
				</Link>
				<Link
					to="/cart"
					className="flex items-center transition-transform transform hover:translate-x-4"
				>
					<AiOutlineShoppingCart className=" mr-3 mt-[3rem]" size={26} />
					<span className=" nav-item-name mt-[52px] text-2xl text-white">
						Cart
					</span>
					{""}
					<div className="absolute top-9">
						{cartItems.length > 0 && (
							<span>
								<span className="h-[18px]  px-1 py-[2px] text-center w-[1px] text-sm text-black bg-greenishBlueDark rounded-full">
									{cartItems.reduce((a, p) => Number(a + p.qty), 0)}
								</span>
							</span>
						)}
					</div>
				</Link>
				<Link
					to="/favorite"
					className="flex items-center transition-transform transform hover:translate-x-4"
				>
					<FaHeart className=" mr-3 mt-[3rem]" size={26} />
					<span className=" nav-item-name mt-[52px] text-2xl text-white">
						Favorite
					</span>
					{""}
					<FavoritesCount />
				</Link>
			</div>
			<div className="relative">
				<button
					onClick={toggleDropDown}
					className="flex items-center to-gray-800 focus:outline-none"
				>
					{userInfo ? (
						<span className="text-white">{userInfo.username}</span>
					) : (
						<></>
					)}
					{userInfo && (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className={`h-4 w-4 ml-1 ${dropDownOpen ? "transform rotate-180" : ""
								}`}
							fill="none"
							viewBox="0 0 24 24"
							stroke="white"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d={dropDownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
							/>
						</svg>
					)}
				</button>
				{dropDownOpen && userInfo && (
					<ul
						className={`absolute right-0 mt-2 mr-14  space-y-2 bg-white text-gray-600 ${!userInfo.isAdmin ? "-top-20 " : "-top-80"
							}`}
					>
						{userInfo.isAdmin && (
							<>
								<li>
									<Link
										to="/admin/dashboard"
										className="block px-4 py-2 hover:bg-gray-100"
									>
										Dashboard
									</Link>
								</li>
								<li>
									<Link
										to="/admin/allproductslist"
										className="block px-4 py-2 hover:bg-gray-100"
									>
										Products
									</Link>
								</li>
								<li>
									<Link
										to="/admin/categorylist"
										className="block px-4 py-2 hover:bg-gray-100"
									>
										Category
									</Link>
								</li>
								<li>
									<Link
										to="/admin/orderlist"
										className="block px-4 py-2 hover:bg-gray-100"
									>
										Orders
									</Link>
								</li>
								<li>
									<Link
										to="/admin/userlist"
										className="block px-4 py-2 hover:bg-gray-100"
									>
										Users
									</Link>
								</li>
							</>
						)}
						<li>
							<Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
								Profile
							</Link>
						</li>
						<li>
							<button
								onClick={logoutHandler}
								className="block w-full px-4 py-2 text-left hover:bg-gray-100"
							>
								Logout
							</button>
						</li>
					</ul>
				)}
			</div>
			{!userInfo && (
				<ul>
					<li>
						<Link
							to="/login"
							className="flex items-center transition-transform transform hover:translate-x-4"
						>
							<AiOutlineLogin className=" mr-3 mt-[3rem]" size={26} />
							<span className=" nav-item-name mt-[3rem] pt-1 text-2xl text-white">
								Login
							</span>
							{""}
						</Link>
					</li>
					<li>
						<Link
							to="/register"
							className="flex items-center transition-transform transform hover:translate-x-4"
						>
							<AiOutlineUserAdd className=" mr-3 mt-[3rem]" size={26} />
							<span className=" nav-item-name mt-[3rem] pt-1 text-2xl text-white">
								Register
							</span>
							{""}
						</Link>
					</li>
				</ul>
			)}
		</div>
	);
};

export default Navigation;
