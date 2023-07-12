import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import { Customer, Item } from "../../types";
import React from "react";
import { registerCustomer } from "../../api";

interface EmailRegisterProps {
  goBack: () => void;
  onNext: () => void;
  customer: Customer;
  onChange: (customer: Customer) => void;
}

const EmailRegister: React.FC<EmailRegisterProps> = ({
  goBack,
  onNext,
  customer,
  onChange,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    onChange({ ...customer, [name]: value });
  };

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await registerCustomer(customer);
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
            <h2>Registrarse con Email</h2>
          </Item>
          <form onSubmit={handleRegister}>
            <Item>
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
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Confirmar
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

export default EmailRegister;
