import React from "react";
import Applayout from "../../components/Layouts/Applayout";
import { Card, Icon, Image, Label, Menu, Table, Button, Modal, Header, Input, Form } from 'semantic-ui-react';


function UpdateProfileModal({ open, onClose, onOpen }) {

  return (
    <Modal
      onClose={onClose}
      onOpen={onOpen}
      open={open}
    >
      <Modal.Header>Edit Your Profile</Modal.Header>
      <Modal.Content image>
        <Image size='medium' src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped />
        <Modal.Description>
          <Header>Edit Profile</Header>
          <Form>
            <Form.Input disabled placeholder="username" name="username" />
            <Form.Input disabled placeholder="email" name="email" />
            <Form.Input placeholder="bvn" name="bvn" />
            <Form.Input placeholder="password" type="password" name="password" />
            <Form.Input placeholder="address" name="address" />
            <Form.Input placeholder="city" name="city" />
          </Form>

        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={onClose}>
          Exit
        </Button>
        <Button
          content="Edit Profile"
          labelPosition='right'
          icon='checkmark'
          onClick={onClose}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default UpdateProfileModal;
