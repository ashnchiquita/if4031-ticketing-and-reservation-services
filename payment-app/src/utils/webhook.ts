const updateWebhook = async (bookingId: string, status: string, message: string) => {
  return await fetch(`${process.env.TICKET_URL as string}/webhook/payment-status`, {
    method: 'POST',
    body: JSON.stringify({
      bookingId,
      status,
      message,
    }),
    headers: {
      'api-key': process.env.WEBHOOK_API_KEY as string,
      'Content-Type': 'application/json',
    },
  });
};

export default updateWebhook;
