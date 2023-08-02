import React, { useEffect, useState } from "react";
import WelcomeStep from "./steps/WelcomeStep";
import { Step1 } from "./steps/Step1";
import { Step2 } from "./steps/Step2";
import { Step3 } from "./steps/Step3";
import Step4 from "./steps/Step4";
import Step5 from "./steps/Step5";
import { Customer, Reservation, Service } from "../types";
import Step6 from "./steps/Step6";
import { fetchActiveServices, fetchAndStoreToken, fetchDaysOffline } from "../api";
import { Dayjs } from "dayjs";

interface RenderStepContentProps {
  activeStep: number;
  reservation: Reservation;
  handleNext: () => void;
  handlePrev: () => void;
  handleChangeStep1: (numberDiners: number) => void;
  handleChangeStep2: (date: Dayjs) => void;
  handleChangeStep3: (service: Service) => void;
  handleChangeStep4: (scheduleTime: string) => void;
  handleChangeStep5: (customer: Customer) => void;
  handleSubmit: () => void;
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
}) => {
  const [activeServices, setActiveServices] = useState<Service[]>([]);
  const [offlineDays, setOfflineDays] = useState<Date[]>([]);

  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        await fetchAndStoreToken();
        const services = await fetchActiveServices();
        services.forEach((service) => {
          const [sYear, sMonth, sDay] = service.startDate.toString().split("-");
          const startDate = new Date(
            Number(sYear),
            Number(sMonth) - 1,
            Number(sDay.slice(0, 2))
          );
          const [eYear, eMonth, eDay] = service.endDate.toString().split("-");
          const endDate = new Date(
            Number(eYear),
            Number(eMonth) - 1,
            Number(eDay.slice(0, 2))
          );
          service.startDate = startDate;
          service.endDate = endDate;
        });
        setActiveServices(services);
      } catch (error) {}
    };
    fetchServicesData();
  }, []);

  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        const offlineDays = await fetchDaysOffline();
        offlineDays.forEach((offlineDay) => {
          const [year, month, day] = offlineDay.date.toString().split("-");
          const date = new Date(
            Number(year),
            Number(month) - 1,
            Number(day.slice(0, 2))
          );
          offlineDay.date = date;
        });
        setOfflineDays(offlineDays.map((offlineDay) => offlineDay.date));
        console.log();
      } catch (error) {}
    };
    fetchServicesData();
  }, []);

  const filteredServicesByDate = (date: Date): Service[] => {
    return activeServices.filter((service) => Object.keys(service.schedule).includes(date.getDay().toString()));
  };

  switch (activeStep) {
    case -1:
      return <WelcomeStep onNext={handleNext} />;
    case 0:
      return (
        <Step1
          numberDiners={reservation.numberDiners}
          onNext={handleNext}
          onChange={handleChangeStep1}
        />
      );
    case 1:
      return (
        <Step2
          reservation={reservation}
          onNext={handleNext}
          onChange={handleChangeStep2}
          services={activeServices}
          offlineDays={offlineDays}
        />
      );
    case 2:
      console.log("Hora de la reserva en step 3:" + reservation.time);
      return (
        <Step3
          reservation={reservation}
          services={filteredServicesByDate(reservation.time)}
          onNext={handleNext}
          onChange={handleChangeStep3}
        />
      );
    case 3:
      return (
        <Step4
          reservation={reservation}
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
          onChange={handleChangeStep5}
        />
      );
    case 5:
      return <Step6 reservation={reservation} onSubmit={handleSubmit} />;
    default:
      return null;
  }
};
