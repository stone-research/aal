"use client";

import { NextApiRequest, NextApiResponse } from 'next';
import openai from 'openai';
import { auth } from "@clerk/nextjs";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      // Retrieve your OpenAI API key from environment variables
      const apiKey = process.env.OPENAI_API_KEY;

      // Initialize the OpenAI API client
      const openaiInstance = new openai.OpenAI({ apiKey });

      // Make requests to the OpenAI API using the client instance
      // Your API logic goes here

      res.status(200).json({ message: 'OpenAI API endpoint' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default handler;
