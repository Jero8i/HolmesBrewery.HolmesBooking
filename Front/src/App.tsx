import React from "react";
import { useMultistep } from "./hooks/useMultistep";
import { useWindowResize } from "./hooks/useWindowResize";


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
    handleChangeStep,
    handleChangeStep1,
    handleChangeStep2,
    handleChangeStep3,
    handleChangeStep4,
    handleChangeStep5,
    handleSubmit,
  } = useMultistep();

  const { isMedium, isSmall, isMobile } = useWindowResize();

  return (
    <Box
      sx={{
        height: "auto",
        minHeight: "100vh",
        width: "100%",
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
          minHeight: isMobile ? "65vh" : { xs: "50vh", sm: "60vh", md: "71vh"},
          width: { xs: "90vw", sm: "75vw", md: "65vw", lg: "55vw" },
          height: "auto",
          mt: isMobile ? (activeStep === -1 ? "-55px" : "0px") : activeStep !== -1 ? "40px" : "-15px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Stack sx={{justifyContent: 'center'}}>
          {activeStep === -1 ? (
            <img
              src={marca}
              alt="Logo de HOLMES"
              height={
                isMobile
                  ? "80px"
                  : isSmall
                  ? "80px"
                  : isMedium
                  ? "100px"
                  : "120px"
              }
              style={{ marginTop: "1%" }}
            />
          ) : (
            <StepperComponent activeStep={activeStep} handleChangeStep={handleChangeStep} />
          )}
        </Stack>

        <Stack
          sx={{
            width: activeStep===3 ? '100%': "auto",
            maxWidth: "100%",
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
