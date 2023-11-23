import { SeatStatus } from "@/proto/com/ticket_app/v1/seats_pb";
import { Status } from "@grpc/grpc-js/build/src/constants";
import bcrypt from 'bcrypt';

export function mapStringToSeatStatus(status: 'available' | 'booked' | 'sold'): SeatStatus {
   const statusMap = {
            available: SeatStatus.AVAILABLE,
            booked: SeatStatus.BOOKED,
            sold: SeatStatus.SOLD,
    }
    
    const seatStatus = statusMap[status] as SeatStatus;
    if (!seatStatus) {
        throw new Error(`Invalid seat status: ${status}`);
    }

    return seatStatus;
}

export function mapSeatStatusToString(status: SeatStatus): 'available' | 'booked' | 'sold' {
   const statusMap = {
         [SeatStatus.AVAILABLE]: 'available',
         [SeatStatus.BOOKED]: 'booked',
         [SeatStatus.SOLD]: 'sold',
   }

    const stringStatus =  statusMap[status] as 'available' | 'booked' | 'sold';
    if (!stringStatus) {
        throw new Error(`Invalid seat status: ${status}`);
    }

    return stringStatus;
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