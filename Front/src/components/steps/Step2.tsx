import { useState } from "react";
import { Divider, Stack, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";

import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/es"; // Importa el idioma español de dayjs

import "../../styles/Step2.css";
import { theme } from "../../styles/themeProvider";
import { Reservation } from "../../types";

dayjs.locale("es"); // Establece el idioma español en dayjs

interface Step2Props {
  reservation: Reservation;
  onNext: () => void;
  onChange: (aux: Dayjs) => void;
  disabledDays: number[];
}
export const Step2: React.FC<Step2Props> = ({
  reservation,
  onNext,
  onChange,
  disabledDays,
}) => {

  const date = reservation.time.toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs(date));

  const handleInputChange = (newValue: Dayjs | null) => {
    if (newValue != null) {
      setSelectedDate(newValue.date(newValue.date()).hour(reservation.time.getHours()).minute(reservation.time.getMinutes()));
      onChange(newValue.date(newValue.date()).hour(reservation.time.getHours()).minute(reservation.time.getMinutes()));
      onNext();
    }
  };

  const shouldDisableDate = (day: Dayjs) => {
    return disabledDays.includes(day.day());
  };

  return (
    <>
      <Stack sx={{ mt: "6%", alignItems: "center" }}>
        <Typography
          variant="h5"
          sx={{
            justifyContent: "center",
            color: theme.palette.info.main,
            fontFamily: "Roboto Slab, serif",
            fontWeight: "bold",
            fontSize: "135%",
          }}
        >
          Elija una fecha
        </Typography>
      </Stack>

      <Divider sx={{width:'100%', mt: "2%" }} />

      <Stack sx={{ margin: "1% 0% 1% 0%" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            className="calendar"
            disablePast={true}
            views={["day"]}
            value={selectedDate}
            onChange={handleInputChange}
            shouldDisableDate={shouldDisableDate}
          />
        </LocalizationProvider>
      </Stack>
    </>
  );
};
