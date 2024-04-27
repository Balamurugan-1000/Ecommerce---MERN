import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { setCredentials } from "../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { useProfileMutation } from "../redux/api/userApiSlice";
const Profile = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [retypePassword, setRetypePassword] = useState("");

	const { userInfo } = useSelector((state) => state.auth);
	const [updateProfile, { isLoading }] = useProfileMutation();

	useEffect(() => {
		setUsername(userInfo.username);
		setEmail(userInfo.email);
	}, [userInfo.email, userInfo.username]);

	const dispatch = useDispatch();

	const submitHandler = async (e) => {
		e.preventDefault();
		if (password !== retypePassword) toast.error("Password not match");
		else {
			try {
				const res = await updateProfile({
					_id: userInfo._id,
					username,
					email,
					password,
				}).unwrap();
				dispatch(setCredentials({ ...res }));
				toast.success("Profile Updated Successfully");
			} catch (error) {
				toast.error(error?.data?.message || error.message);
			}
		}
	};
	return (
		<div className="container p-4 mx-auto mt-[5rem] ">
			<div className="flex flex-col items-center justify-center md:space-x-4">
				<h2 className="mb-4 text-2xl font-semibold text-white">
					Update Profile
				</h2>
				<div className="md:w-1/3">
					<form onSubmit={submitHandler}>
						<div className="mb-4 ">
							<label className="block mb-4 text-white">Name</label>
							<input
								type="text"
								placeholder="Enter Name"
								className="w-full p-4 text-xl  outline-none rounded-xl bg-[#0f0f0f]"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
						<div className="mb-4 ">
							<label className="block mb-4 text-white">Email</label>
							<input
								type="email"
								placeholder="Enter Email"
								className="w-full p-4 text-xl  outline-none rounded-xl bg-[#0f0f0f]"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="mb-4 ">
							<label className="block mb-4 text-white">Password</label>
							<input
								type="password"
								placeholder="Enter Password"
								className="w-full p-4 text-xl  outline-none rounded-xl bg-[#0f0f0f]"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div className="mb-4 ">
							<label className="block mb-4 text-white">Confirm password</label>
							<input
								type="password"
								placeholder="Confirm your password"
								className="w-full p-4 text-xl  outline-none rounded-xl bg-[#0f0f0f]"
								value={retypePassword}
								onChange={(e) => setRetypePassword(e.target.value)}
							/>
						</div>
						<div className="flex justify-between">
							<button
								type="submit"
								onClick={submitHandler}
								className="bg-[#17f0d3] text-white py-2 px-4 rounded hover:bg-[#14ceb5]"
							>
								Update
							</button>

							<Link
								to={"/user-orders"}
								className="bg-[#14ceb5] text-white py-2 px-4 rounded hover:bg-[#11af9a]"
							>
								My orders
							</Link>
						</div>
					</form>
				</div>
				{isLoading ? <Loader /> : <></>}
			</div>
		</div>
	);
};

export default Profile;
