import React from 'react';
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
                next()
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
            <Button type="submit"color='green'>Next</Button>
          </Form>
          <style jsx="true">
        {`
          .step-one {
            display: grid;
            place-items: center;
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
