const EmailRepository = require('../repository/emailRepository');
const repo = new EmailRepository();

async function createEntry(data) {
    try {
        const ticket = await repo.createATicket(data);
        return ticket;
    } catch (error) {
        throw error;
    }
}


const fetchPendingEmails = async () => {
    try {
        const response = await repo.get({status: "PENDING"});
        return response;
    } catch (error) {
        console.log(error);
    }
}


const updateEntry = async (ticketId, data) => {
    try {
        const response = await repo.update(ticketId, data);
        return response;
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    createEntry,
    fetchPendingEmails,
    updateEntry
}