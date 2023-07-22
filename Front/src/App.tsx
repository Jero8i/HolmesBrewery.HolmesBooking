import React from "react";
import { useMultistep } from "./hooks/useMultistep";
import { useWindowRezise } from "./hooks/useWindowRezise";


import { RenderStepContent } from "./components/RenderStepContent";
import { Box, Paper, Stack } from "@mui/material";
import { StepperComponent } from "./components/StepperComponent";

import background from "./images/background.jpg";
import marca from "./images/marca.png";
import { BackButton } from "./components/Buttons";

function App() {
  const {
    activeStep,
    reservation,
    handleNext,
    handlePrev,
    handleChangeStep1,
    handleChangeStep2,
    handleChangeStep3,
    handleChangeStep4,
    handleChangeStep5,
    handleSubmit,
  } = useMultistep();

  const { isMedium, isSmall, isMobile } = useWindowRezise();

  return (
    <Box
      sx={{
        height: "auto",
        minHeight: "100vh",
        minWidth: "100vw",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          bgcolor: "primary.light",
          minHeight: { xs: "50vh", sm: "55vh", md: "60vh", lg: "65vh" },
          width: { xs: "90vw", sm: "80vw", md: "65vw", lg: "55vw" },
          height: "auto",
          mt: activeStep !== -1 ? "2%" : "-1.7%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Stack>
          {activeStep === -1 ? (
            <img
              src={marca}
              alt="Logo de HOLMES"
              height={
                isMobile
                  ? "50px"
                  : isSmall
                  ? "70px"
                  : isMedium
                  ? "100px"
                  : "120px"
              }
              style={{ marginTop: "10%" }}
            />
          ) : (
            <StepperComponent activeStep={activeStep} />
          )}
        </Stack>

        <Stack
          sx={{
            width: activeStep !== -1 && activeStep !== 1 ? "100%" : "auto",
            flexGrow: 1,
            justifyContent: "center",
            alignItems:"center",
          }}
        >
          <RenderStepContent
            activeStep={activeStep}
            reservation={reservation}
            handleNext={handleNext}
            handlePrev={handlePrev}
            handleChangeStep1={handleChangeStep1}
            handleChangeStep2={handleChangeStep2}
            handleChangeStep3={handleChangeStep3}
            handleChangeStep4={handleChangeStep4}
            handleChangeStep5={handleChangeStep5}
            handleSubmit={handleSubmit}
          />
        </Stack>
      </Paper>

      <Stack
        direction="row"
        sx={{
          minWidth: { xs: "90vw", sm: "80vw", md: "65vw", lg: "55vw" },
          maxWidth: "100%",
          margin: "2% 0%",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        {activeStep !== -1 && <BackButton onPrev={handlePrev} />}
      </Stack>
    </Box>
  );
}

export default App;
