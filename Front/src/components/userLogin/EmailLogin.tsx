import {
  Button,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HttpsIcon from "@mui/icons-material/Https";
import ErrorIcon from "@mui/icons-material/Error";

import { Reservation } from "../../types";

import React, { useState } from "react";
import { customerLogin } from "../../api";

import { theme } from "../../styles/themeProvider";
import { useWindowResize } from "../../hooks/useWindowResize";

interface EmailLoginProps {
  onNext: () => void;
  reservation: Reservation;
}

const EmailLogin: React.FC<EmailLoginProps> = ({ onNext, reservation }) => {
  const [email, setEmail] = useState(reservation.customer.email);
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [invalidData, setInvalidData] = useState(false);

  const { isMobile } = useWindowResize();

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
    } else {
      setInvalidData(true);
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
          Iniciar Sesión
        </Typography>
      </Stack>

      <Divider sx={{ width: "80%", mt: "2%", mb: isMobile ? "5%" : "2%" }} />

      <Stack
        spacing={2}
        sx={{
          margin: "2% 5% 0% 5%",
          width: isMobile
            ? "80%"
            : { xs: "70%", sm: "60%", md: "60%", lg: "50%" },
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
          color="info"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon color="info" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          type="password"
          label="Contraseña"
          onChange={handlePasswordChange}
          error={!!passwordError}
          helperText={passwordError}
          color="info"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <HttpsIcon color="info" />
              </InputAdornment>
            ),
          }}
        />

        {invalidData && (
          <Stack
            direction="row"
            spacing={1}
            sx={{ justifyContent: "center", textAlign: "center" }}
          >
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
              Email o contraseña incorrectos
            </Typography>
          </Stack>
        )}

        <Button variant="contained" color="primary" onClick={handleLogin}>
          Iniciar Sesión
        </Button>
      </Stack>
    </>
  );
};

export default EmailLogin;
