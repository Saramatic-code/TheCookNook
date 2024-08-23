import twilio from 'twilio';

export default async function handler(req, res) {
    const { shoppingList } = req.body;

    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

    const message = shoppingList.map(ing => `${ing.quantity} ${ing.item}`).join(', ');

    try {
        await client.messages.create({
            body: `Your Shopping List: ${message}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: process.env.YOUR_PHONE_NUMBER,
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Failed to send SMS:', error);
        res.status(500).json({ success: false });
    }
}
