import React from "react";
import { withRouter } from 'react-router-dom';
import Applayout from "../../components/Layouts/Applayout";
import { Card, Icon, Table, Button, Header } from 'semantic-ui-react';

// components
import UpdateProfileModal from './UpdateProfileModal';
import TransactionModal from "./TransactionModal";


function Dashboard({ history }) {
  const [open, setOpen] = React.useState(false);
  const [openTransactionModal, setOpenTransactionModal] = React.useState(false);

  const [user, setUser] = React.useState(null);


  React.useEffect(() => {
    const _user = localStorage.getItem('user');
    if(_user) {
      setUser(JSON.parse(_user))
    } else {
      history.push('/')
    }
  }, [])

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
          ₦ 0.00
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
            <Table.HeaderCell>Type</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>
              First
            </Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='3'>
              <Button>Generate Account Statement</Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>

    </div>
    </Applayout>
  );
}

export default withRouter(Dashboard);
