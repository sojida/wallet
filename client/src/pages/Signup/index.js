import React from "react";
import { withRouter, Link } from "react-router-dom" 


// components
import MultistepForm from "../../components/Multistepper";

// Steps
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";


const initialState = {
  id: null,
	username: '',
	email: '',
	password: '',
  bvn: '',
  address: '',
  city: ''
};

function Signup({ history }) {
  const [formValues, updateFormValues] = React.useState(initialState)

  React.useState(() => {
    const user = localStorage.getItem('user');

    if (user) {
      updateFormValues(JSON.parse(user))
    }
  }, [])

  const skip = () => {
    history.push('/dashboard')
  }

  return (
    <div className="signup">
      <div className="signup-container">
        <h1>Sign up</h1>
        <MultistepForm
          steps={[StepOne, StepTwo, StepThree]}
          formValues={formValues}
          updateFormValues={updateFormValues}
          skip={skip}
        />
        <p>Already have an account? <Link to="/">Login</Link></p>
      </div>
      <style jsx="true">
            {`
              .signup {
                display: grid;
                height: 100vh;
                place-items: center;
              }


              .signup-container {
                display: grid;
                place-items: center;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                width: 400px;
                padding: 50px;
                border: 1px solid lightgreen;
              }
              
            `}
          </style>
    </div>
  );
}

export default withRouter(Signup);
