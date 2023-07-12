import React from "react";
import { useMultistep } from "./hooks/useMultistep";
import { RenderStepContent } from "./components/RenderStepContent";
import { Box, Container, Grid } from '@mui/material';

import StepperComponent from "./components/StepperComponent";
import background from './images/background.jpg';
import { useWindowRezise } from "./hooks/useWindowRezise";
import { useLogin } from "./hooks/useLogin";

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

  const {
    activeOption,
    chooseOption,
    goBack,
  } = useLogin();


  const { isMobile } = useWindowRezise();
  
  return (
    <Container 
      sx={{
      height: '100vh', 
      minWidth: '100vw',
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(255, 230, 167, 0.95)",
          borderRadius: '10px',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
          height: 
          isMobile ? '50%' :
          {
            xs: '45%', sm: '55%', md: '60%', lg: '65%', 
          },
          width: 
          isMobile ? '95%' :
          {
            xs: '90%', sm: '80%', md: '65%', lg: '55%', 
          },
          position: 'relative',
          display: "flex",
          justifyContent:"center",
          alignItems:"center"
        }}
      >
        
        <Grid container
          justifyContent="center"
          alignItems="stretch"
          width='100%'
          height= '100%'
        >

          {activeStep !== -1 && (
            <Grid item
              position= 'absolute'
            >
             <StepperComponent activeStep={activeStep} />
            </Grid>
          )}

          <Grid item
          >
            {RenderStepContent({
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
              activeOption,
              chooseOption,
              goBack,
            })}
          </Grid>

        </Grid>

      </Box>
    </Container>
  );
  
}
  
  export default App;
