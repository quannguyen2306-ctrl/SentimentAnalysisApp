import express from 'express';
const router = express.Router(); 
import grpc from '@grpc/grpc-js'; 
import protoLoader from '@grpc/proto-loader';


// protobuff
const PROTO_PATH = "/Users/nguyenhoangquan/Documents/sental_app/SentimentAnalysisTool/app/src/controllers/proto/comment_list.proto"; 
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const { CommentPrediction } = grpc.loadPackageDefinition()

const pythonClient = new CommentPrediction("localhost:50051", grpc.credentials.createInsecure());

// api
import Comment from "../services/Comment.services.js";

const predictComments = (comments) => { 
    return new Promise((resolve, reject) => { 
        pythonClient.predict(comments, (err, response) => { 
            if (err) { 
                reject(err)
            } else { 
                resolve(response.list)
            }
        })
    })
}

router.route("/predict", async (req, res) => {
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


export default router 
