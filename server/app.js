const express = require('express');
const RateLimiting = require('express-rate-limit');
const path = require('path');
const Controllers = require('./Controllers');
const EventStore = require('./EventStore');
const WalletConsumer = require('./Consumers/Wallet');

require('dotenv').config();

const PORT = process.env.PORT || 4000;

// create Eventstore
const walletChannel = EventStore.subscribe('wallet');

walletChannel.onEvent(WalletConsumer);

const app = express();

// Rate Limiting Setup
const limiter = RateLimiting({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // limit each IP to 1000 requests per windowMs
  message: {
    message: 'Too many request try again later',
  },
});

//  apply to all requests
app.use(limiter);
app.use(express.json());

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/api', (req, res) => res.status(200).json({ message: 'Wallet Api' }));
app.post('/login', Controllers.User.Login);
app.post('/users', Controllers.User.CreateUser);
app.get('/users/:id', Controllers.User.GetUser);
app.get('/users', Controllers.User.GetUsers);
app.put('/users/:id', Controllers.User.UpdateUser);
app.get('/users/:id/wallet', Controllers.User.GetUserWallet);
app.post('/transactions/:userId', Controllers.Transaction.createTransaction);
app.get('/statements/:userId', Controllers.Statement.getStatement);
app.get('/statements/:userId/generate', Controllers.Statement.generatePdfStatement);

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => console.log('App running on port', PORT));
