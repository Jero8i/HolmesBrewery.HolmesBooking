import { Button, Divider, Stack, TextField, Typography } from "@mui/material";
import { Reservation } from "../../types";
import React, { useState } from "react";
import { customerLogin } from "../../api";
import { theme } from "../../styles/themeProvider";

interface EmailLoginProps {
  setActiveOption: (n: number) => void;
  onNext: () => void;
  reservation: Reservation;
}

const EmailLogin: React.FC<EmailLoginProps> = ({
  setActiveOption,
  onNext,
  reservation,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState("");
  const [invalidData, setInvalidData] = useState(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const validateData = (): boolean => {
    if (email.trim() === "") {
      setEmailHelperText("El correo electrónico no puede estar vacío");
      setEmailError(true);
      return true;
    } else if (!isValidEmail(email)) {
      setEmailHelperText("El formato del correo electrónico no es válido");
      setEmailError(true);
      return true;
    } else {
      setEmailHelperText("");
      setEmailError(false);
    }

    if (password.trim() === "") {
      setPasswordHelperText("La contraseña no puede estar vacía");
      setPasswordError(true);
      return true;
    } else {
      setPasswordHelperText("");
      setPasswordError(false);
    }

    return false;
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateData()) {
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
          error={emailError}
          helperText={emailHelperText}
          required
          color="info"
        ></TextField>

        <TextField
          type="password"
          label="Contraseña"
          required
          onChange={handlePasswordChange}
          error={passwordError}
          helperText={passwordHelperText}
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

      <Stack
        direction="row"
        spacing={{ xs: "5px", sm: "5px", md: "10px", lg: "15px" }}
        sx={{ margin: "5% 2% 0% 2%", justifyContent: "center" }}
      ></Stack>
    </>
  );
};

export default EmailLogin;
