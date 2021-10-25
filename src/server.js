const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const { dbConfig, port } = require('./config');

const PORT = port || 3000;

const app = express();

app.use(morgan('common'));
app.use(cors());
app.use(express.json());

const userRoutes = require('./API/v1/users');
const accountsRoutes = require('./API/v1/accounts');
const groupRoutes = require('./API/v1/groups');
const billRoutes = require('./API/v1/bills');

app.get('/', (req, res) => {
   res.send('Hello express');
});

app.use('/users', userRoutes);
app.use('/accounts', accountsRoutes);
app.use('/groups', groupRoutes);
app.use('/bills', billRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))