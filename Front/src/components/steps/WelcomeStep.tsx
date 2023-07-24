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
            textAlign: "center",
            fontSize: isMobile ? "2.8em" :{
              xs: "2.2em",
              sm: "2.8em",
              md: "3.3em",
              lg: "3.7em",
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
              xs: "1.2em",
              sm: "1.3em",
              md: "1.5em",
              lg: "1.8em",
            },
          }}
        >
          Sistema de reservas
        </Typography>
      </Stack>

      <Stack direction={{ sm: "row" }} sx={{ mt: "8%", p: isMobile ? "0% 10%" : {xs: "0% 5%", sm: "0%"}, alignItems: "center", width:'100%'}}>
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
