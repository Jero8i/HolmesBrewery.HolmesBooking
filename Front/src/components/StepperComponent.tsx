import { Stepper, Step, StepLabel } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import FactCheckRoundedIcon from "@mui/icons-material/FactCheckRounded";
import LoginIcon from "@mui/icons-material/Login";

import "../styles/Stepper.css";
import { useWindowRezise } from "../hooks/useWindowRezise";

export const StepperComponent = ({ activeStep }: { activeStep: number }) => {
  const { isMedium, isMobile } = useWindowRezise();

  return (
    <>
      {isMobile ? (
        <Stepper
          style={{ background: "none" }}
          activeStep={activeStep}
          alternativeLabel={isMedium ? true : false}
          className="custom-stepper"
          sx={{ mt: "10%" }}
        >
          <Step>
            <StepLabel icon={<AccountCircleIcon className="custom-icon" />} />
          </Step>
          <Step>
            <StepLabel icon={<EventRoundedIcon className="custom-icon" />} />
          </Step>
          <Step>
            <StepLabel icon={<SportsBarIcon className="custom-icon" />} />
          </Step>
          <Step>
            <StepLabel icon={<WatchLaterIcon className="custom-icon" />} />
          </Step>
          <Step>
            <StepLabel icon={<LoginIcon className="custom-icon" />} />
          </Step>
          <Step>
            <StepLabel
              icon={<FactCheckRoundedIcon className="custom-icon" />}
            />
          </Step>
        </Stepper>
      ) : (
        <Stepper
          style={{ background: "none" }}
          activeStep={activeStep}
          alternativeLabel={isMedium ? true : false}
          className="custom-stepper"
        >
          <Step>
            <StepLabel icon={<AccountCircleIcon className="custom-icon" />}>
              Personas
            </StepLabel>
          </Step>
          <Step>
            <StepLabel icon={<EventRoundedIcon className="custom-icon" />}>
              Fecha
            </StepLabel>
          </Step>
          <Step>
            <StepLabel icon={<SportsBarIcon className="custom-icon" />}>
              Servicio
            </StepLabel>
          </Step>
          <Step>
            <StepLabel icon={<WatchLaterIcon className="custom-icon" />}>
              Horario
            </StepLabel>
          </Step>
          <Step>
            <StepLabel icon={<LoginIcon className="custom-icon" />}>
              Login
            </StepLabel>
          </Step>
          <Step>
            <StepLabel icon={<FactCheckRoundedIcon className="custom-icon" />}>
              Resumen
            </StepLabel>
          </Step>
        </Stepper>
      )}
    </>
  );
};

export default StepperComponent;
