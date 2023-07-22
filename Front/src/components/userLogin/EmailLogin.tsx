import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Item, Reservation } from "../../types";
import React, { useState } from "react";
import { customerLogin, fetchAllServices } from "../../api";
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

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const validateData = () => {
    if (password.trim() === "" || password == null) {
      setPasswordHelperText("La contraseña no puede estar vacía");
      setPasswordError(true);
    } else {
      setPasswordHelperText("");
      setPasswordError(false);
    }

    if (email.trim() === "" || email == null) {
      setEmailHelperText("El correo electrónico no puede estar vacío");
      setEmailError(true);
    } else if (!isValidEmail(email)) {
      setEmailHelperText("El formato del correo electrónico no es válido");
      setEmailError(true);
    } else {
      setEmailHelperText("");
      setEmailError(false);
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    validateData();
    console.log(email + ", " + password);
    console.log(emailError + ", " + passwordError);


    if (!emailError && !passwordError) {
      console.log("Datos validos");
      try {
        const customer = await customerLogin(email, password);
        console.log("Datos del cliente desde el Back:");
        console.log(customer);
        reservation.customer = customer;
        onNext();
      } catch (error) {
        console.log("No encontre el customer");
      }
    }
  };

  return (
    <>
      <Stack sx={{ mt: "-8%", alignItems: "center" }}>
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

      <Divider sx={{ mt: "2%" }} />

      <Stack
        spacing={{ xs: "5px", sm: "5px", md: "10px", lg: "15px" }}
        sx={{ margin: "5% 2% 0% 2%", justifyContent: "center" }}
      >
        <TextField
          type="email"
          label="Email"
          value={email}
          onChange={handleEmailChange}
          error={emailError}
          helperText={emailHelperText}
          required
        ></TextField>
        <TextField
          type="password"
          label="Contraseña"
          required
          onChange={handlePasswordChange}
          error={passwordError}
          helperText={passwordHelperText}
        ></TextField>
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
    /*
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
          <form >
            <Item>
              
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
                  
                </Grid>
              </Grid>
            </Item>
          </form>
        </Stack>
      </Box>
    </Grid> 
    */
  );
};

export default EmailLogin;
