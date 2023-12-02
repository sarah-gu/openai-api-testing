// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { OpenAI } from 'openai';

export const openai = new OpenAI({
	apiKey : process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prompt = req.query.prompt;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt missing" });
  }

  if (prompt.length > 100) {
    return res.status(400).json({ error: "Prompt too long" });
  }

//   const completion = await openai.createCompletion({
//     model: "text-davinci-003",
//     prompt: `Create a cringy motivational quote based on the following topic.\n
//     Topic: ${prompt}\n
//     Cringy motivational quote:`,
//     max_tokens: 500,
//     temperature: 1,
//     presence_penalty: 0,
//     frequency_penalty: 0,
//   });
	const result = await openai.chat.completions.create({
		messages: [{"role": "system", "content": "You are a helpful assistant that only replies with yes or no."},
		{"role": "user", "content": "Is Sarah Gu really smart and intelligent?"},
		{"role": "assistant", "content": "Yes."},
		{"role": "user", "content": prompt.toString()}],
		model: "gpt-3.5-turbo",
	});

  const quote = result.choices[0].message.content;
  res.status(200).json({ quote });
}