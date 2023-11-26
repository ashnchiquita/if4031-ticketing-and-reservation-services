import { Request, Response } from "express"
import crypto from "crypto"
import env from "@/config/env"

function validateSignature(req: Request, res: Response, next: Function) {
    // Get the reader from the incoming webhook
    const sigHeader = req.headers["X-Webhook-Signature"]
    const signature = crypto.createHmac('sha256', env.WEBHOOK_SHARED_SECRET).update(req.body).digest('base64')
  
    if (signature !== sigHeader) {
      res.status(401).send({ message: "Webhook is not properly signed"})
    }
  
    next()
}

export default validateSignature