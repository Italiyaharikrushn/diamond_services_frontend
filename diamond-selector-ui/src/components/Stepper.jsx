import React from "react";
import { Link, useLocation } from "react-router-dom";

const Stepper = ({ steps, currentStep, completedSteps }) => {
    const { pathname } = useLocation();


    return (
        <div className="stepper-container">
            {steps.map((step, index) => {
                const stepNumber = index + 1;
                // const isActive = currentStep === stepNumber;
                // const isDone = completedSteps.includes(stepNumber);
                // const isLocked =
                //     stepNumber === 3 &&
                //     (!completedSteps.includes(1) || !completedSteps.includes(2));

                const isActive = pathname.includes(step.link)

                return (
                    // <div
                    // >
                    <Link to={step.link}
                        key={stepNumber}
                        className={`stepper-item ${isActive ? "active-step" : ""}`}
                    // onClick={() => onStepClick(stepNumber)}
                    // style={{ cursor: "pointer", opacity: isLocked ? 0.5 : 1 }}
                    >
                        <div className="step-left">
                            <span
                                className={`step-number ${isActive ? "active-text" : " inactive-text "
                                    }`}
                            >
                                {stepNumber}
                            </span>

                            <div className={`step-info ${isActive ? "active-text" : " inactive-text "}`}>
                                <h3>{step.title}</h3>
                                <p>{step.subtitle}</p>
                            </div>
                        </div>

                        <div
                            className={`step-icon ${isActive ? "icon-active" : "icon-inactive"
                                }`}
                        >
                            {step.icon}
                        </div>
                    </Link>
                    // </div>
                );
            })}
        </div >
    );
};

export default Stepper;
