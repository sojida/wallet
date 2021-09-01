import React from "react";

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

function Signup() {
  const [formValues, updateFormValues] = React.useState(initialState)

  return (
    <div className="Signup">
      <header className="Signup-header">
        <p>Signup Page</p>
        <MultistepForm
          steps={[StepOne, StepTwo, StepThree]}
          formValues={formValues}
          updateFormValues={updateFormValues}
        />
      </header>
    </div>
  );
}

export default Signup;
