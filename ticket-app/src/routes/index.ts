import { Router } from 'express'

const router = Router()
router.post('/payment/callback')

const baseRouter = Router()
baseRouter.use('/v1', (req, res) => {
    console.log('Webhook received:', req.body);
    res.status(200).send('Callback received successfully');
})


export default baseRouter