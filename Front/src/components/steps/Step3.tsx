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
    <Stack width="100%" sx={{alignItems:"center"}}>
      <Stack sx={{ mt: "2%", alignItems: "center" }}>
        <Typography
          variant="h5"
          sx={{
            fontSize: {xs: '1em', sm: "1.2em", md: "1.3em"}
          }}
        >
          Elija un servicio
        </Typography>
      </Stack>
      <Divider sx={{width:'80%', mt: "1%" }} />
      <Stack
        sx={{ margin: "2% 0% 2% 0%", width: "90%", justifyContent: "center" }}
      >
        {!isLoading && (
          <CardSlider services={services} onChange={onChange} onNext={onNext} reservation={reservation}/>
        )}
      </Stack>
    </Stack>
  );
};