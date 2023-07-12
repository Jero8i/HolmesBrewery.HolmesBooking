import React from "react";
import WelcomeStep from "./steps/WelcomeStep";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";
import Step5 from "./steps/Step5";
import { Customer, Reservation, Service } from "../types";
import Step6 from "./steps/Step6";

interface RenderStepContentProps {
  activeStep: number;
  reservation: Reservation;
  handleNext: () => void;
  handlePrev: () => void;
  handleChangeStep1: (numberDiners: number) => void;
  handleChangeStep2: (date: string) => void;
  handleChangeStep3: (service: Service) => void;
  handleChangeStep4: (scheduleTime: string) => void;
  handleChangeStep5: (customer: Customer) => void;
  handleSubmit: () => void;

  activeOption: number;
  chooseOption: (n: number) => void;
  goBack: () => void;
}

export const RenderStepContent: React.FC<RenderStepContentProps> = ({
  activeStep,
  reservation,
  handleNext,
  handlePrev,
  handleChangeStep1,
  handleChangeStep2,
  handleChangeStep3,
  handleChangeStep4,
  handleChangeStep5,
  handleSubmit,

  activeOption,
  chooseOption,
  goBack
}) => {
  switch (activeStep) {
    case -1:
      return <WelcomeStep onNext={handleNext} />;
    case 0:
      return (
        <Step1
          numberDiners={reservation.numberDiners}
          onPrev={handlePrev}
          onNext={handleNext}
          onChange={handleChangeStep1}
        />
      );
    case 1:
      return (
        <Step2
          date={reservation.time.toISOString().split("T")[0]}
          onPrev={handlePrev}
          onNext={handleNext}
          onChange={handleChangeStep2}
        />
      );
    case 2:
      return (
        <Step3
          reservation={reservation}
          onPrev={handlePrev}
          onNext={handleNext}
          onChange={handleChangeStep3}
        />
      );
    case 3:
      return (
        <Step4
          time={`${reservation.time.toLocaleDateString()}`}
          reservation={reservation}
          onPrev={handlePrev}
          onNext={handleNext}
          onChange={handleChangeStep4}
        />
      );
    case 4:
      return (
        <Step5
          customer={reservation.customer}
          reservation={reservation}
          onPrev={handlePrev}
          onNext={handleNext}
          activeOption={activeOption}
          chooseOption={chooseOption}
          goBack={goBack}
          onChange={handleChangeStep5}
        />
      );
    case 5:
      return (
        <Step6
          reservation={reservation}
          onPrev={handlePrev}
          onSubmit={handleSubmit}
        />
      );
    default:
      return null;
  }
};
