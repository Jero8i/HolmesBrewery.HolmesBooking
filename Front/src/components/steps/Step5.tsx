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
  onChange: (customer: Customer) => void;
}

const Step5: React.FC<Step5Props> = ({
  customer,
  reservation,
  onNext,
  onChange,
}) => {

  const [activeOption, setActiveOption] = useState(0);
  
  switch (activeOption) {
    case 0:
      return (
        <EmailLogin setActiveOption={setActiveOption} onNext={onNext} reservation={reservation} />
      );

    case 1:
      return (
        <EmailRegister
          setActiveOption={setActiveOption}
          onNext={onNext}
          customer={customer}
          onChange={onChange}
        />
      );

    default:
      return null;
  }
};

export default Step5;
