import { useState } from "react";
import Box from '@mui/material/Box';
import { Button, Grid} from '@mui/material';
import { useWindowRezise } from '../../hooks/useWindowRezise';
import { theme } from '../../styles/themeProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import dayjs from 'dayjs';
import 'dayjs/locale/es'; // Importa el idioma español de dayjs

import "../../styles/Step2.css";

dayjs.locale('es'); // Establece el idioma español en dayjs

interface Step2Props {
  date: string;
  onPrev: () => void;
  onNext: () => void;
  onChange: (value: string) => void;
}

const Step2: React.FC<Step2Props> = ({ date, onPrev, onNext, onChange }) => {
  
  const handleInputChange = (value: string|null) => {
    if (value!=null){
      const formattedDate = dayjs(value).format('DD/MM/YY');
      setSelectedDate(formattedDate);
      console.log(formattedDate);
    }
  };

  const handleNext = () => {
    onChange(selectedDate);
    onNext();
  }

  const [selectedDate, setSelectedDate] = useState("");

  return (
    <Box
      display="flex"
      height='100%'
      justifyContent="center"
      alignItems="center"
      sx={{
        width: '100%', 
        marginTop: '5%', 
      }}
    >
      <Grid container >
        <Grid item 
          sx={{ 
            color: theme.palette.primary.main,
            mt: {sm:'15%', md:'0%'},
          }}>
          <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DateCalendar              
              className="calendar" 
              disablePast={true} 
              views={['day']} 
              onChange={handleInputChange}
              />
          </LocalizationProvider>
        </Grid>

        <Grid item
          sx={{
            position: 'absolute',
            bottom: '5%',
            left: '5%',
          }}>
            <Button variant="contained" onClick={onPrev}
              sx={{
                width: '60px',
                height:'60px',
                borderRadius: '50%',
                fontSize:'1px'
              }}
            ><ChevronLeftIcon fontSize='small'/></Button>
        </Grid>

        <Grid item
          sx={{
            position: 'absolute',
            bottom: '5%',
            right: '5%',
          }}>
            <Button variant="contained" onClick={handleNext}
              sx={{
                width: '60px',
                height:'60px',
                borderRadius: '50%',
                fontSize:'1px',
              }}
            ><NavigateNextIcon fontSize='small'/></Button>
        </Grid>
      </Grid>
      
    </Box>
  );

}

export default Step2;
