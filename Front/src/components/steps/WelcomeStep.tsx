import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LoginIcon from "@mui/icons-material/Login";
import { useWindowResize } from "../../hooks/useWindowResize";

const WelcomeStep = ({ onNext }: { onNext: () => void }) => {
  const { isMedium, isSmall, isMobile } = useWindowResize();

  return (
    <>
      <Stack sx={{ mt: "-8%", alignItems: "center" }}>
        <Typography
          variant="h2"
          color="primary"
          sx={{
            fontSize: {
              xs: "1.7rem",
              sm: "2.6rem",
              md: "3.3rem",
              lg: "3.7rem",
            },
          }}
        >
          HOLMES BREWERY
        </Typography>

        <Typography
          variant="h5"
          color="info"
          style={{ fontFamily: "Roboto Slab, serif" }}
          sx={{
            mt: "-2%",
            fontSize: {
              xs: "1.2rem",
              sm: "1.3rem",
              md: "1.5rem",
              lg: "1.8rem",
            },
          }}
        >
          Sistema de reservas
        </Typography>
      </Stack>

      <Stack direction={{ sm: "row" }} sx={{ mt: "8%", alignItems: "center", width:'100%'}}>
        <Button
          variant="contained"
          size={isSmall ? "small" : isMedium ? "medium" : "large"}
          onClick={onNext}
          startIcon={<RestaurantIcon />}
          sx={{
            width: isMobile
              ? "100%"
              : {
                  xs: "100%",
                  sm: "48%",
                },
            mr: { sm: "4%" },
          }}
        >
          Reservar
        </Button>

        <Button
          variant="contained"
          size={isSmall ? "small" : isMedium ? "medium" : "large"}
          startIcon={<LoginIcon />}
          sx={{
            width: isMobile
              ? "100%"
              : {
                  xs: "100%",
                  sm: "48%",
                },
            mt: isMobile ? "5%" : { xs: "4%", sm: "0%" },
          }}
        >
          Mis reservas
        </Button>
      </Stack>
    </>
  );
};

export default WelcomeStep;
