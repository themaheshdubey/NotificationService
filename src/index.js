const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cronJob = require('./utils/job');

app.listen(PORT , () => {
    cronJob.setUpJobs();
    console.log(`server started at PORT ${PORT}`);
})