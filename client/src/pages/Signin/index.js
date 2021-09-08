import React from "react";
import { withRouter, Link } from "react-router-dom" 
import { toast } from 'react-toastify';
import { Button, Form } from 'semantic-ui-react'
import { TopNav } from '../../components/Layouts/Applayout'


const initialState = {
	username: '',
	password: ''
};


function Signin({ history }) {
  const [formValues, updateFormValues] = React.useState(initialState)

  React.useState(() => {
    const user = localStorage.getItem('user');

    if (user) {
      history.push('/dashboard')
    }
  }, [])

  const submit = async (e) => {
    e.preventDefault()

    if (!formValues.id) {
        const resp = await fetch('/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formValues) 
        }).then(res => res.json())
    
        if (resp.status) {
            localStorage.setItem('user', JSON.stringify(resp.user));
            history.push('/dashboard')
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
    } else {
        next()
    }
  }

  const handleChange = ({ target }) => {
		updateFormValues((formValues) => ({
			...formValues,
			[target.name]: target.value,
		}));
	};

  return (
    <>
    <TopNav auth />
    <div className="signin">
       <Form className="form-container" onSubmit={submit} >
         <h3>Login</h3>
            <div className="input">
              <Form.Input onChange={handleChange} value={formValues.username} placeholder="username" name="username" />
            </div>
            <div className="input">
              <Form.Input onChange={handleChange} value={formValues.password} placeholder="password" type="password" name="password" />
            </div>
            <Button type="submit"color='green'>Login</Button>
            <p>Don't have an account? <Link to="/signup">Signup</Link></p>
          </Form>
          <style jsx="true">
            {`
              .signin {
                display: grid;
                height: 88vh;
                place-items: center;
              }

              .input {
                margin: 10px 0;
                width: 100%;
              }

              .form-container {
                display: grid;
                place-items: center;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                width: 500px;
                padding: 50px;
                border: 1px solid lightgreen;
              }
              
            `}
          </style>
    </div>
    </>
  );
}

export default withRouter(Signin);
