import 'dotenv/config'

if (process.env.NODE_ENV === 'production') {
    require('module-alias/register')
}

// import {  ServerCredentials } from "@grpc/grpc-js";
// import { grpcServer } from "./config/grpc";
import express from 'express';
import router from "./routes";
import bodyParser from 'body-parser';


function startExpress() {
    // Express Server
    const app = express();
    const port = process.env.SERVER_PORT || 3002;

    app.use(bodyParser.json());
    app.use('/api/v1', router)

    app.listen(port, () => {
        console.log(`Express server is running on http://localhost:${port}`);
    });
}

// function startgRPC() {
//     // gRPC Server
//     const grpcPort = process.env.GRPC_PORT || 3001
//     console.log('grpcPort', process.env.GRPC_PORT)
//     const uri = `0.0.0.0:${grpcPort}`;
    
//     grpcServer.bindAsync(uri, ServerCredentials.createInsecure(),
//         (err, port) => {
//             if (err) {
//                 console.error(err);
//                 return;
//             }
//             console.log(`gRPC Server is running on http://localhost:${port}`);
//             grpcServer.start();
//         }
//     );
// }

startExpress();
// startgRPC();