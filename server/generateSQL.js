import openai from "./api.js";

const generate = async (usersPrompt) => {
    const res = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt: `Convert description into a SQL query: \n ${usersPrompt}.`,
        max_tokens: 100,
        temperature: 0,
    })
    return res.choices[0].text
}

export default generate