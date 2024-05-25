import React from 'react'

const ProgressStep = ({ step1, step2, step3 }) => {
	return (
		<div className="flex items-center justify-between max-w-[450px] mx-auto space-x-4">
			{/* //progress bar with check mark for 3 steps  with title*/}
			<div className="flex items-center">
				<div className={`w-6 mr-2 h-6 flex items-center justify-center rounded-full border-2 border-black ${step1 ? "bg-green-500" : "bg-white"}`}>
					{step1 && <span className="text-slate-gray"></span>}
				</div>
				<p className="text-sm font-semibold">Sign In</p>


				{/*Long  Arrow to the next */}
				<div className="flex items-center">
					<svg xmlns="http://www.w3.org/2000/svg" className="w-6 ml-[3rem] h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
					</svg>
				</div>

			</div>


			<div className="flex items-center">
				<div className={`w-6 mr-2 h-6 flex items-center justify-center rounded-full border-2 border-black ${step2 ? "bg-green-500" : "bg-white"}`}>
					{step2 && <span className="text-slate-gray"></span>}
				</div>
				<p className="text-sm font-semibold">Shipping</p>
				<div className="flex items-center">
					<svg xmlns="http://www.w3.org/2000/svg" className="w-6 ml-[3rem] h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
					</svg>
				</div>

			</div>
			<div className="flex items-center">
				<div className={`w-6 mr-2 h-6 flex items-center justify-center rounded-full border-2 border-black ${step3 ? "bg-green-500" : "bg-white"}`}>
					{step3 && <span className="text-slate-gray"></span>}
				</div>
				<p className="text-sm font-semibold">Payment</p>
			</div>

		</div>
	)
}

export default ProgressStep






