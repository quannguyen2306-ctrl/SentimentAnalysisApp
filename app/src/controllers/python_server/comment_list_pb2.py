# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: comment_list.proto
# Protobuf Python Version: 4.25.1
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
from google.protobuf.internal import builder as _builder
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x12\x63omment_list.proto\"\x1e\n\x0e\x43ommentRequest\x12\x0c\n\x04text\x18\x01 \x01(\t\"=\n\x14\x41verageCommentResult\x12\x0b\n\x03POS\x18\x01 \x01(\x02\x12\x0b\n\x03NEG\x18\x02 \x01(\x02\x12\x0b\n\x03NEU\x18\x03 \x01(\x02\"4\n\x13\x43ommentsListRequest\x12\x1d\n\x04list\x18\x01 \x03(\x0b\x32\x0f.CommentRequest\"7\n\x0e\x43ommentsResult\x12%\n\x06result\x18\x01 \x01(\x0b\x32\x15.AverageCommentResult\"\x07\n\x05\x45mpty2F\n\x12\x43ommentsPrediction\x12\x30\n\x07predict\x12\x14.CommentsListRequest\x1a\x0f.CommentsResultb\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'comment_list_pb2', _globals)
if _descriptor._USE_C_DESCRIPTORS == False:
  DESCRIPTOR._options = None
  _globals['_COMMENTREQUEST']._serialized_start=22
  _globals['_COMMENTREQUEST']._serialized_end=52
  _globals['_AVERAGECOMMENTRESULT']._serialized_start=54
  _globals['_AVERAGECOMMENTRESULT']._serialized_end=115
  _globals['_COMMENTSLISTREQUEST']._serialized_start=117
  _globals['_COMMENTSLISTREQUEST']._serialized_end=169
  _globals['_COMMENTSRESULT']._serialized_start=171
  _globals['_COMMENTSRESULT']._serialized_end=226
  _globals['_EMPTY']._serialized_start=228
  _globals['_EMPTY']._serialized_end=235
  _globals['_COMMENTSPREDICTION']._serialized_start=237
  _globals['_COMMENTSPREDICTION']._serialized_end=307
# @@protoc_insertion_point(module_scope)
