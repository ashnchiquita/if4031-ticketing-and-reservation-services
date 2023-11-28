// status is enum, represented by number: { 0: "pending", 1: "failed", 2: "success" }
export function encodeStatus(status: string) {
  return status === 'pending' ? 0 : status === 'failed' ? 1 : 2;
}
export function decodeStatus(status: number) {
  return status === 0 ? 'pending' : status === 1 ? 'failed' : 'success';
}
