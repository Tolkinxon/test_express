import express from 'express';
import cors from "cors";
const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(cors());

// app.get('/', (req, res)=> res.json({name: 'tolkinxon'}));
app.get('/', (req, res)=>{ 
    res.status(200);
    console.log(req.query)});
app.get('/user/:userId/post/:postId', (req, res)=> console.log(req.params));
app.post('/create/user',(req, res)=>console.log(req.body));


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
