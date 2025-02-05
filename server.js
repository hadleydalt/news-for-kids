import express from 'express'
import axios from 'axios'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
const app = express()
app.use(cors())

const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.newsdatahub.com/v1/news';

const headers = {
    'X-Api-Key': API_KEY,
    'User-Agent': 'YourApp/1.0'
}

app.get('/api/news/:category', async (req, res) => {
    const category = req.params.category
    /*try {
        const response = await axios.get(BASE_URL, {
            headers,
            params: {
                topic: category,
                language: 'en'
            }
        })
        res.json(response.data)
    } catch (error) {
        console.error("Error fetching news:", error.response?.data || error.message);
        res.status(500).json({ error: "Error fetching news" });
    }*/
    try {
        const response = await axios.get(BASE_URL, {
            headers,
            params: {
                topic: category,
                language: 'en'
            }
        });
        res.json(response.data)
        console.log(response.data);
    } catch (error) {
        console.error('Error:', error.message);
    }
})

app.listen(5001, () => console.log('Server running on port 5001'))

/*import express from 'express'
import axios from 'axios'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
const app = express()
app.use(cors())

const API_KEY = process.env.API_KEY;

app.get('/api/news/:category', async (req, res) => {
    const category = req.params.category
    try {
        const response = await axios.get(`https://api.thenewsapi.com/v1/news/all?api_token=${API_KEY}&language=en&categories=${category}`)
        res.json(response.data)
    } catch (error) {
        console.error("Error fetching news:", error.response?.data || error.message);
        res.status(500).json({ error: "Error fetching news" });
    }
})

app.listen(5001, () => console.log('Server running on port 5001'))*/