import React, { useState } from "react";
import { Button, MobileStepper } from "@mui/material";
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

  const [activeIndex, setActiveIndex] = useState(
    findIndex(reservation.service.name)
  );

  const maxSteps = services.length;

  const handleNextService = () => {
    setActiveIndex(() => activeIndex + 1);
  };

  const handleBackService = () => {
    setActiveIndex(() => activeIndex - 1);
  };

  const handleCardSelection = (serviceId: string) => {
    const selectedService = services.find(
      (service) => service.name === serviceId
    );
    if (selectedService) {
      onChange(selectedService);
      onNext();
    }
  };

  const images = [
    "https://images.squarespace-cdn.com/content/v1/5907bfac46c3c49694ae8d0e/1597359215844-XI39XM101P6D0QI4CW17/C9325D06-F2FB-49B6-AE88-8C58BDDDB987.jpeg?format=2500w",
    "https://images.squarespace-cdn.com/content/v1/5907bfac46c3c49694ae8d0e/1648402824547-4OQR8G2D3Q6L5KVRQZL7/escarlata2.jpeg?format=2500w",
    "https://i.ytimg.com/vi/BK7AulCEllA/mqdefault.jpg",
  ];

  return (
    <>
      <ServiceCard
        service={services[activeIndex]}
        image={images[activeIndex]}
        handleCardSelection={handleCardSelection}
      />

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
          height: 50,
          margin: "-5% 10% 5% 10%",
          borderRadius: "5px",
        }}
      />
    </>
  );
};

export default CardSlider;
