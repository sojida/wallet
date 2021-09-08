import React from 'react';
import { toast } from 'react-toastify';
import { Input, Button, Form } from 'semantic-ui-react'

const StepTwo = ({ next, previous, formValues, updateFormValues, skip }) => {
    const submit = async (e) => {
        e.preventDefault()

        const resp = await fetch(`/users/${formValues.id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ bvn: formValues.bvn}) 
        }).then(res => res.json())
    
        if (resp.status) {
            localStorage.setItem('user', JSON.stringify(resp.user));
            next()
            toast.success(resp.message, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
        } else {
          toast.error(resp.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
    }


 const handleChange = ({ target }) => {
		updateFormValues((formValues) => ({
			...formValues,
			[target.name]: target.value,
		}));
	};

    return (
      <div className="step-two">
          <h4>Bvn Details</h4>
          <Form onSubmit={submit}>
            <div className="input">
              <Input onChange={handleChange} value={formValues.bvn} placeholder="bvn" name="bvn" />
            </div>
          <div className="btn-grp">
            <Button color="" onClick={previous} type="button">Go Back</Button>
            <Button color="green" type="submit">Next</Button>
            <Button color="blue" onClick={skip} type="button">Dashboard</Button>
          </div>
          </Form>
          <style jsx="true">
        {`
          .step-two {
            display: grid;
            width: 100%;
          }

          h4{
            text-align: center;
          }

          .input {
            margin: 10px 0;
            width: 100%;
          }

          .btn-grp{
            width: 100%;
            display: flex;
            justify-content: space-between;
          }
        `}
      </style>
      </div>
    )
  }

export default StepTwo;