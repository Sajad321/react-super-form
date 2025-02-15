import { Step } from "./MultiStepForm";

type MultiStepViewProgressBarProps = {
  currentStep: number;
  steps: Step[];
  onNext: () => void;
  onPrevious: () => void;
  submitStepIndex: number;
  onSubmit: () => void;
  setCurrentStep: (step: number) => void;
  submitPaymentStepIndex?: number;
  disabled?: boolean;
};

export function MultiStepViewProgressBar(props: MultiStepViewProgressBarProps) {
  const currentStep = props.steps[props.currentStep];
  const progressPercentage =
    ((props.currentStep + 1) / props.steps.length) * 100;
  const circleRadius = 20;
  const circumference = 2 * Math.PI * circleRadius;

  return (
    <div className="w-full flex flex-col justify-center items-center h-full">
      <div className="w-full text-center">
        <div className="w-full px-6 py-4 bg-blue-50 border border-new-primary rounded-lg text-new-primary flex items-center gap-4">
          <div className="relative w-12 h-12">
            <svg className="w-full h-full" viewBox="0 0 50 50">
              <circle
                className="text-new-primary/20"
                stroke="currentColor"
                strokeWidth="4"
                fill="transparent"
                r={circleRadius}
                cx="25"
                cy="25"
              />
              <circle
                className="text-new-primary"
                stroke="currentColor"
                strokeWidth="4"
                fill="transparent"
                r={circleRadius}
                cx="25"
                cy="25"
                strokeDasharray={circumference}
                strokeDashoffset={
                  circumference - (progressPercentage / 100) * circumference
                }
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-medium">
                {props.currentStep + 1}/{props.steps.length}
              </span>
            </div>
          </div>
          <div className="text-right font-medium">{currentStep.title}</div>
        </div>
      </div>
    </div>
  );
}
