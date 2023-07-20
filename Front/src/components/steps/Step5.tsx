import React, { useState } from "react";
import { Customer, Reservation } from "../../types";
import { Grid, Button } from "@mui/material";
import EmailLogin from "../userLogin/EmailLogin";
import EmailRegister from "../userLogin/EmailRegister";
import Google from "../userLogin/Google";

interface Step5Props {
  customer: Customer;
  reservation: Reservation;
  onPrev: () => void;
  onNext: () => void;
  activeOption: number;
  chooseOption: (n: number) => void;
  goBack: () => void;
  onChange: (customer: Customer) => void;
}

const Step5: React.FC<Step5Props> = ({
  customer,
  reservation,
  onPrev,
  onNext,
  activeOption,
  chooseOption,
  goBack,
  onChange,
}) => {
  switch (activeOption) {
    case 0:
      return (
        <div>
          <Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => chooseOption(1)}
              >
                Iniciar Sesion
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => chooseOption(2)}
              >
                Registrarse con Email
              </Button>
            </Grid>
            <Grid item>
              <Google customer={customer} onNext={onNext} onChange={onChange}/>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={onPrev}>
                Anterior
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={onNext}>
                Siguiente
              </Button>
            </Grid>
          </Grid>
        </div>
      );
    case 1:
      return (
        <EmailLogin goBack={goBack} onNext={onNext} reservation={reservation} />
      );
    case 2:
      return (
        <EmailRegister
          goBack={goBack}
          onNext={onNext}
          customer={customer}
          onChange={onChange}
        />
      );
    case 3:
      
    default:
      return null;
  }
};

export default Step5;
