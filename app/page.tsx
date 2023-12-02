"use client"; 

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {openai} from "./openai"; 

const fetchOpenAIResponse = async ({prompt, setApiResponse, setLoading}: {prompt: string, setApiResponse: Dispatch<SetStateAction<string>>, setLoading: Dispatch<SetStateAction<boolean>>}) => {
	try {
	  const result = await openai.completions.create({
		model: 'gpt-3.5-turbo-instruct',
		prompt: prompt + " Reply only with one word: 'Yes' or 'No'. Never return an output with more than one word.",
	  });
	  console.log(result); 
	  setApiResponse(result.choices[0].text);
	} catch (error) {
	  // Handle the error
	  console.error(error);
	  setApiResponse("Something is going wrong. Please try again.");
	}
	setLoading(false);
  };

export default function Home() {
	const [prompt, setPrompt] = useState("");
	const [apiResponse, setApiResponse] = useState("");
	const [loading, setLoading] = useState(false);

	// useEffect(() => {
	// 	if (loading) {
	// 	  fetchOpenAIResponse({prompt, setApiResponse, setLoading});
	// 	}
	//   }, [loading, prompt]);

	const handleSubmit = () => {
		setLoading(true);
	  };

  	return (
		<div className = "flex flex-col w-screen h-screen justify-center items-center bg-gradient-to-r from-blue-200 via-green-200 to-purple-300 backdrop-blur-3xl">
			<h1 className = "text-7xl font-bold pb-4">FortuneGPT</h1>
			<p className="pb-8">Ask a yes or no question</p>
			<div className = "flex flex-row justify-center items-center space-x-4 p-8">
				<input onChange={e => setPrompt(e.target.value)} className = "w-72 h-16 border-1 p-4 border border-black rounded-lg" placeholder="Is Sarah really smart?"></input>
				<button type="button" onClick={handleSubmit} className = "w-24 h-16 border-1 p-4 border border-black rounded-lg bg-gray-200">Ask</button>
			</div>

			{/* {apiResponse && (
       			<div className="flex flex-col justify-center items-center w-96">
					<div className = "text-3xl text-bold">{apiResponse}</div>
				</div>
			)} */}
			<div>what ??? {prompt}</div>
			{loading && (<div className="m-4">Loading...</div>)}
		</div>
 	)
}
