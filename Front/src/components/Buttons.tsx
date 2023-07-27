import { Button, Fab } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AddIcon from "@mui/icons-material/Add";
import { theme } from "../styles/themeProvider";
import { useWindowResize } from "../hooks/useWindowResize";

export const BackButton: React.FC<{ onPrev: () => void }> = ({ onPrev }) => {
  const { isMobile } = useWindowResize();
  return (
    <Fab
      onClick={onPrev}
      sx={{
        bgcolor: theme.palette.primary.light,
        borderRadius: "50%",
        fontSize: "1px",
        "&:hover": !isMobile
          ? {
              backgroundColor: theme.palette.primary.main,
              "& svg": {
                color: theme.palette.primary.light,
              },
            }
          : {},
      }}
    >
      <ChevronLeftIcon color="info" fontSize="small" />
    </Fab>
  );
};

export const StepperButton: React.FC<{
  value: number;
  label: string;
  icon: React.JSX.Element;
  handleChangeStep: (n: number) => void;
  activeStep: number;
}> = ({ value, label, icon, handleChangeStep, activeStep }) => {
  const { isMedium, isMobile } = useWindowResize();

  if (isMobile) {
    return (
      <Fab
        value={value}
        onClick={() => handleChangeStep(value)}
        sx={{
          bgcolor: theme.palette.primary.light,
          border: "solid 2px",
          color:
            activeStep === value
              ? theme.palette.primary.main
              : activeStep > value
              ? theme.palette.success.light
              : theme.palette.info.light,
          width: { xs: "3.7em", md: "4em" },
          height: { xs: "3.7em", md: "4em" },
          fontSize: '11px',
        }}
      >
        {icon}
      </Fab>
    );
  } else {
    return (
      <Button
        value={value}
        onClick={() => handleChangeStep(value)}
        startIcon = {!isMedium && icon}
        sx={{
          textTransform: "none",
          fontFamily: "Roboto Slab, serif",
          fontSize: activeStep === value ? "100%" : "90%",
          fontWeight: activeStep === value ? "bold" : "500",
          margin: "0% 0%",
          bgcolor: "#FFE6A7",
          borderRadius: "50px",
          color:
            activeStep === value
              ? theme.palette.primary.main
              : activeStep > value
              ? theme.palette.success.light
              : theme.palette.info.main,
          "& svg": {
            color:
              activeStep === value
                ? theme.palette.primary.main
                : activeStep > value
                ? theme.palette.success.light
                : theme.palette.secondary.main,
          },
          "&:hover":
            value < activeStep
              ? {
                  backgroundColor: '#ffffff',
                  border: "solid 2px",
                  "& svg": {},
                }
              : { backgroundColor: theme.palette.primary.light },
        }}
      >
        {label}
      </Button>
    );
  }
};

export const NumberButton: React.FC<{
  value: string;
  selectedValue: number | string;
  handleButtonClick(value: number | string): void;
}> = ({ value, selectedValue, handleButtonClick }) => {
  return (
    <Fab
      onClick={() => handleButtonClick(value)}
      color="info"
      sx={{
        width: { xs: "3.7em", sm: "4.3em", lg:"4.5em" },
        height: { xs: "3.7em", sm: "4.3em", lg:"4.5em" },
        fontSize: { xs: "100%", sm: "110%", md: "130%" },
        backgroundColor:
          value === selectedValue.toString()
            ? theme.palette.primary.main
            : "info",
        "&:hover": {
          backgroundColor: theme.palette.primary.main,
        },
      }}
    >
      {value === "+" ? <AddIcon /> : value}
    </Fab>
  );
};

export const HourButton: React.FC<{
  value: string;
  selectedValue: number | string;
  handleButtonClick(value: number | string): void;
}> = ({ value, selectedValue, handleButtonClick }) => {
  console.log(selectedValue);
  return (
    <Fab
      onClick={() => handleButtonClick(value)}
      color="info"
      sx={{
        ml: "1%",
        mb: "2%",
        width: "4.1em",
        height: "4em",
        fontSize: { xs: "85%", sm: "130%" },
        backgroundColor:
          value === selectedValue.toString()
            ? theme.palette.primary.main
            : "info",
        "&:hover": {
          backgroundColor: theme.palette.primary.main,
        },
      }}
    >
      {value === "+" ? <AddIcon /> : value}
    </Fab>
  );
};
