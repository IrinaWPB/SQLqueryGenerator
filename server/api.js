import OpenAI from 'openai'
import dotenv from "dotenv"

dotenv.config()

const openaiApiKey = process.env.OPENAI_API_KEY

//throwing error if key is not found and stops the server
if (!openaiApiKey) {
    console.error('OPENAI_API_KEY is missing')
    process.exit(1)
}

const openai = new OpenAI({
    apiKey: openaiApiKey
})

export default openai