import { Button, Divider, Stack, TextField, Typography } from "@mui/material";
import { Reservation } from "../../types";

import React, { useState } from "react";
import { customerLogin } from "../../api";

import { theme } from "../../styles/themeProvider";
import Google from "./Google";

interface EmailLoginProps {
  onNext: () => void;
  reservation: Reservation;
}

const EmailLogin: React.FC<EmailLoginProps> = ({
  onNext,
  reservation,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [invalidData, setInvalidData] = useState(false);


  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const validateData = () => {
    setEmailError("");
    setPasswordError("");

    if (!email.trim()) {
      setEmailError("El correo electrónico no puede estar vacío.");
      return false;
    } else if (!isValidEmail(email)) {
      setEmailError("El formato del correo electrónico no es válido.");
      return false;
    }

    if (!password.trim()) {
      setPasswordError("La contraseña no puede estar vacía.");
      return false;
    }

    return true;
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    if (validateData()) {
      try {
        const customer = await customerLogin(email, password);
        console.log("Datos del cliente desde el Back:");
        console.log(customer);
        reservation.customer = customer;
        onNext();
      } catch (error) {
        setInvalidData(true);
      }
    }
  };

  return (
    <>
      <Stack sx={{ alignItems: "center" }}>
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
          Iniciar Sesión
        </Typography>
      </Stack>

      <Divider sx={{ width: "80%", mt: "2%", mb:"2%" }} />

      <Stack
        spacing={2}
        sx={{
          margin: "2% 5% 0% 5%",
          width: { md: "50%" },
          justifyContent: "center",
        }}
      >
        <TextField
          type="email"
          label="Email"
          value={email}
          onChange={handleEmailChange}
          error={!!emailError}
          helperText={emailError}
          required
          color="info"
        ></TextField>

        <TextField
          type="password"
          label="Contraseña"
          required
          onChange={handlePasswordChange}
          error={!!passwordError}
          helperText={passwordError}
          color="info"
        ></TextField>

        {invalidData && (
          <Typography
            sx={{
              textAlign:'center',
              color: theme.palette.error.main,
              fontWeight: "bold",
            }}
          >
            Email o contraseña incorrectos
          </Typography>
        )}

        <Button variant="contained" color="primary" onClick={handleLogin}>
          Iniciar Sesión
        </Button>
      </Stack>
    </>
  );
};

export default EmailLogin;
