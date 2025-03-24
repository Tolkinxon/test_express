import express from 'express';
import cors from "cors";
import { rateLimit } from 'express-rate-limit';
import fileUpload from 'express-fileupload';
import path from 'node:path';
const PORT = process.env.PORT || 4000;

const app = express();
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)
app.use(express.json());
app.use(cors());
app.use(fileUpload());

// app.get('/', (req, res)=> res.json({name: 'tolkinxon'}));
app.get('/', (req, res)=>{ res.status(200); console.log(req.query)});
app.get('/user/:userId/post/:postId', (req, res)=> console.log(req.params));
app.post('/create/user',(req, res)=>console.log(req.body));
app.post('/file/upload', (req, res)=>{

    console.log(req.body);    
    const file = req.files.image;
    const fileName = Date.now()  + file.name;
    const filePath = path.join(process.cwd(), 'images', fileName)

    req.files.image.mv(filePath);
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
