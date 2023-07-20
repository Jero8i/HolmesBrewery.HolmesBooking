import { Fab } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AddIcon from "@mui/icons-material/Add";
import { theme } from "../styles/themeProvider";

export const BackButton: React.FC<{ onPrev: () => void }> = ({ onPrev }) => {
  return (
    <Fab
      onClick={onPrev}
      sx={{
        bgcolor: theme.palette.primary.light,
        borderRadius: "50%",
        fontSize: "1px",
        "&:hover": {
          backgroundColor: theme.palette.primary.main,
          "& svg": {
            color: theme.palette.primary.light,
          },
        },
      }}
    >
      <ChevronLeftIcon color="info" fontSize="small" />
    </Fab>
  );
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
        width: { xs: "3.6em", md: "4em" },
        height: { xs: "3.6em", md: "4em" },
        fontSize: { xs: "90%", sm: "130%" },
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
