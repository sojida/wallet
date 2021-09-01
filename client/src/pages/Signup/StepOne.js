import React from 'react';

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
          <form onSubmit={submit} className="">
            <div>
              <input onChange={handleChange} value={formValues.username} placeholder="username" name="username" />
            </div>
            <div>
              <input onChange={handleChange} value={formValues.email} placeholder="email" name="email" />
            </div>
            <div>
              <input onChange={handleChange} value={formValues.password} placeholder="password" type="password" name="password" />
            </div>
          <button type="submit">Next</button>
          </form>
          <style jsx="true">
        {`
          .step-one {
            display: grid;
            place-items: center;
          }
        `}
      </style>
      </div>
    )
  }

export default StepOne;
