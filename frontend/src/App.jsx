import { Outlet } from "react-router-dom";
import Navigation from "./pages/auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
	return (
		<>
			<ToastContainer />
			<Navigation />
			<main className="py-3 bg-[#0a0a0a] ">
				<Outlet />
			</main>
		</>
	);
};

export default App;
