import React from 'react';
import { toast } from 'react-toastify';
import { Input, Button, Form } from 'semantic-ui-react'

const StepOne = ({ next, formValues, updateFormValues }) => {

    const submit = async (e) => {
        e.preventDefault()

        if (!formValues.id) {
            const resp = await fetch('/users', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formValues) 
            }).then(res => res.json())
        
            if (resp.status) {
                updateFormValues((formValues) => ({
                    ...formValues,
                    id: resp.user.id,
                }));
                localStorage.setItem('user', JSON.stringify(resp.user));
                toast.success('Sign up successful! You can provide other details or skip to dashboard', {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
                next()
            } else {
              toast.error('Please fill form correctly', {
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
      <div className="step-one">
          <h4>Personal Details</h4>
          <Form onSubmit={submit} className="">
            <div className="input">
              <Form.Input onChange={handleChange} value={formValues.username} placeholder="username" name="username" />
            </div>
            <div className="input">
              <Form.Input onChange={handleChange} value={formValues.email} placeholder="email" name="email" />
            </div>
            <div className="input">
              <Form.Input onChange={handleChange} value={formValues.password} placeholder="password" type="password" name="password" />
            </div>
            <Button type="submit"color='green'>Sign Up</Button>
          </Form>
          <style jsx="true">
        {`
          .step-one {
            display: grid;
            width: 100%;
          }

          h4{
            text-align: center;
          }

          .input {
            margin: 10px 0;
          }
        `}
      </style>
      </div>
    )
  }

export default StepOne;
