import { SeatStatus } from "@/proto/com/ticket_app/v1/seats_pb";
import { Status } from "@grpc/grpc-js/build/src/constants";
import bcrypt from 'bcrypt';

export function mapSeatStatus(status: 'available' | 'booked' | 'sold'): SeatStatus {
    switch (status) {
        case 'available':
            return SeatStatus.AVAILABLE;
        case 'booked':
            return SeatStatus.BOOKED;
        case 'sold':
            return SeatStatus.SOLD;
        default:
            throw new Error(`Invalid seat status: ${status}`);
    }
}

export async function authenticate(call: any, onError: (data: {
    code: Status.UNAUTHENTICATED,
     details: 'Invalid API key',
}) => void) {
    console.log('Intercepting request:', call.request);
    console.log('Intercepting metadata:', call.metadata);

    const apiKey: string = call.metadata.get('api-key')[0] as string;
    const clientApiKey = process.env.CLIENT_API_KEY ?? "";
    console.log('Client API key:', clientApiKey, 'API key:', apiKey);
    const match = await bcrypt.compare(apiKey ?? "", clientApiKey);

    if (apiKey && match) {
      console.log('Valid API key');
        return true;
    } else {
      console.log('Invalid API key');
        onError({
            code: Status.UNAUTHENTICATED,
        details: 'Invalid API key',
        });
        return;
    }
}

function isValidApiKey(apiKey: string): boolean {
    const clientApiKey = process.env.CLIENT_API_KEY ?? "";
    console.log('Client API key:', clientApiKey, 'API key:', apiKey);
    return bcrypt.compareSync(apiKey, clientApiKey);
  }