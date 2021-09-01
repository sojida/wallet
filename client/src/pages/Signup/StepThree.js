import React from 'react';
import { withRouter } from 'react-router-dom';

const StepThree = ({ next, previous, formValues, updateFormValues, history }) => {
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
        <div>
          <input onChange={handleChange} value={formValues.address} placeholder="address" name="address" />
        </div>
        <div>
          <input onChange={handleChange} value={formValues.city} placeholder="city" name="city" />
        </div>
      <button type="submit">Next</button>
      <button type="button">Skip</button>
      <button onClick={previous} type="button">Previous</button>
      </form>
      <style jsx="true">
    {`
      .step-three {
        display: grid;
        place-items: center;
      }
    `}
  </style>
  </div>
)
  }

export default withRouter(StepThree);