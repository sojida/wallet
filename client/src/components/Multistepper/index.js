import React from 'react';
import RandomString from 'randomstring';

import CheckIcon from '../../assets/check.svg';

const EmptyState = () => {
  return (
    <React.Fragment>No Content</React.Fragment>
  )
}

export default function MultistepForm(props) {
  const { steps = [EmptyState] } = props
  const [step, changeStep] = React.useState(0);
  const [currentView, changeCurrentView] = React.useState({component: steps[step]});

  const next = () => {
    const newStep = step + 1;
    if (newStep < steps.length) {
      changeStep(newStep);
      changeCurrentView({component: steps[newStep]});
    }
  };

  const previous = () => {
    const newStep = step - 1;
    if (newStep >= 0) {
      changeStep(newStep);
      changeCurrentView({component: steps[newStep]});
    }
  };

  return (
    <div className="multi-step-form">
      <div className="slide-header">
        <div className="slide-items">
          {steps.map((item, idx) => {
            if (idx !== 0) {
              return (
                <div key={RandomString.generate(5)} className="progess-item">
                  <div
                    className={
                      step >= idx
                        ? 'slide-progress active-step'
                        : 'slide-progress'
                    }
                  />
                  <div
                    className={
                      step >= idx
                        ? `slide-header-item active-step`
                        : 'slide-header-item'
                    }
                  >
                    <img src={CheckIcon} alt="multiform-icon" />
                  </div>
                </div>
              );
            }

            return (
              <div
                key={RandomString.generate(5)}
                className={
                  step >= idx
                    ? `slide-header-item active-step`
                    : 'slide-header-item'
                }
              >
                  <img src={CheckIcon} alt="multiform-icon" />
              </div>
            );
          })}
        </div>
      </div>
      <div className="slide-container">
        <div className="slide-content">
          <currentView.component
            next={next}
            previous={previous}
            {...props}
          />
        </div>
      </div>
      <style jsx="true">
        {`
          .multi-step-form {
            width: 100%;
            display: grid;
            grid-template-rows: 50px 3fr;
            align-self: start;
          }
          .slide-container {
            display: flex;
          }

          .slide-content {
            width: 100%;
            margin: 5px;
          }

          .slide-header {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: 1fr;
            width: 100%;
            align-items: center;
            justify-items: center;
          }

          .slide-header-item {
            height: 30px;
            width: 30px;
            border-radius: 50%;
            background: lightgrey;
            display: grid;
            place-items: center;
            transition: all 0.5s;
          }

          .slide-items {
            display: flex;
            grid-column: 1/-1;
            grid-row: 1/-1;
            width: 60%;
            margin-bottom: 20px;
          }

          .slide-progress {
            background: lightgrey;
            transition: all 0.5s;
            width: 100%;
            grid-column: 1/-1;
            grid-row: 1/-1;
            height: 5px;
          }

          .active-step {
            background: green;
            transition: all 0.5s;
          }

          .progess-item {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50%;
          }
        `}
      </style>
    </div>
  );
}
