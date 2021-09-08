import React from "react";
import { withRouter } from 'react-router-dom';
import Applayout from "../../components/Layouts/Applayout";
import { Card, Icon, Table, Button, Header } from 'semantic-ui-react';

// components
import UpdateProfileModal from './UpdateProfileModal';
import TransactionModal from "./TransactionModal";

const mockTransactions = [{
  id: 'h1VnZ',
  amount: -20000,
  description: 'money things',
  walletId: 'OnV0F',
  timestamp: '2021-09-08T14:40:53.009Z',
}]


function Dashboard({ history }) {
  const [open, setOpen] = React.useState(false);
  const [openTransactionModal, setOpenTransactionModal] = React.useState(false);
  const [wallet, setWallet] = React.useState(null);
  const [transactions, setTransactions] = React.useState([])
  const [user, setUser] = React.useState(null);

  const updateWallet = async ({ id }) => {
    const resp = await fetch(`/users/${id}/wallet`).then(res => res.json())

    if (resp.status) {
      setWallet(resp.wallet)
    }
  }

  const updateTransactions = async ({ id }) => {
    const resp = await fetch(`/statements/${id}`).then(res => res.json());

    if (resp.status) {
      setTransactions(resp.transactions)
    }
  }

  const downloadPdf = async ({ id }) => {
    await fetch(`/statements/${id}/generate`).then(res => res.blob())
    .then( blob => {
      var file = window.URL.createObjectURL(blob);
      window.open(file, '_blank');
    });;
  }


  React.useEffect(async () => {
    let _user = localStorage.getItem('user');

    if(_user) {
      _user = JSON.parse(_user)
      setUser(_user);
      updateWallet({ id: _user.id })
      updateTransactions({ id: _user.id })
    } else {
      history.push('/')
    }
  }, [])

  const headers = ['id', 'amount', 'description', 'timestamp']

  return (
    <Applayout>
    <div className="Dashboard">
      <header className="Dashboard-header"> </header>
      <UpdateProfileModal 
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        user={user}
        setUser={setUser}
      />

      <TransactionModal 
        open={openTransactionModal}
        onClose={() => setOpenTransactionModal(false)}
        onOpen={() => setOpenTransactionModal(true)}
        user={user}
        updateWallet={updateWallet}
        updateTransactions={updateTransactions}
      />

      <Card.Group itemsPerRow={2}>
      <Card>
        <Card.Content>
          <Card.Header>{user?.username || ''}</Card.Header>
          <Card.Meta>
            <span className='date'>{user?.email}</span>
          </Card.Meta>
          <Card.Meta>
            <span className='date'>{user?.bvn}</span>
          </Card.Meta>
          <Card.Description>
            <span>{user?.state} <Icon name='check'/></span>
          </Card.Description>
         
        </Card.Content>
        <Card.Content extra>
        <Button onClick={() => setOpen(true)}>
            Edit Profile
          </Button>
        </Card.Content>
      </Card>

      <Card>
        <Card.Content>
          <Card.Header>Wallet</Card.Header>
          <Card.Meta>Balance</Card.Meta>
          <h2>
          ₦ {Number(wallet?.balance / 100 || 0).toFixed(2)}
          </h2>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button onClick={() => setOpenTransactionModal(true)} basic color='green'>
              Send Money
            </Button>
          </div>
        </Card.Content>
      </Card>
      </Card.Group>

      <Header as='h3'>Transactions</Header>

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>id</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Timestamp</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {transactions.length ? transactions.map(trx => {
            return (
              <Table.Row>
                {headers.map(key => {
                  if (key === 'amount') {
                    return (<Table.Cell>{Number(trx[key]/100).toFixed(2)}</Table.Cell>)
                  }
                 return (<Table.Cell>{trx[key]}</Table.Cell>)
                })}
            </Table.Row>
            )
          }) : 
          <Table.Row>
            <Table.Cell>No transactions</Table.Cell>
          </Table.Row>}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='4'>
              <Button onClick={() => downloadPdf({ id: user.id })}>Generate Account Statement</Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>

    </div>
    </Applayout>
  );
}

export default withRouter(Dashboard);
