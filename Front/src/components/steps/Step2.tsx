import { useState } from "react";
import { Divider, Stack, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";

import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/es"; // Importa el idioma español de dayjs

import "../../styles/Step2.css";
import { theme } from "../../styles/themeProvider";

dayjs.locale("es"); // Establece el idioma español en dayjs

interface Step2Props {
  date: string;
  onNext: () => void;
  onChange: (aux: string) => void;
  disabledDays: number[];
}
export const Step2: React.FC<Step2Props> = ({
  date,
  onNext,
  onChange,
  disabledDays,
}) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs(date));

  const handleInputChange = (newValue: Dayjs | null) => {
    if (newValue != null) {
      setSelectedDate(newValue);
      onChange(newValue.format("DD-MM-YYYY"));
      onNext();
    }
  };

  const shouldDisableDate = (day: Dayjs) => {
    return disabledDays.includes(day.day());
  };

  return (
    <>
      <Stack sx={{ mt: "5%", alignItems: "center" }}>
        <Typography
          variant="h5"
          sx={{
            justifyContent: "center",
            color: theme.palette.info.main,
            fontFamily: "Roboto Slab, serif",
            fontWeight: "bold",
            fontSize: "140%",
          }}
        >
          Elija una fecha
        </Typography>
      </Stack>

      <Divider sx={{ mt: "2%" }} />

      <Stack sx={{ margin: "5% 0% 10% 0%" }}>
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
