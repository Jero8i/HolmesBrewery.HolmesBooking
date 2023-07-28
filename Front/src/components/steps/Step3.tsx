import React from "react";
import { Stack, Divider, Typography } from "@mui/material";
import { Reservation, Service } from "../../types";
import CardSlider from "../slider/CardSlider";

interface Step3Props {
  reservation: Reservation;
  services: Service[];
  onNext: () => void;
  onChange: (value: Service) => void;
}

export const Step3: React.FC<Step3Props> = ({
  reservation,
  services,
  onNext,
  onChange,
}) => {
  return (
    <Stack width="100%" sx={{ alignItems: "center" }}>
      <Stack sx={{ mt: "2%", alignItems: "center" }}>
        <Typography
          variant="h5"
          sx={{
            fontSize: { xs: "1em", sm: "1.2em", md: "1.3em" },
          }}
        >
          Elija un servicio
        </Typography>
      </Stack>
      <Divider sx={{ width: "80%", mt: "1%" }} />
      <Stack
        sx={{ margin: "2% 0% 2% 0%", width: "90%", justifyContent: "center" }}
      >
        <CardSlider
          services={services}
          onChange={onChange}
          onNext={onNext}
          reservation={reservation}
        />
      </Stack>
    </Stack>
  );
};
