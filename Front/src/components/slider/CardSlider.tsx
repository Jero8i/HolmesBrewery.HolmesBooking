import React, { useState } from "react";
import { Button, MobileStepper, Stack } from "@mui/material";
import { Reservation, Service } from "../../types";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { ServiceCard } from "./ServiceCard";

interface CardSliderProps {
  services: Service[];
  onNext: () => void;
  onChange: (value: Service) => void;
  reservation: Reservation;
}

const CardSlider: React.FC<CardSliderProps> = ({
  services,
  onNext,
  onChange,
  reservation,
}) => {
  const findIndex = (serviceId: string): number => {
    const indexFound =
      reservation.service.name !== ""
        ? services.findIndex((service) => service.name === serviceId)
        : 0;
    return Math.max(indexFound, 0);
  };

  const [selectedService, setSelectedService] = useState(reservation.service);
  const [activeIndex, setActiveIndex] = useState(findIndex(reservation.service.name));

  const maxSteps = services.length;

  const handleNextService = () => {
    setActiveIndex(() => activeIndex + 1);
  };

  const handleBackService = () => {
    setActiveIndex(() => activeIndex - 1);
  };

  const handleCardSelection = (serviceId: string) => {
    const selected = services.find(
      (service) => service.name === serviceId
    );
    if (selected) {
      setSelectedService(selected);
      onChange(selected);
      onNext();
    }
  };

  return (
    <>
      <Stack sx={{ alignItems:"center" }}>
        <ServiceCard
          selectedService={selectedService}
          service={services[activeIndex]}
          handleCardSelection={handleCardSelection}
        />
      </Stack>

      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeIndex}
        nextButton={
          <Button
            variant="contained"
            size="small"
            onClick={handleNextService}
            disabled={activeIndex === maxSteps - 1}
          >
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button
            variant="contained"
            size="small"
            onClick={handleBackService}
            disabled={activeIndex === 0}
          >
            <KeyboardArrowLeft />
          </Button>
        }
        sx={{
          background: "none",
          display: "flex",
          alignItems: "center",
          justifyContent:"space-between",
          height: 30,
          mt: "-8%",
          borderRadius: "5px",
        }}
      />
    </>
  );
};

export default CardSlider;
