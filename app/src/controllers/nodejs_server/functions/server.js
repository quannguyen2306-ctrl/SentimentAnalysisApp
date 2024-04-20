import express from 'express'; 
import grpc from '@grpc/grpc-js'; 
import protoLoader from '@grpc/proto-loader'; 
import bodyParser from 'body-parser';

import Comment from "./services/Comment.services.js";


const app = express(); 
app.use(bodyParser.json()); 

// Load gRPC protobuf definition
const PORT = process.env.PORT || 8000;
const PROTO_PATH = "/Users/nguyenhoangquan/Documents/sental_app/SentimentAnalysisTool/app/src/controllers/proto/comment_list.proto"; 
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
                resolve(response.list);
            }
        });    
    })
}

app.get('/predict', async (req, res) => { 
    const link = req.query.link
    const commentClass = new Comment(link)
    const commentsListRequest = await commentClass.getComments();
    try {
        const predictions = await predictComments({list: commentsListRequest});
        res.json({ predictions });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});