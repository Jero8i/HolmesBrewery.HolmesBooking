import {
  Button,
  Divider,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Customer } from "../../types";
import React, { useState } from "react";
import { registerCustomer } from "../../api";
import { theme } from "../../styles/themeProvider";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import HttpsIcon from "@mui/icons-material/Https";
import ErrorIcon from "@mui/icons-material/Error";
import { useWindowResize } from "../../hooks/useWindowResize";

interface EmailRegisterProps {
  customer: Customer;
  onNext: () => void;
  onChange: (customer: Customer) => void;
}

const EmailRegister: React.FC<EmailRegisterProps> = ({
  onNext,
  customer,
  onChange,
}) => {
  const [nameError, setNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [invalidData, setInvalidData] = useState(false);

  const { isMedium, isSmall, isMobile } = useWindowResize();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    onChange({ ...customer, [name]: value });
  };

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    if (validateData()) {
      try {
        const customerId = (await registerCustomer(customer)).id;
        onChange({ ...customer, ["id"]: customerId });
        onNext();
      } catch (error) {
        setInvalidData(true);
      }
    } else {
      setInvalidData(false);
    }
  };

  const validateData = () => {
    setNameError("");
    setLastNameError("");
    setEmailError("");
    setPhoneNumberError("");
    setPasswordError("");

    if (!customer.name.trim()) {
      setNameError("El nombre no puede estar vacío.");
      return false;
    }

    if (!customer.lastname.trim()) {
      setLastNameError("El apellido no puede estar vacío.");
      return false;
    }

    if (!customer.email.trim()) {
      setEmailError("El correo electrónico no puede estar vacío.");
      return false;
    } else if (!isValidEmail(customer.email)) {
      setEmailError("El formato del correo electrónico no es válido.");
      return false;
    }

    if (!customer.phonenumber.trim()) {
      setPhoneNumberError("El número de teléfono no puede estar vacío.");
      return false;
    } else if (!isValidPhoneNumber(customer.phonenumber)) {
      setPhoneNumberError("El formato del número de teléfono no es válido.");
      return false;
    }

    if (!customer.password.trim()) {
      setPasswordError("La contraseña no puede estar vacía.");
      return false;
    }

    if (!customer.password.trim()) {
      setPasswordError("La contraseña no puede estar vacía.");
      return false;
    }

    return true;
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (number: string) => {
    const cleanedPhoneNumber: string = number.replace(/[\s-]/g, "");
    const phoneNumberRegex: RegExp = /^(\+\d{1,3})?\d{10}$/;
    return phoneNumberRegex.test(cleanedPhoneNumber);
  };

  return (
    <>
      <Stack sx={{ mt: isMobile ? "5%" : isSmall ? "1%" : isMedium ? "0%" : "0%", alignItems: "center" }}>
        <Typography
          variant="h5"
          sx={{
            fontSize: { xs: "1.1em", sm: "1.4em", md: "1.5em" },
          }}
        >
          Registrarse
        </Typography>
      </Stack>

      <Divider sx={{ width: "80%", mt: "1%" }} />

      <Grid
        container
        spacing={2}
        sx={{
          mt: "2%",
          width: isMobile
            ? "80%"
            : { xs: "70%", sm: "90%", md: "70%", lg: "80%" },
          justifyContent: "center",
        }}
      >
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="text"
            label="Nombre"
            name="name"
            required
            value={customer.name}
            onChange={handleInputChange}
            error={!!nameError}
            helperText={nameError}
            color="info"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon color="info" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="text"
            label="Apellido"
            name="lastname"
            required
            value={customer.lastname}
            onChange={handleInputChange}
            error={!!lastNameError}
            helperText={lastNameError}
            color="info"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon color="info" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="email"
            label="Email"
            name="email"
            required
            value={customer.email}
            onChange={handleInputChange}
            error={!!emailError}
            helperText={emailError}
            color="info"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="info" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="Teléfono"
            name="phonenumber"
            required
            value={customer.phonenumber}
            onChange={handleInputChange}
            error={!!phoneNumberError}
            helperText={phoneNumberError}
            color="info"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocalPhoneIcon color="info" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="password"
            label="Contraseña"
            name="password"
            required
            value={customer.password}
            onChange={handleInputChange}
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
        </Grid>
        {invalidData && (
          <Stack
            direction="row"
            spacing={1}
            sx={{
              mt: "1%",
              mb: "-1%",
              justifyContent: "center",
              textAlign: "center",
            }}
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
              No se pudo registrar
            </Typography>
          </Stack>
        )}
      </Grid>
      <Button
        fullWidth
        variant="contained"
        onClick={handleRegister}
        sx={{
          mt: isMobile ? "5%" : isSmall ? "1%" : "2%",
          textTransform: "none",
          width: isMobile
            ? "80%"
            : { xs: "70%", sm: "90%", md: "70%", lg: "80%" },
        }}
      >
        Confirmar
      </Button>
    </>
  );
};

export default EmailRegister;
