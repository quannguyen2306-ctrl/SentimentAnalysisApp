// Server
import express, { json } from 'express';
import { json as _json } from 'body-parser';

// Firebase
import functions from "firebase-functions/v2";
import { credential as _credential } from 'firebase-admin';
import serviceAccount from './sental-firebase-adminsdk-9w2pl-a23e11eca2.json';
import { initializeApp } from "firebase-admin/app";

//Test model in Python
import { getInstance } from './services/ml/modelLoader/model.js';
import { spawn } from "child_process";

// Get Comment
import Comment from "./services/youtube/comment.js";

//gRPC 
import grpc from "@grpc/grpc-js"
import protoLoader from "@grpc/proto-loader"
const PROTO_PATH = "/Users/nguyenhoangquan/Documents/sental_app/SentimentAnalysisTool/app/src/controllers/proto/comment_list.proto"

const packageOptions = { 
    keepCase: true, 
    longs: String, 
    enums: String, 
    defaults: true, 
    oneofs: true
}

let packageDefinition = protoLoader.loadSync(PROTO_PATH, packageOptions); 
const newsProto = grpc.loadPackageDefinition(packageDefinition);



const cre = process.env;
initializeApp({
    credential: _credential.cert(serviceAccount),
    databaseURL: cre.DATABASE_FIREBASE_URL
})

const app = express();
app.use(json())

// Home 
app.get("/", ((req, res) => {
    res.send("Hello from firebase")
}))

app.get("/analyze", (async (req, res) => {
    const data = req.query;
    const link = data.link;

    const classifier = await getInstance();

    const commentClass = new Comment(link)
    const commentList = await commentClass.getComments();

    const result = await Promise.all(commentList.map(async (comment) => {
        const result = await classifier(comment);
        const response = {
            comment: comment,
            label: result[0].label,
            score: result[0].score
        }
        return response
    }))


    console.log(result)
    res.send(JSON.stringify(result));

}))

app.get("/testpython", (async (req, res) => { 
    const pathPredict = "/Users/nguyenhoangquan/Documents/sental_app/SentimentAnalysisTool/app/src/controllers/server/functions/services/ml/predict.py"
    const link = req.query.link; 
    console.log(link)
    const commentClass = new Comment(link)
    const commentList = await commentClass.getComments();


    console.log(commentList.slice(0, 5)); 
    const sendingData = JSON.stringify(commentList.slice(0, 5))

    const python = spawn('python', [pathPredict, sendingData]); 

    let processedData = ""; 

    python.stdout.on('data', (chunk) => { 
        processedData += chunk.toString(); 
    })

    python.on('close', (code) => { 
        if (code === 0) { 
            
            res.send(processedData);
        } else { 
            res.status(500).send("Error in python file")
        }
    })

}))

const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

