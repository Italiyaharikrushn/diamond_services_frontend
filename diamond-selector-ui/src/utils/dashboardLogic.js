
export const getDisplaySteps = (baseSteps, isSwapped) => {
    return isSwapped
     ? [baseSteps[1], baseSteps[0], baseSteps[2]]
     : baseSteps;
};

export const handleStepClickLogic = ({ stepNumber, currentStep, completedSteps, displaySteps, isSwapped, setCurrentStep, setIsSwapped, }) => {
    if (stepNumber === 3) {
        const isStep1Done = completedSteps.includes(1);
        const isStep2Done = completedSteps.includes(2);

        if (!isStep1Done || !isStep2Done) {
            alert("Please complete Step 1 & Step 2 first");
            return;
        }
        setCurrentStep(3);
        return;
    }

    if (completedSteps.includes(1)) {
        setCurrentStep(stepNumber);
        return;
    }

    if (stepNumber !== currentStep) {
        const targetStepId = displaySteps[stepNumber - 1].id;

        if (!completedSteps.includes(targetStepId)) {
            setIsSwapped(!isSwapped);
            setCurrentStep(1);
        } else {
            setCurrentStep(stepNumber);
        }
    }
};

export const completeStepLogic = (currentStep, completedSteps, setCompletedSteps) => {
    if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
    }
};

export const resetStepsLogic = (setCurrentStep, setCompletedSteps, setIsSwapped) => {
    setCurrentStep(1);
    setCompletedSteps([]);
    setIsSwapped(false);
};
