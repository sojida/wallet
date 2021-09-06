import React from 'react';
import { Input, Button } from 'semantic-ui-react'

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
          <form onSubmit={submit}>
            <div className="input">
              <Input onChange={handleChange} value={formValues.bvn} placeholder="bvn" name="bvn" />
            </div>
          <Button color="green" type="submit">Next</Button>
          <Button color="blue" onClick={skip} type="button">Skip</Button>
          <Button color="" onClick={previous} type="button">Previous</Button>
          </form>
          <style jsx="true">
        {`
          .step-two {
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

export default StepTwo;