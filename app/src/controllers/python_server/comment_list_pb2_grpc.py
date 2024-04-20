# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

import comment_list_pb2 as comment__list__pb2


class CommentsPredictionStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.predict = channel.unary_unary(
                '/CommentsPrediction/predict',
                request_serializer=comment__list__pb2.CommentsListRequest.SerializeToString,
                response_deserializer=comment__list__pb2.CommentsListResult.FromString,
                )


class CommentsPredictionServicer(object):
    """Missing associated documentation comment in .proto file."""

    def predict(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_CommentsPredictionServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'predict': grpc.unary_unary_rpc_method_handler(
                    servicer.predict,
                    request_deserializer=comment__list__pb2.CommentsListRequest.FromString,
                    response_serializer=comment__list__pb2.CommentsListResult.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'CommentsPrediction', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class CommentsPrediction(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def predict(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/CommentsPrediction/predict',
            comment__list__pb2.CommentsListRequest.SerializeToString,
            comment__list__pb2.CommentsListResult.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)
