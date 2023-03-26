import express from "express";
import * as dotenv from "dotenv";
import cors from 'cors';
import { Configuration, OpenAIApi} from 'openai';

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,

})


const openai = new OpenAIApi(configuration)

const app = express();

app.use(cors());
app.use(express.json());
app.get('/', async (req,res) => {
    res.status(200).send({
        message: 'Hello From AI'
    })
});

app.post('/', async (req,res) => {
    try {
        const prompt = req.body.prompt;
        const response  = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages:[  { role: "user", content: `${prompt}` }] ,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        })
        //console.log(response)
        console.log(response.data.choices[0].message.content)

        res.status(200).send({
            bot : response.data.choices
        })
    } catch(error) {
console.log(error)
res.status(500).send({error})
    }
})


app.listen(5000, ()=>{
    console.log('server is running on port http://localhost:5000')
})