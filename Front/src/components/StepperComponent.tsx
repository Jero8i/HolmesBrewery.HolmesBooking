import { MobileStepper, Stepper, Step, StepLabel } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EventRoundedIcon from '@mui/icons-material/EventRounded';
import SportsBarIcon from '@mui/icons-material/SportsBar';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import FactCheckRoundedIcon from '@mui/icons-material/FactCheckRounded';

import '../styles/Stepper.css';
import { useWindowRezise } from "../hooks/useWindowRezise";

const StepperComponent = ({ activeStep }: { activeStep: number }) => {

    const { isMedium, isMobile } = useWindowRezise();

    return(
        <>
        {isMobile ? (
            <MobileStepper
                activeStep={activeStep}
                steps={6}
                variant="dots"
                position="static"
                sx={{ maxWidth: 400, backgroundColor: 'transparent' }} 
                backButton={undefined} 
                nextButton={undefined}
            />
        ) : (
            <Stepper 
            style={{ background: 'none'}}
            activeStep={activeStep}
            alternativeLabel={isMedium ? true : false}
            className="custom-stepper"
            >
                <Step>
                    <StepLabel icon={<AccountCircleIcon className="custom-icon"/>} >Personas</StepLabel>
                </Step>
                <Step>
                    <StepLabel icon={<EventRoundedIcon className="custom-icon"/>} >Fecha</StepLabel>
                </Step>
                <Step>
                    <StepLabel icon={<SportsBarIcon className="custom-icon"/>}>Servicio</StepLabel>
                </Step>
                <Step>
                    <StepLabel icon={<WatchLaterIcon className="custom-icon"/>}>Horario</StepLabel>
                </Step>
                <Step>
                    <StepLabel icon={<FactCheckRoundedIcon className="custom-icon"/>}>Login</StepLabel>
                </Step>
                <Step>
                    <StepLabel icon={<FactCheckRoundedIcon className="custom-icon"/>}>Resumen</StepLabel>
                </Step>
            </Stepper>
        )}
        </>
    );
};

export default StepperComponent;