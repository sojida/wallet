import React from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Button } from 'semantic-ui-react'


const StepThree = ({ previous, formValues, updateFormValues, history, skip }) => {
  const submit = async (e) => {
    e.preventDefault()

    const resp = await fetch(`/users/${formValues.id}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ address: formValues.address, city: formValues.city }) 
    }).then(res => res.json())

    if (resp.status) {
        localStorage.setItem('user', JSON.stringify(resp.user));
        history.push('/dashboard');
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
  <div className="step-three">
      <h4>Contact Details</h4>
      <form onSubmit={submit}>
        <div className="input">
          <Input onChange={handleChange} value={formValues.address} placeholder="address" name="address" />
        </div>
        <div className="input">
          <Input onChange={handleChange} value={formValues.city} placeholder="city" name="city" />
        </div>

        <div className="btn-grp">
          <Button color="" onClick={previous} type="button">Previous</Button>
          <Button color="green" type="submit">Next</Button>
          <Button color="blue" onClick={skip} type="button">Dashboard</Button>
        </div>
      </form>
      <style jsx="true">
    {`
      .step-three {
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

export default withRouter(StepThree);