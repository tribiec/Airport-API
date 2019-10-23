//* Airport CRUD
//? Server Configuration
const express = require('express');
const cors = require('cors');
const app = express();
const port = 90;
app.use(cors());
app.use(express.json());
app.set('port', process.env.port || port);
app.use('/api', require('./routes'));
//* Server Ready to Run
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});