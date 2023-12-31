import React, { useState } from "react";
import {
  Button,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useWindowResize } from "../../hooks/useWindowResize";
import { theme } from "../../styles/themeProvider";
import { NumberButton } from "../Buttons";

interface Step1Props {
  numberDiners: number;
  onNext: () => void;
  onChange: (value: number) => void;
}

export const Step1: React.FC<Step1Props> = ({
  numberDiners,
  onNext,
  onChange,
}) => {
  const [selectedValue, setSelectedValue] = useState<number | string>(
    numberDiners
  );
  const [showTextField, setShowTextField] = useState<boolean>(false);
  const [isNegative, setIsNegative] = useState<boolean>(false);

  const { isSmall, isMobile } = useWindowResize();

  const handleButtonClick = (value: number | string) => {
    setSelectedValue(value);
    if (value === "+") {
      setShowTextField(true);
    } else {
      onChange(+value);
      onNext();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const number = parseInt(event.target.value);
    if (number <= 0) {
      setIsNegative(true);
    } else {
      setShowTextField(true);
      setIsNegative(false);
      setSelectedValue(number);
    }
  };

  const handleNext = () => {
    if (+selectedValue > 0) {
      onChange(+selectedValue);
      onNext();
    }
  };

  return (
    <>
      <Stack sx={{ mt: "-10%", alignItems: "center" }}>
        <Typography
          variant="h5"
          sx={{
            fontSize: {xs: '1.1em', sm: "1.4em", md: "1.5em"}
          }}
        >
          Elija una cantidad de personas
        </Typography>
      </Stack>

      <Divider sx={{width:'80%', mt: "2%" }} />

      <Stack
        direction="row"
        spacing={{ xs: "5px", sm: "5px", md: "10px", lg: "15px" }}
        sx={{ margin: isMobile ? "8% 2% 0% 2%" : "5% 2% 0% 2%", justifyContent: "center" }}
      >
        <NumberButton
          value="1"
          selectedValue={selectedValue}
          handleButtonClick={handleButtonClick}
        />
        <NumberButton
          value="2"
          selectedValue={selectedValue}
          handleButtonClick={handleButtonClick}
        />
        <NumberButton
          value="3"
          selectedValue={selectedValue}
          handleButtonClick={handleButtonClick}
        />
        <NumberButton
          value="4"
          selectedValue={selectedValue}
          handleButtonClick={handleButtonClick}
        />
        {!isMobile && (
          <NumberButton
            value="5"
            selectedValue={selectedValue}
            handleButtonClick={handleButtonClick}
          />
        )}
        <NumberButton
          value="+"
          selectedValue={selectedValue}
          handleButtonClick={handleButtonClick}
        />
      </Stack>

      {showTextField || isNegative || (isMobile ? (isMobile && +selectedValue>4) : +selectedValue>5) ? (
        <Stack
          direction="row"
          spacing={2}
          sx={{
            width: '90%',
            mt: isMobile
              ? "10%"
              : isSmall
              ? "10%"
              : { sm: "7%", md: "8%", lg: "9%" },
            pr: "5%",
            pl: "5%",
            alignItems:"center",
          }}
        >
          <TextField
            fullWidth
            type="number"
            error={isNegative ? true : false}
            size= {isSmall ? "small" : "medium"}
            helperText={
              isNegative ? "El número no puede ser negativo ni cero." : ""
            }
            label="Número de personas"
            color="info"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonAddIcon color='info'/>
                </InputAdornment>
              ),
            }}
            onChange={handleInputChange}
            defaultValue={selectedValue}
          />

          <Button
            disabled={!isNegative && +selectedValue > 0 ? false : true}
            onClick={handleNext}
            sx={{
              fontSize: "80%",
              height: isSmall ? "40px" : "55px",
              p: "0% 8%",
              color: "#FFFFFF",
              bgcolor: theme.palette.primary.main,
              "&:hover": {
                bgcolor: theme.palette.info.main,
              },
            }}
          >
            {isMobile ? <ArrowRightAltIcon fontSize="medium"/> : "Continuar"}
          </Button>
        </Stack>
      ) : null}
    </>
  );
};
