const express = require('express');
const RateLimiting = require('express-rate-limit');
const Controllers = require('./Controllers');

const PORT = 3000;

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

app.post('/users', Controllers.User.CreateUser);
app.get('/users/:id', Controllers.User.GetUser);
app.patch('/users/:id', Controllers.User.UpdateUser);
app.get('/users/:id/wallet', Controllers.User.GetUserWallet);
app.post('/transactions/:walletId', Controllers.Transaction.createTransaction);
app.get('/statements/:walletId', Controllers.Statement.getStatement);

app.listen(PORT, () => console.log('App running on port', PORT));
