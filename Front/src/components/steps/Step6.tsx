import React from "react";
import { Item, Reservation } from "../../types";
import { Box, Button, Grid, Stack } from "@mui/material";
import { createReservation } from "../../api";

interface Step6Props {
  reservation: Reservation;
  onPrev: () => void;
  onSubmit: () => void;
}

const Step6: React.FC<Step6Props> = ({ reservation, onPrev, onSubmit }) => {
  const handleSubmit = async () => {
    try {
      console.log(reservation);
      console.log(JSON.stringify(reservation));
      await createReservation(reservation);
      onSubmit();
    } catch (error) {
      //error handling
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "10vh" }}
    >
      <Box sx={{ width: 300 }}>
        <Stack
          spacing={{ xs: 1, sm: 1 }}
          direction="row"
          useFlexGap
          flexWrap="wrap"
        >
          <Item>
            <h2>Resumen de reserva</h2>
          </Item>
          <Item>
            <p>Cantidad de personas: {reservation.numberDiners}</p>
          </Item>
          <Item>
            <p>Fecha: {reservation.time.toLocaleDateString()}</p>
          </Item>
          <Item>
            <p>Horario: {reservation.time.toLocaleTimeString()}</p>
          </Item>
          <Item>
            <p>Servicio: {reservation.service.name}</p>
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
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Enviar Reserva
                </Button>
              </Grid>
            </Grid>
          </Item>
        </Stack>
      </Box>
    </Grid>
  );
};

export default Step6;
