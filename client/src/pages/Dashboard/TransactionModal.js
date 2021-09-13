import React from "react";
import { toast } from 'react-toastify';
import { Button, Modal, Header, Form, Dropdown } from 'semantic-ui-react';


function TransactionModal({ open, onClose, onOpen, user, updateWallet, updateTransactions, transactionAction }) {
  const [value, setValue] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState(null);
  const [users, setUsers] = React.useState([]);
  const [isFetching, setIsFetching] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [amount, setAmount] = React.useState(0);
  const [description, setDescription] = React.useState('');

  React.useEffect(async () => {
    setIsFetching(true);
    const resp = await fetch('/users').then(res => res.json());

    if (resp.status) {
      setUsers(resp.users.map(usr => ({ key: usr.id, text: usr.username, value: usr.id })));
    }
    setIsFetching(false);
  }, [open])
  
    let state = {
        isFetching: false,
        multiple: false,
        search: true,
        searchQuery: null,
        value: '',
        options: [],
    }

    const handleChange = (e, { value }) => setValue(value)
    const handleSearchChange = (e, { searchQuery }) => setSearchQuery({ searchQuery })


  const createTransaction = async () => {
    setIsLoading(true)
  
    const resp = await fetch(`/transactions/${user.id}`, {
      method: 'post',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: transactionAction === 'debit' ? -Number(amount) * 100 : Number(amount) * 100, description, receiverId: value }) 
    }).then(res => res.json())

    if (resp.status) {
      toast.success(resp.message || 'Successful action', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      updateWallet({ id: user.id });
      updateTransactions({ id: user.id })
      onClose();
    } else {
      toast.error(resp.message || 'Something went wrong!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }

    setIsLoading(false)
  }


  return (
    <div>
    <Modal
      onClose={onClose}
      onOpen={onOpen}
      open={open}
    >
      <Modal.Header>{transactionAction === 'debit' ? 'Debit wallet' :'Credit Wallet'}</Modal.Header>
      <Modal.Content >
        <Modal.Description>
          <Header>Wallet Transaction</Header>
          <Form>
          {/* <Dropdown
                fluid
                selection
                multiple={state.multiple}
                search={state.search}
                options={users.filter(u => u.key !== user.id)}
                value={value}
                placeholder='username'
                onChange={handleChange}
                onSearchChange={handleSearchChange}
                disabled={isFetching}
                loading={isFetching}
            /> */}
            <div> &nbsp; </div>
            <Form.Input onChange={({ target }) => setAmount(target.value)} type="number"  placeholder="amount" name="amount" />
            <Form.Input onChange={({ target }) => setDescription(target.value)} placeholder="description" name="description" />
          </Form>

        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={onClose}>
          Cancel
        </Button>
        <Button
          content={transactionAction === 'debit' ? 'Debit' : 'Credit'}
          labelPosition='right'
          icon='checkmark'
          onClick={createTransaction}
          positive
          loading={isLoading}
        />
      </Modal.Actions>
    </Modal>
    </div>
  )
}

export default TransactionModal;
