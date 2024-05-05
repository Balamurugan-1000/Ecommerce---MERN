import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../redux/api/userApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import welcome from "../../img/Welcome2.jpg";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [login, { isLoading }] = useLoginMutation();
	const { userInfo } = useSelector((state) => state.auth);
	const { search } = useLocation();
	const sp = new URLSearchParams(search);
	const redirect = sp.get("redirect") || "/";
	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [navigate, redirect, userInfo]);

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			const res = await login({ email, password }).unwrap();
			dispatch(setCredentials({ ...res }));
			toast.success("Login success")
			navigate(redirect);
		} catch (err) {
			toast.error(err?.data?.message || err.message);
		}
	};
	//

	return (
		<div>
			<section className="pl-[10rem] container lg:flex grid place-content-center min-w-[100vw] flex-row-reverse gap-10 ">
				<div className="mr-[4rem] ml-[-4rem] lg:ml-[2rem] mt-[5rem] min-h-[20rem] w-[70vw] lg:w-[45vw] shadow-3xl  transition-shadow delay-[500ms] pl-5 ease-linear py-8 rounded-xl">
					<h1 className="mb-4 text-5xl font-semibold text-coral-red">
						Sign In
					</h1>
					<form
						action=""
						className="container max-w-[40rem] text-slate-gray "
						onSubmit={submitHandler}
					>
						<div className="my-[2rem] ">
							<label
								htmlFor="email"
								className="block text-sm font-medium text-slate-gray"
							>
								{" "}
								Email
							</label>
							<input
								type="email"
								placeholder="Enter your Email..."
								className="w-3/5 p-2 mt-1 text-sm border rounded outline-none text-slate-gray"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="my-[2rem]">
							<label
								htmlFor="password"
								className="block text-sm font-medium text-slate-gray"
							>
								{" "}
								password
							</label>
							<input
								placeholder="Enter your password"
								type="password"
								id="password"
								className="w-3/5 p-2 mt-1 border rounded outline-none text-slate-gray"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<button
							disabled={isLoading}
							type="submit"
							className="px-4 py-2 text-white bg-coral-red rounded cursor-pointer my-[1rem]"
						>
							{isLoading ? "Signing In..." : "Sign In"}
						</button>

						{isLoading && <Loader />}
					</form>
					<div className="mt-4 ">
						<p className="text-slate-gray">
							New Customer ?
							<Link
								to={redirect ? `/register?redirect=${redirect}` : "/register"}
								className="text-coral-red"
							>
								Register
							</Link>
						</p>
					</div>
				</div>
				<div className="w-1/2">
					<img
						src={`https://imgs.search.brave.com/UmNnSGdGcBgSh2JakvF2c8P9Jha2AnwSiusPFGHQ6Us/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jb29s/YmFja2dyb3VuZHMu/aW8vaW1hZ2VzL2Jh/Y2tncm91bmQtd2Fs/bHBhcGVycy1jYTM1/MDFiZC5wbmc`}
						className="mr-20 rounded-lg mt-[9rem] scale-y-125 hidden lg:block sm:hidden"
					/>
				</div>
			</section>
		</div>
	);
};

export default Login;
