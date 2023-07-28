import React, { useState } from "react";
import { Reservation, SummaryItem } from "../../types";
import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { createReservation } from "../../api";
import { useWindowResize } from "../../hooks/useWindowResize";
import { theme } from "../../styles/themeProvider";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface Step6Props {
  reservation: Reservation;
  onSubmit: () => void;
}

const Step6: React.FC<Step6Props> = ({ reservation, onSubmit }) => {
  const { isMobile } = useWindowResize();
  const [submitError, setSubmitError] = useState(false);
  const [reservationMade, setReservationMade] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await createReservation(reservation);
      onSubmit();
      setSubmitError(false);
      setReservationMade(true);
    } catch (error) {
      setSubmitError(true);
      setReservationMade(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack sx={{ mt: isMobile ? "5%" : "3%", alignItems: "center" }}>
        <Typography
          variant="h5"
          sx={{
            justifyContent: "center",
            color: theme.palette.info.main,
            fontFamily: "Roboto Slab, serif",
            fontWeight: "bold",
            fontSize: { xs: "120%", sm: "130%", md: "140%" },
          }}
        >
          Resumen de la Reserva
        </Typography>
      </Stack>

      <Divider sx={{ width: "80%", mt: "2%", mb: isMobile ? "5%" : "2%" }} />

      <Grid container spacing={1} justifyContent="center">
        <Grid item xs={11}>
          <SummaryItem>
            Cantidad de Personas: {reservation.numberDiners}
          </SummaryItem>
        </Grid>
        <Grid item xs={5.5}>
          <SummaryItem>
            Fecha: {reservation.time.toLocaleDateString()}
          </SummaryItem>
        </Grid>
        <Grid item xs={5.5}>
          <SummaryItem>
            Horario: {reservation.time.toLocaleTimeString()}
          </SummaryItem>
        </Grid>
        <Grid item xs={11}>
          <SummaryItem>Servicio: {reservation.service.name}</SummaryItem>
        </Grid>
      </Grid>
      <Stack
        direction="row"
        spacing={1}
        sx={{width:"92%", justifyContent: "center", textAlign: "center", margin: "5%" }}
      >
        {submitError ? (
          <>
            <ErrorIcon
              fontSize="small"
              sx={{ color: theme.palette.error.main }}
            />
            <Typography
              sx={{
                color: theme.palette.error.main,
                fontWeight: "bold",
              }}
            >
              Ocurrió un error.
            </Typography>
          </>
        ) : reservationMade ? (
          <>
            <CheckCircleIcon
              fontSize="small"
              sx={{ color: theme.palette.success.main }}
            />
            <Typography
              sx={{
                color: theme.palette.success.main,
                fontWeight: "bold",
              }}
            >
              Reserva realizada con éxito.
            </Typography>
          </>
        ) : loading ? (
          <CircularProgress color="primary" thickness={6}/>
        ) : (
          <Button fullWidth variant="contained" color="primary" onClick={handleSubmit}>
            Enviar Reserva
          </Button>
        )}
      </Stack>
    </>
  );
};

export default Step6;
