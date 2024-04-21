import express from 'express';
import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv'; dotenv.config()
import Comment from "./services/Comment.services.js";
import Video from "./services/Video.services.js";

const app = express();
const corsOptions = {
    origin: '*', // Replace with client's URL
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(bodyParser.json());
app.use(cors(corsOptions))

// Load gRPC protobuf definition
const PORT = process.env.PORT || 8000;
const PROTO_PATH = "../../proto/comment_list.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const { CommentsPrediction } = grpc.loadPackageDefinition(packageDefinition);

// Create gRPC client 
const pythonClient = new CommentsPrediction('localhost:50051', grpc.credentials.createInsecure());

function predictComments(comments) {
    return new Promise((resolve, reject) => {
        pythonClient.predict(comments, (err, response) => {
            if (err) {
                reject(err);
            } else {
                console.log(response)
                resolve(response.result);
            }
        });
    })
}

app.get('/predict', async (req, res) => {
    const link = req.query.link
    const commentClass = new Comment(link)
    const commentsListRequest = await commentClass.getComments();
    try {
        const predictions = await predictComments({ list: commentsListRequest });
        console.log("raw", predictions)
        const exp = 3;
        const dp = Math.pow(10, exp);
        for (let key in predictions) {
            predictions[key] = Math.round(predictions[key] * dp) / dp; // round to <dp> decimal places
        }
        let sum = Object.values(predictions).reduce((acc, curr) => acc + curr, 0);
        predictions.NEU += 1 - sum;
        predictions.NEU = Math.round(predictions.NEU * dp) / dp
        res.json({ predictions });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.get('/video', async (req, res) => {
    const link = req.query.link
    const video = new Video(link);
    video.getInfo()
        .then(videoInfo => {
            console.log('Title:', videoInfo.title);
            console.log('Author:', videoInfo.author);
            console.log('Thumbnail URL:', videoInfo.thumbnail);
            res.json(videoInfo)
        })
        .catch(error => {
            console.error(error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        });
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});