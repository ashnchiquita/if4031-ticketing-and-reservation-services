import 'dotenv/config'

if (process.env.NODE_ENV === 'production') {
    require('module-alias/register')
}

import express from 'express';
import router from "./routes";
import bodyParser from 'body-parser';
import env from '@/config/env';

function startExpress() {
    // Express Server
    const app = express();
    const port = env.SERVER_PORT || 3002;
    
    app.use(bodyParser.json());
    app.use('/api/v1', router)

    app.listen(port, () => {
        console.log(`Express server is running on http://localhost:${port}`);
    });
}

startExpress();