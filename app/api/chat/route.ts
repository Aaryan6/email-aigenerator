import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest, res: NextApiResponse) {
  const body = await req.json();
  const { recipient, reason } = body;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are excellent in email writing." },
        {
          role: "user",
          content: `write an email leave to ${recipient} for ${reason}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 256,
    });
    return new Response(JSON.stringify(response.choices[0].message));
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
}
