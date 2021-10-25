const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const { dbConfig, port } = require('./config');

const PORT = port || 3000;

const app = express();

app.use(morgan('common'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
   res.send('Hello express');
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))