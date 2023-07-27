import { useState } from "react";
import { Divider, Stack, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";

import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/es"; // Importa el idioma español de dayjs

import "../../styles/Step2.css";
import { theme } from "../../styles/themeProvider";
import { Reservation, Service } from "../../types";

dayjs.locale("es"); // Establece el idioma español en dayjs

interface Step2Props {
  reservation: Reservation;
  onNext: () => void;
  onChange: (aux: Dayjs) => void;
  services: Service[];
  offlineDays: Date[];
}
export const Step2: React.FC<Step2Props> = ({
  reservation,
  onNext,
  onChange,
  services,
  offlineDays,
}) => {
  const date = reservation.time.toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs(date));

  const handleInputChange = (newValue: Dayjs | null) => {
    if (newValue != null) {
      setSelectedDate(
        newValue
          .date(newValue.date())
          .hour(reservation.time.getHours())
          .minute(reservation.time.getMinutes())
      );
      onChange(
        newValue
          .date(newValue.date())
          .hour(reservation.time.getHours())
          .minute(reservation.time.getMinutes())
      );
      onNext();
    }
  };

  const shouldDisableDate = (day: Dayjs) => {

      const currentServices = services.filter(
        (service) =>
          service.startDate <= day.toDate() && service.endDate >= day.toDate()
      );
      
      const currentServicesKeys = currentServices.flatMap((service) =>
        Object.keys(service.schedule).map((key) => parseInt(key))
      );

      return !currentServicesKeys.includes(day.day()) || offlineDays.some(offlineDay => offlineDay.getTime() === day.toDate().getTime());
    
  };

  return (
    <>
      <Stack sx={{ mt: {xs: "5%", sm: "1%", md: "0%"}, alignItems: "center" }}>
        <Typography
          variant="h5"
          sx={{
            fontSize: {xs: '1.1em', sm: "1.4em", md: "1.5em"}
          }}
        >
          Elija una fecha
        </Typography>
      </Stack>

      <Divider sx={{ width: "100%", mt: "2%" }} />

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
