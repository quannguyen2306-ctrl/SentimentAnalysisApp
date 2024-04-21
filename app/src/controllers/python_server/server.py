from concurrent import futures
import grpc
import comment_list_pb2_grpc
import comment_list_pb2
from predict import predict_sentiment

class CommentPrediction(comment_list_pb2_grpc.CommentsPredictionServicer): 
    def predict(self, request, context):
        predictions = predict_sentiment(request.list)
        return comment_list_pb2.CommentsResult(result = predictions)
    
def serve(): 
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    comment_list_pb2_grpc.add_CommentsPredictionServicer_to_server(CommentPrediction(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print("Server is running on port 50051")
    server.wait_for_termination()

if __name__ == "__main__": 
    serve()

# python -m grpc_tools.protoc -I=<directory_of_proto_file> --python_out=<output_directory> --grpc_python_out=<output_directory> <your_proto_file>.proto
# python -m grpc_tools.protoc -I=proto --python_out=python_server --grpc_python_out=python_server comment_list.proto

