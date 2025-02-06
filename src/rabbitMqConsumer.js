const amqp = require('amqplib');
const { NotificationTicket } = require('./models'); 
const { RABBITMQ_URI, QUEUE_NAME } = process.env;

// Function to consume messages from the RabbitMQ queue
async function consumeMessages() {
    try {
        // Create a connection and a channel
        const connection = await amqp.connect(RABBITMQ_URI);
        const channel = await connection.createChannel();

        // Assert a queue (ensure the queue exists)
        await channel.assertQueue(QUEUE_NAME, { durable: true });

        // Set the queue to consume messages
        channel.consume(QUEUE_NAME, async (msg) => {
            if (msg !== null) {
                const message = JSON.parse(msg.content.toString());
                console.log('Received message:', message);

                // Create a new notificationTicket entry
                const { flightId, userEmail } = message;
                try {
                    await NotificationTicket.create({
                        flightId,
                        userEmail,
                        status: 'Pending', // Default status
                    });
                    console.log('Ticket created successfully in NotificationService');

                    // Acknowledge the message as processed
                    channel.ack(msg);
                } catch (error) {
                    console.error('Error creating ticket:', error);
                }
            }
        });

        console.log('Waiting for messages...');
    } catch (error) {
        console.error('Error consuming messages from RabbitMQ:', error);
    }
}

module.exports = { consumeMessages };
