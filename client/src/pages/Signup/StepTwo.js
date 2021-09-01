import React from 'react';

const StepTwo = ({ next, previous, formValues, updateFormValues }) => {
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
            <div>
              <input onChange={handleChange} value={formValues.bvn} placeholder="bvn" name="bvn" />
            </div>
          <button type="submit">Next</button>
          <button type="button">Skip</button>
          <button onClick={previous} type="button">Previous</button>
          </form>
          <style jsx="true">
        {`
          .step-two {
            display: grid;
            place-items: center;
          }
        `}
      </style>
      </div>
    )
  }

export default StepTwo;