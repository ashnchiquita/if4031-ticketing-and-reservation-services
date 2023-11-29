# Payment App

## API Docs

### HTTP APIs

| HTTP Method | Endpoint                       | Description                                    |
| ----------- | ------------------------------ | ---------------------------------------------- |
| POST        | `/api/invoices`                | Create invoice                                 |
| GET         | `/api/invoices/:bookingId`     | Get invoice by booking id                      |
| PUT         | `/api/invoices/:bookingId`     | Edit invoice by booking id                     |
| DELETE      | `/api/invoices/:bookingId`     | Delete invoice by booking id                   |
| POST        | `/api/payment`                 | Create invoice and send payment URL            |
| GET         | `/payment`                     | Simulate payment (URL to be clicked by user)   |

## How To Start
1. Follow instruction to run all container [here](../readme.md).
