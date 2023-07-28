import React, { useState } from "react";
import { Customer, Reservation } from "../../types";
import { Button, Stack } from "@mui/material";
import EmailLogin from "../userLogin/EmailLogin";
import EmailRegister from "../userLogin/EmailRegister";
import Google from "../userLogin/Google";
import { useWindowResize } from "../../hooks/useWindowResize";

interface LoginOptionsProps {
  customer: Customer;
  onNext: () => void;
  onChange: (customer: Customer) => void;
  activeOption: number;
  setActiveOption: (n: number) => void;
}

const LoginOptions: React.FC<LoginOptionsProps> = ({
  customer,
  onNext,
  onChange,
  activeOption,
  setActiveOption,
}) => {
  const { isMobile } = useWindowResize();

  return (
    <Stack
      direction={ isMobile ? "column" : "row"}
      spacing={1}
      sx={{
        mt: 1,
        mb: 3,
        width: 
          isMobile ? "80%" :
          activeOption === 1
              ? { xs: "70%", sm: "90%", md: "70%", lg: "80%" }
              : { xs: "85%", sm: "80%", md: "60%", lg: "50%" },
      }}
    >
      <Google customer={customer} onNext={onNext} onChange={onChange}/>
      {activeOption === 1 ? (
        <Button
          variant="contained"
          onClick={() => setActiveOption(0)}
          sx={{ flexGrow: "1", textTransform:"none" }}
        >
          Iniciar sesión con Email
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={() => setActiveOption(1)}
          sx={{ flexGrow: "1", textTransform:"none" }}
        >
          Registrarse
        </Button>
      )}
    </Stack>
  );
};

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
        <Stack width="100%" sx={{alignItems:"center"}}>
          <EmailLogin onNext={onNext} reservation={reservation} />
          <LoginOptions
            customer={customer}
            onNext={onNext}
            onChange={onChange}
            activeOption={activeOption}
            setActiveOption={setActiveOption}
          />
        </Stack>
      );

    case 1:
      return (
        <Stack width="100%" sx={{alignItems:"center"}}>
          <EmailRegister
            onNext={onNext}
            customer={customer}
            onChange={onChange}
          />
          <LoginOptions
            customer={customer}
            onNext={onNext}
            onChange={onChange}
            activeOption={activeOption}
            setActiveOption={setActiveOption}
          />
        </Stack>
      );

    default:
      return null;
  }
};

export default Step5;
