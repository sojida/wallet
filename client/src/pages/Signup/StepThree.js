import React from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Button } from 'semantic-ui-react'


const StepThree = ({ next, previous, formValues, updateFormValues, history, skip }) => {
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
        history.push('/dashboard');
    }
}


const handleChange = ({ target }) => {
updateFormValues((formValues) => ({
  ...formValues,
  [target.name]: target.value,
}));
};

return (
  <div className="step-three">
      <form onSubmit={submit}>
        <div className="input">
          <Input onChange={handleChange} value={formValues.address} placeholder="address" name="address" />
        </div>
        <div className="input">
          <Input onChange={handleChange} value={formValues.city} placeholder="city" name="city" />
        </div>

        <Button color="green" type="submit">Next</Button>
        <Button color="blue" onClick={skip} type="button">Skip</Button>
        <Button color="" onClick={previous} type="button">Previous</Button>
      </form>
      <style jsx="true">
    {`
      .step-three {
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

export default withRouter(StepThree);