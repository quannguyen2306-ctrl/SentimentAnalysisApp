from concurrent import futures
import grpc
import comment_list_pb2_grpc
import comment_list_pb2
from predict import predict_sentiment

class CommentPrediction(comment_list_pb2_grpc.CommentsPredictionServicer): 
    def predict(self, request, context):
        predictions = predict_sentiment(request.list)
        for i in predictions: 
            print(i.keys())
        results = [
            comment_list_pb2.CommentResult(
                text=comment.text,
                label=prediction['label'],
                sentiment=prediction['sentiment']
            )
            for comment, prediction in zip(request.list, predictions)
        ]

        print(results)
        return comment_list_pb2.CommentsListResult(list = results)
    
def serve(): 
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    comment_list_pb2_grpc.add_CommentsPredictionServicer_to_server(CommentPrediction(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print("Server is running on port 50051")
    server.wait_for_termination()

if __name__ == "__main__": 
    serve()

