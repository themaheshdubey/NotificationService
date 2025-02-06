const cron = require('node-cron');
const service = require('../services/emailService');
const sender = require('../config/emailConfig');

async function sendEmail(email) {

    console.log(email);

    const mailOptions = {
        from: process.env.EMAIL_ID,
        to: email.userEmail,
        subject: "Booked ticket",
        text: `Your flight ID: ${email.flightId} has been successfully booked.`
    };

    try {
        const info = await sender.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        
        // After successfully sending the email, update the ticket status
        await service.updateEntry(email.id, { status: "SUCCESS" });
    } catch (err) {
        console.error('Error sending email:', err);
    }
}

function setUpJobs() {

    cron.schedule('*/10 * * * * *', async () => {
        console.log('Fetching pending emails...');
        
        const response = await service.fetchPendingEmails();

        // Process each pending email
        for (const email of response) {
            await sendEmail(email);
        }
    });
}

module.exports = {
    setUpJobs
};
