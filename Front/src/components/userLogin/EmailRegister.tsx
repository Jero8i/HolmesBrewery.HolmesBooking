import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Customer, Item } from "../../types";
import React, { useState } from "react";
import { registerCustomer } from "../../api";
import { theme } from "../../styles/themeProvider";

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

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    onChange({ ...customer, [name]: value });
  };

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const customerId = (await registerCustomer(customer)).id;
      onChange({ ...customer, ["id"]: customerId });
      onNext();
    } catch (error) {
      //error handling
    }
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

      <Divider sx={{ mt: "2%" }} />
      <Stack
        spacing={{ xs: "5px", sm: "5px", md: "10px", lg: "15px" }}
        sx={{ margin: "5% 2% 0% 2%", justifyContent: "center" }}
      >
        <TextField
          type="text"
          label="Nombre"
          name="name"
          required
          value={customer.name}
          onChange={handleInputChange}
        ></TextField>
        <TextField
          type="text"
          label="Apellido"
          name="lastname"
          required
          value={customer.lastname}
          onChange={handleInputChange}
        ></TextField>
        <TextField
          type="email"
          label="Email"
          name="email"
          required
          value={customer.email}
          onChange={handleInputChange}
        ></TextField>
        <TextField
          type="number"
          label="Teléfono"
          name="phonenumber"
          required
          value={customer.phonenumber}
          onChange={handleInputChange}
        ></TextField>
        <TextField
          type="password"
          label="Contraseña"
          name="password"
          required
          value={customer.password}
          onChange={handleInputChange}
        ></TextField>
        <Button variant="contained" color="primary" onClick={handleRegister}>
          Confirmar
        </Button>
      </Stack>
    </>
  );
};

export default EmailRegister;
