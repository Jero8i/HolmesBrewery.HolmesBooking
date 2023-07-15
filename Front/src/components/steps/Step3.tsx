import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  Stack,
  Card,
  CardContent,
  Divider,
  CardMedia,
} from "@mui/material";
import { Item, Reservation, Service } from "../../types";
import { fetchServices } from "../../api";
import exampleImage from "../../images/background.jpeg";
import ReactHtmlParser from "react-html-parser";
import CardSlider from "../slider/CardSlider";

interface Step3Props {
  reservation: Reservation;
  onPrev: () => void;
  onNext: () => void;
  onChange: (value: Service) => void;
}

const Step3: React.FC<Step3Props> = ({
  reservation,
  onPrev,
  onNext,
  onChange,
}) => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        const services = await fetchServices(
          reservation.time.toISOString().split("T")[0]
        );
        setServices(services);
      } catch (error) {
        // Manejar el error aquí según tus necesidades
      }
    };
    fetchServicesData();
  }, []);

  const handleCardSelection = (serviceId: string) => {
    const selectedService = services.find(
      (service) => service.name === serviceId
    );
    if (selectedService) {
      onChange(selectedService);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "10vh" }}
    >
      <Box sx={{ width: 600 }}>
        <Item>
          <h2>Seleccionar servicio</h2>
        </Item>
        <Item>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="center"
            divider={<Divider orientation="vertical" flexItem />}
          >
            <CardSlider
              numberCards={2}
              services={services}
              image={exampleImage}
              onChange={onChange}
            />
          </Stack>
        </Item>
        <Item>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={{ height: "10vh" }}
            spacing={2}
          >
            <Grid item>
              <Button variant="contained" color="primary" onClick={onPrev}>
                Anterior
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={onNext}>
                Siguiente
              </Button>
            </Grid>
          </Grid>
        </Item>
      </Box>
    </Grid>
  );
};

export default Step3;
