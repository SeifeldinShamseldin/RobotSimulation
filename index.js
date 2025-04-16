const express = require('express');
const app = express(); // this will make it listen for incoming requests

app.get('/', (req, res) => {
    res.send('<h1>Hi, there!</h1>');
});

const PORT  = process.env.PORT || 3000; //in the prodiction it will be diffrent but for now we make or to make sure to run now on 3000
app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});
