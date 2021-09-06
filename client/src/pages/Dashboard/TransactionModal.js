import React from "react";
import { Image, Button, Modal, Header, Form, Dropdown } from 'semantic-ui-react';


function TransactionModal({ open, onClose, onOpen }) {
    let state = {
        isFetching: false,
        multiple: false,
        search: true,
        searchQuery: null,
        value: '',
        options: [],
    }

    const [value, setValue] = React.useState('');
    const [searchQuery, setSearchQuery] = React.useState(null);
    
    const handleChange = (e, { value }) => setValue({ value })
    const handleSearchChange = (e, { searchQuery }) => setSearchQuery({ searchQuery })

  return (
    <Modal
      onClose={onClose}
      onOpen={onOpen}
      open={open}
    >
      <Modal.Header>Send Money</Modal.Header>
      <Modal.Content >
        <Modal.Description>
          <Header>Create Transaction</Header>
          <Form>
          <Dropdown
                fluid
                selection
                multiple={state.multiple}
                search={state.search}
                options={state.options}
                value={value}
                placeholder='username'
                onChange={handleChange}
                onSearchChange={handleSearchChange}
                disabled={state.isFetching}
                loading={state.isFetching}
            />
            <Form.Input placeholder="amount" name="amount" />
          </Form>

        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={onClose}>
          Cancel
        </Button>
        <Button
          content="Transfer"
          labelPosition='right'
          icon='checkmark'
          onClick={onClose}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default TransactionModal;
