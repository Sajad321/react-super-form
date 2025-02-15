import { MultiStepViewProgressBar } from "./MultiStepViewProgressBar";

export type Step = {
  title: string;
  content: React.ReactNode;
};

type MultiStepViewProps = {
  steps: Step[];
  onSubmit: () => void;
  onSubmitPayment?: () => void;
  onPrevious: () => void;
  onNext: () => void;
  currentStep: number;
  isLastStep: boolean;
  isFirstStep: boolean;
  disabled: boolean;
  submitStepIndex: number;
  submitPaymentStepIndex?: number;
  onFinished?: () => void;
  isSubmitting: boolean;
  stepHeader?: React.ReactNode;
  setCurrentStep: (step: number) => void;
  hideFinishButton?: boolean;
  isLoading?: boolean;
  widthClassName?: string;
  ButtonComponent?: React.ComponentType<any>;
  LoaderComponent?: React.ComponentType<any>;
  translations?: {
    paymentLoading: string;
    backward: string;
    continue: string;
    finish: string;
  };
  direction?: "ltr" | "rtl";
};

export function MultiStepView(props: MultiStepViewProps) {
  const {
    ButtonComponent = DefaultButton,
    LoaderComponent = DefaultLoader,
    translations = {
      paymentLoading: props.translations?.paymentLoading || "Loading...",
      backward: props.translations?.backward || "Back",
      continue: props.translations?.continue || "Continue",
      finish: props.translations?.finish || "Finish",
    },
    direction = "ltr",
  } = props;

  return (
    <div
      className={`container mx-auto mt-0 p-4 text-center ${props.widthClassName}`}
      dir={direction}
    >
      {props.isLoading ? (
        <div className="w-full h-full flex justify-center items-center flex-col">
          <LoaderComponent />
          <h1 className="text-3xl my-8 font-bold">
            {translations.paymentLoading}
          </h1>
        </div>
      ) : (
        <div className="flex flex-col gap-2 justify-center w-full h-full rounded pt-2 pb-8 mb-4">
          {props.steps.length > 1 && (
            <>
              <div className="w-full mb-4">
                <MultiStepViewProgressBar
                  currentStep={props.currentStep}
                  steps={props.steps}
                  onNext={props.onNext}
                  onPrevious={props.onPrevious}
                  submitStepIndex={props.submitStepIndex}
                  onSubmit={props.onSubmit}
                  setCurrentStep={props.setCurrentStep}
                  submitPaymentStepIndex={props.submitPaymentStepIndex}
                  disabled={props.disabled}
                />
              </div>
              {props.stepHeader}
            </>
          )}
          <div className="mb-4 w-full">
            {props.steps[props.currentStep].content}
          </div>
          {!props.isLastStep && (
            <div className="flex gap-2">
              {!props.isFirstStep && (
                <ButtonComponent
                  disabled={
                    props.isFirstStep ||
                    props.isSubmitting ||
                    !(props.currentStep - 1 < props.submitStepIndex) ||
                    (props.submitPaymentStepIndex
                      ? !(
                          props.currentStep - 1 <
                          props.submitPaymentStepIndex - 1
                        )
                      : false)
                  }
                  onClick={() => {
                    const isBeforeSubmitStep =
                      props.currentStep - 1 < props.submitStepIndex;
                    const isBeforeSubmitPaymentStep =
                      props.submitPaymentStepIndex
                        ? props.currentStep - 1 <
                          props.submitPaymentStepIndex - 1
                        : true;
                    console.log(props.currentStep - 1);

                    if (
                      (isBeforeSubmitStep && isBeforeSubmitPaymentStep) ||
                      !props.disabled
                    ) {
                      props.setCurrentStep(props.currentStep - 1);
                    }
                  }}
                >
                  {translations.backward}
                </ButtonComponent>
              )}

              <ButtonComponent
                disabled={props.disabled || props.isSubmitting}
                onClick={() => {
                  if (props.currentStep + 1 == props.submitStepIndex) {
                    props.onSubmit();
                    return;
                  }
                  if (
                    props.submitPaymentStepIndex &&
                    props.currentStep + 1 == props.submitPaymentStepIndex
                  ) {
                    props.onSubmitPayment && props.onSubmitPayment();
                    return;
                  }
                  props.onNext();
                }}
              >
                {props.isSubmitting ? (
                  <LoaderComponent />
                ) : (
                  translations.continue
                )}
              </ButtonComponent>
            </div>
          )}

          {props.isLastStep && !props.hideFinishButton && (
            <ButtonComponent
              onClick={props.onFinished ? props.onFinished : console.log}
            >
              {translations.finish}
            </ButtonComponent>
          )}
        </div>
      )}
    </div>
  );
}

const DefaultButton = ({ children, ...props }: any) => (
  <button
    {...props}
    className="rounded-full w-full bg-[#1E95D4] text-white hover:bg-[#3E7AA6] disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#1E95D4] disabled:hover:bg-[#3E7AA6] disabled:text-white"
  >
    {children}
  </button>
);

const DefaultLoader = () => (
  <div className="animate-spin w-48 h-48">
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z" />
      <path d="M12 4a8 8 0 018 8h-2a6 6 0 00-6-6V4z" />
    </svg>
  </div>
);
