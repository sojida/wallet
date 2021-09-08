import React from "react";
import { withRouter, Link } from "react-router-dom" 


// components
import MultistepForm from "../../components/Multistepper";
import { TopNav } from '../../components/Layouts/Applayout'

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
    <>
    <TopNav auth />
    <div className="signup">
      <div className="signup-container">
        <h3>Sign up</h3>
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
                place-items: center;
                height: 88vh;
              }

              .signup-container {
                display: grid;
                place-items: center;
                grid-template-rows: 1fr 3fr 1fr;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                width: 500px;
                height: 600px;
                padding: 50px;
                border: 1px solid lightgreen;
              }
              
            `}
          </style>
    </div>
    </>
  );
}

export default withRouter(Signup);
