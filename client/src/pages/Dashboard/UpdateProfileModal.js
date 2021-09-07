import React from "react";
import { toast } from 'react-toastify';
import { Image, Button, Modal, Header, Form } from 'semantic-ui-react';


function UpdateProfileModal({ open, onClose, onOpen, user, setUser }) {

  const initialState = {
    username: user?.username,
    email: user?.email,
    bvn: user?.bvn,
    address: user?.address,
    city: user?.city,
  }

  const [formValues, updateFormValues] = React.useState(initialState);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    updateFormValues(user)
  }, [user])

  const handleChange = ({ target }) => {
		updateFormValues((formValues) => ({
			...formValues,
			[target.name]: target.value,
		}));
	};

  const submit = async () => {
    setLoading(true);
    const resp = await fetch(`/users/${user.id}`, {
      method: 'put',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ bvn: formValues.bvn || user.bvn, address: formValues.address || user.address, city: formValues.city || user.city }) 
    }).then(res => res.json())

    if (resp.status) {
      localStorage.setItem('user', JSON.stringify(resp.user));
      setUser(resp.user);
      onClose()
      toast.success(resp.message || 'Successful action', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
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

    setLoading(false);

  }

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
            <Form.Input onChange={handleChange} disabled placeholder="username" name="username" value={formValues?.username} />
            <Form.Input onChange={handleChange} disabled placeholder="email" name="email" value={formValues?.email} />
            <Form.Input onChange={handleChange} placeholder="bvn" name="bvn" value={formValues?.bvn} />
            <Form.Input onChange={handleChange} placeholder="address" name="address" value={formValues?.address} />
            <Form.Input onChange={handleChange} placeholder="city" name="city" value={formValues?.city} />
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
          onClick={submit}
          loading={loading}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default UpdateProfileModal;
