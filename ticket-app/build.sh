#!/bin/bash

PROTO_DIR=./proto

# Generate js codes
npx grpc_tools_node_protoc \
    --js_out=import_style=commonjs,binary:${PROTO_DIR} \
    --grpc_out=grpc_js:${PROTO_DIR} \
    -I ../proto \
    ../proto/com/ticket_app/v1/*.proto

# Generate d.ts codes
npx grpc_tools_node_protoc \
    --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
    --ts_out=grpc_js:${PROTO_DIR} \
    -I ../proto \
    ../proto/com/ticket_app/v1/*.proto
    