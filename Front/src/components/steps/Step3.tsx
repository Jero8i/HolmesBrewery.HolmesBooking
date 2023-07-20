import React, { useState, useEffect } from "react";
import { Stack, Divider, Typography } from "@mui/material";
import { Reservation, Service } from "../../types";
import { fetchServices } from "../../api";
import { theme } from "../../styles/themeProvider";
import CardSlider from "../slider/CardSlider";

interface Step3Props {
  reservation: Reservation;
  onNext: () => void;
  onChange: (value: Service) => void;
}

export const Step3: React.FC<Step3Props> = ({
  reservation,
  onNext,
  onChange,
}) => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        const services = await fetchServices(
          reservation.time.toISOString().split("T")[0]
        );
        setServices(services);
        setIsLoading(false);
      } catch (error) {
        // Manejar el error aquí según tus necesidades
        setIsLoading(false);
      }
    };
    fetchServicesData();
  }, []);

  return (
    <>
      <Stack sx={{ mt: "5%", alignItems: "center" }}>
        <Typography
          variant="h5"
          sx={{
            justifyContent: "center",
            color: theme.palette.info.main,
            fontFamily: "Roboto Slab, serif",
            fontWeight: "bold",
            fontSize: "140%",
          }}
        >
          Seleccione un Servicio
        </Typography>
      </Stack>
      <Divider sx={{ mt: "2%" }} />
      <Stack
        sx={{ margin: "5% 0% 5% 0%", width: "100%", justifyContent: "center" }}
      >
        {!isLoading && (
          <CardSlider services={services} onChange={onChange} onNext={onNext} />
        )}
      </Stack>
    </>
  );
};
