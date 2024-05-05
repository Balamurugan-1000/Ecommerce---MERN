import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../redux/api/userApiSlice";
import welcome from "../../img/Welcome2.jpg";

const Register = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [retypePassword, setRetypePassword] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [register, { isLoading }] = useRegisterMutation();
	const { userInfo } = useSelector((state) => state.auth);
	const { search } = useLocation();
	const sp = new URLSearchParams(search);
	const redirect = sp.get("redirect") || "/";

	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [navigate, redirect, userInfo]);

	const registerHandler = async (e) => {
		e.preventDefault();
		if (password !== retypePassword) toast.error("Password not matched");
		else {
			try {
				const res = await register({ username, email, password }).unwrap();
				dispatch(setCredentials(res));
				navigate(redirect);
				toast.success("User successfully registered");
			} catch (error) {
				console.log(error);
				toast.error(error?.data?.message || error.message);
			}
		}
	};

	return (
		<section className="pl-[10rem]  max-h-[85vh] mt-[1rem] lg:flex grid place-content-center min-w-[85vw] flex-row-reverse  justify-between">
			<div className="mr-[4rem] lg:justify-between max-h-[75vh] ml-[-4rem] lg:ml-[4rem] mt-[3rem] min-h-[16rem]  max-w-[70vw] min-w-[70vw] lg:min-w-[45vw] shadow-3xl pl-5 ease-linear py-10 pb-16 rounded-xl  lg:min-h-[80vh]">

				<h1 className="mb-4 text-5xl font-semibold text-center text-coral-red">
					Register
				</h1>
				<form className="max-w-md mx-auto"
					onSubmit={registerHandler}>

					<div className="my-[1rem]">
						<div className="my-[1rem]">
							<label
								htmlFor="name"
								className="block text-sm font-medium text-slate-gray"
							>
								Name
							</label>
							<input
								type="text"
								name="name"
								id="name"
								className="w-3/4 p-2 mt-1 text-sm border rounded outline-none"
								placeholder="Enter your name"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-slate-gray"
						>
							Email
						</label>
						<input
							type="email"
							name="email"
							id="email"
							className="w-3/4 p-2 mt-1 text-sm bg-white border rounded outline-none text-slate-gray"
							placeholder="Enter your Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="my-[1rem]">
						<label
							htmlFor="password"
							className="block text-sm font-medium text-slate-gray"
						>
							Password
						</label>
						<input
							type="password"
							name="password"
							id="password"
							className="w-3/4 p-2 mt-1 text-sm bg-white border rounded outline-none text-slate-gray"
							placeholder="Enter your Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<div className="my-[1rem]">
							<label
								htmlFor="retypePassword"
								className="block text-sm font-medium text-slate-gray"
							>
								retypePassword
							</label>
							<input
								type="password"
								name="retypePassword"
								id="retypePassword"
								className="w-3/4 p-2 mt-1 text-sm bg-white border rounded outline-none text-slate-gray"
								placeholder="Confirm Your Password"
								value={retypePassword}
								onChange={(e) => setRetypePassword(e.target.value)}
							/>
						</div>
					</div>
					<button
						className="bg-coral-red text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
						disabled={isLoading}
						type="submit"
					>
						{isLoading ? "Registering..." : "Register"}
					</button>
				</form>
				<div className="flex gap-1 mt-0 text-[10px] text-wrap lg:text-[15px]">
					<p className="text-slate-gray">Already have an account ?</p>
					<Link
						to={redirect ? `/login?redirect=${redirect}` : "/login"}
						className="text-coral-red"
					>
						Login
					</Link>
				</div>

			</div>

			<div className="w-1/2  max-h-[90vh]">
				<img
					src={`https://t3.ftcdn.net/jpg/06/43/41/28/360_F_643512829_QU8h916o9WIBgrOpDhBZFnqppfHSJhLd.jpg`}
					className="mr-20 rounded-lg mt-[9rem] min-h-[43vh]  scale-y-125 hidden lg:block sm:hidden"
				/>
			</div>
		</section>
	);
};

export default Register;
{/* 
<form className="container max-w-[40rem] text-slate-gray "
					onSubmit={registerHandler}>
					<div className="">
						<div className="my-[1rem]">
							<label
								htmlFor="name"
								className="block text-sm font-medium text-slate-gray"
							>
								Name
							</label>
							<input
								type="text"
								name="name"
								id="name"
								className="w-3/4 p-2 mt-1 text-sm bg-white border rounded outline-none text-slate-gray"
								placeholder="Enter your name"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
						<div className="my-[1rem]">
							<label
								htmlFor="email"
								className="block text-sm font-medium text-slate-gray"
							>
								Email
							</label>
							<input
								type="email"
								name="email"
								id="email"
								className="w-3/4 p-2 mt-1 text-sm text-slate-gray border rounded outline-none bg-[#0f0f0f]"
								placeholder="Enter your Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="my-[1rem]">
							<label
								htmlFor="password"
								className="block text-sm font-medium text-slate-gray"
							>
								Password
							</label>
							<input
								type="password"
								name="password"
								id="password"
								className="w-3/4 p-2 mt-1 text-sm text-slate-gray border rounded outline-none bg-[#0f0f0f]"
								placeholder="Enter your Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<div className="my-[1rem]">
								<label
									htmlFor="retypePassword"
									className="block text-sm font-medium text-slate-gray"
								>
									retypePassword
								</label>
								<input
									type="retypePassword"
									name="retypePassword"
									id="retypePassword"
									className="w-3/4 p-2 mt-1 text-sm text-slate-gray border rounded outline-none bg-[#0f0f0f]"
									placeholder="Confirm Your Password"
									value={retypePassword}
									onChange={(e) => setRetypePassword(e.target.value)}
								/>
							</div>
						</div>
					</div>
					<button
						className="bg-cotext-coral-red text-slate-gray px-4 py-2 rounded cursor-pointer my-[1rem]"
						disabled={isLoading}
						type="submit"
					>
						{isLoading ? "Registering..." : "Register"}
					</button>
				</form>
*/}