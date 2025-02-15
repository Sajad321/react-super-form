import { useState } from "react";
import { MultiStepView } from "../../components/MultiStepForm";
import { SteppedFormConfig, FormStep, FormField } from "../types";

export function SteppedForm({
  config,
  onSubmit,
}: {
  config: SteppedFormConfig;
  onSubmit: (values: Record<string, any>) => void;
}) {
  const steps = config.map((step) => ({
    title: `Step ${step.step}`,
    content: (
      <div>
        {step.fields.map((field) => (
          <div key={field.name}>
            <label>{field.label}</label>
            <input type={field.type} name={field.name} />
          </div>
        ))}
      </div>
    ),
  }));

  const [currentStep, setCurrentStep] = useState(0);

  return (
    <MultiStepView
      steps={steps}
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
      isFirstStep={currentStep === 0}
      isLastStep={currentStep === steps.length - 1}
      submitStepIndex={steps.length}
      onSubmit={() => {
        const formData = new FormData(
          document.querySelector("form") as HTMLFormElement
        );
        const values = Object.fromEntries(formData.entries());
        onSubmit(values);
      }}
      onNext={() => setCurrentStep((prev) => prev + 1)}
      onPrevious={() => setCurrentStep((prev) => prev - 1)}
      disabled={false}
      isSubmitting={false}
    />
  );
}
