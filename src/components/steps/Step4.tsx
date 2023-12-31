import { useState } from "react";
import { Divider, Stack, Typography } from "@mui/material";
import { Reservation } from "../../types";
import "../../styles/Step4.css";
import { HourButton } from "../Buttons";
import { useWindowResize } from "../../hooks/useWindowResize";

interface Step4Props {
  reservation: Reservation;
  onNext: () => void;
  onChange: (value: string) => void;
}

const Step4: React.FC<Step4Props> = ({ reservation, onNext, onChange }) => {
  
  const scheduleTimes =
    reservation.service?.schedule[reservation.time.getDay()];

  const [selectedTime, setSelectedTime] = useState<string>(
    `${reservation.time.getHours()}:${reservation.time
      .getMinutes()
      .toString()
      .padStart(2, "0")}`
  );

  const handleButtonClick = (time: string) => {
    setSelectedTime(time);
    onChange(time);
    onNext();
  };

  const { isMobile } = useWindowResize();

  return (
    <>
      <Stack sx={{ mt: isMobile ? "-10%" : "-8%", alignItems: "center" }}>
        <Typography
          variant="h5"
          sx={{
            fontSize: {xs: '1.1em', sm: "1.4em", md: "1.5em"}
          }}
        >
          Elija un horario
        </Typography>
      </Stack>

      <Divider sx={{width:'90%', mt: "2%" }} />

      <Stack sx={{ width: "100%", mt: "8%" }}>
        <div
          className="scroll"
          style={{
            textAlign: "center",
          }}
        >
          {scheduleTimes &&
            scheduleTimes.map((timeString, index) => (
              <HourButton
                key={index}
                value={timeString.slice(0, 5)}
                selectedValue={selectedTime}
                handleButtonClick={handleButtonClick}
              />
            ))}
        </div>
      </Stack>
    </>
  );
};

export default Step4;
