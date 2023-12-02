"use client"; 

import { useState } from "react";

export default function Home() {
	const [prompt, setPrompt] = useState("");
	const [apiResponse, setApiResponse] = useState("");
	const [loading, setLoading] = useState(false);


	const handleSubmit = async () => {
		if(prompt){
			try{
				setLoading(true);
				const response = await fetch("/api/fortune?prompt=" + encodeURIComponent(prompt));
				const body = await response.json();
				console.log(body.quote);

				setApiResponse(body.quote); 
			}
			catch (error) {
				console.error(error);
				setApiResponse("Something is going wrong. Please try again.");
			}
			finally{
				setLoading(false);
			}
		}

	  };

  	return (
		<div className = "flex flex-col w-screen h-screen justify-center items-center bg-gradient-to-r from-blue-200 via-green-200 to-purple-300 backdrop-blur-3xl p-4">
			<h1 className = "text-7xl font-bold pb-4">FortuneGPT</h1>
			<p className="pb-8">Ask a yes or no question</p>
			<div className = "flex flex-row justify-center items-center space-x-4 p-8">
				<input onChange={e => setPrompt(e.target.value)} className = "w-72 h-16 border-1 p-4 border border-black rounded-lg" placeholder="Is Sarah really smart?"></input>
				<button type="button" onClick={handleSubmit} className = "w-24 h-16 border-1 p-4 border border-black rounded-lg bg-gray-200">Ask</button>
			</div>

			{apiResponse && (
       			<div className="flex flex-col justify-center items-center w-96">
					<div className = "text-3xl text-bold">{apiResponse}</div>
				</div>
			)}
			{loading && (<div className="m-4">Loading...</div>)}
		</div>
 	)
}
