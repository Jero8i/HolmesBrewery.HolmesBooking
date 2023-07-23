import {
  Button,
  Divider,
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

  const { isMobile } = useWindowResize();

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
      <Stack sx={{ mt: "5%", alignItems: "center" }}>
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
          Registrarse
        </Typography>
      </Stack>

      <Divider sx={{ width: "80%", mt: "2%" }} />

      <Stack
        spacing={2}
        sx={{
          margin: "5% 5% 0% 5%",
          width: isMobile
            ? "80%"
            : { xs: "70%", sm: "60%", md: "60%", lg: "50%" },
          justifyContent: "center",
        }}
      >
        <TextField
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

        <TextField
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

        <TextField
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
        <TextField
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
        <TextField
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
        ></TextField>

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
              No se pudo registrar
            </Typography>
          </Stack>
        )}

        <Button variant="contained" color="primary" onClick={handleRegister}>
          Confirmar
        </Button>
      </Stack>
    </>
  );
};

export default EmailRegister;
