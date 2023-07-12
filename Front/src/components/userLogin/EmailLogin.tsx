import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import { Item, Reservation } from "../../types";
import React, { useState } from "react";
import { customerLogin } from "../../api";

interface EmailLoginProps {
  goBack: () => void;
  onNext: () => void;
  reservation: Reservation;
}

const EmailLogin: React.FC<EmailLoginProps> = ({
  goBack,
  onNext,
  reservation,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const customer = await customerLogin(email, password);
      console.log("Datos del cliente desde el Back:");
      console.log(customer);
      reservation.customer = customer;
      onNext();
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
            <h2>Iniciar Sesión</h2>
          </Item>
          <form onSubmit={handleLogin}>
            <Item>
              <TextField type="text" label="Email" required onChange={handleEmailChange}></TextField>
              <TextField type="password" label="Contraseña" required onChange={handlePasswordChange}></TextField>
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
                  <Button variant="contained" color="primary" onClick={goBack}>
                    Volver
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" type="submit">
                    Iniciar Sesión
                  </Button>
                </Grid>
              </Grid>
            </Item>
          </form>
        </Stack>
      </Box>
    </Grid>
  );
};

export default EmailLogin;
