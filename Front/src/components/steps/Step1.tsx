import React, {useEffect, useState} from 'react';
import { Box, Button, Divider, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import '../../styles/Step1.css';
import { useWindowRezise } from "../../hooks/useWindowRezise";
import { theme } from '../../styles/themeProvider';

interface Step1Props {
  numberDiners: number;
  onPrev: () => void;
  onNext: () => void;
  onChange: (value: number) => void;
}

const NumberButton: React.FC<{value: string,
  selectedValue: number|string,
  handleButtonClick(value: number|string): void}> = ({value, selectedValue, handleButtonClick}) => {

  return(
    <Button
    variant="contained"
    onClick={() => handleButtonClick(value)}
    className="numberButton"
    sx={{
      width: {sx:'30px', sm:'60px', md:'70px', lg:'75px'},
      height: {sx:'30px', sm:'60px', md:'70px', lg:'75px'},
      fontSize: {sx:'90%', sm: '130%'},
      backgroundColor:
      value === selectedValue.toString() ? 'primary' : theme.palette.primary.main,
      '&:hover': {
        backgroundColor: theme.palette.info.light,
    },
    }}
    >
      {value}
    </Button>
  );
}

const Step1: React.FC<Step1Props> = ({ numberDiners, onPrev, onNext, onChange }) => {

  const [selectedValue, setSelectedValue] = useState<number|string>(numberDiners);
  const [showTextField, setShowTextField] = useState<boolean>(false);
  const [isNegative, setIsNegative] = useState<boolean>(false);
  
  const { isMedium, isSmall, isMobile } = useWindowRezise();

  useEffect(() => {
    if (isMobile || isSmall) {
      setShowTextField(true);
    } else {
      setShowTextField(false);
    }
  }, [isMobile, isSmall]);

  const handleButtonClick = (value: number|string) => {
    setSelectedValue(value);
    if (value === '+') {
      setShowTextField(true);
    } else {
      onChange(+value);
      onNext();     
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const number = parseInt(event.target.value);
    if (number<=0){
      setIsNegative(true);
    } else{
      setIsNegative(false);
      setSelectedValue(number);
    }
    
  };

  const handleNext = () => {
    if (+selectedValue > 0){
      onChange(+selectedValue);
      onNext();
    }
  }

  return (
    <Box
      width='100%'
      height='100%'
      display="flex"
      justifyContent="center"
    >
      <Grid container
        width='100%'
        direction="column"
        justifyContent="flex-start"
        alignContent="center"
        sx=
        {{mt:
          showTextField ?
          {xs: '40%',sm:'30%', md:'17%', lg:'15%'} :
          {xs:'35%', md:'20%' },
        }}
      >

        <Grid item
        sx={{
          textAlign: 'center',
        }}>
          <Typography variant='h5'
          sx={{
            color: theme.palette.info.main,
            fontFamily: "Roboto Slab, serif",
            fontWeight: 'bold',
            fontSize: 
            showTextField ?
            {
              xs: '100%', sm: '110%', md: '130%', lg: '140%',
            }
            :
            {
              xs: '110%', sm: '130%', md: '150%', lg: '160%',
            },
          }}>
          Elija una cantidad de personas</Typography>
          <Divider sx={{ my: 1 }} />
        </Grid>

        {!isMobile && !isSmall && 
        <Grid item
          sx={{
          textAlign: 'center', 
          width: '120%',
          marginTop:
          showTextField ? 
          {sm: '4%', md: '6%', lg: '8%',}:
          {sm: '5%', md: '11%', lg: '13%',},
          }}>
          <NumberButton value='1' selectedValue={selectedValue} handleButtonClick={handleButtonClick} />
          <NumberButton value='2' selectedValue={selectedValue} handleButtonClick={handleButtonClick} />
          <NumberButton value='3' selectedValue={selectedValue} handleButtonClick={handleButtonClick} />
          <NumberButton value='4' selectedValue={selectedValue} handleButtonClick={handleButtonClick} />
          {!isMedium && (<NumberButton value="5" selectedValue={selectedValue} handleButtonClick={handleButtonClick}/>)}
          <NumberButton value='+' selectedValue={selectedValue} handleButtonClick={handleButtonClick} />
        </Grid>
        }
        
        {showTextField || isNegative ? (
          <Grid item
            justifyContent='center'
            sx={{
              marginTop:
                isMobile ? '15%' :
                isSmall ? '10%' :
                {sm: '7%', md: '8%', lg: '9%',}
              ,
            }}
          >
            <TextField
              type="number"
              error= {isNegative ? true : false}
              helperText={isNegative ? 'El número no puede ser negativo ni cero.' : ''}
              label="Número de personas"
              color= 'info'
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonAddIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ml: !isMobile && !isSmall ? '25%' : '0%'}}
              onChange={handleInputChange}
            />
          </Grid> ) : null
        }

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

export default Step1;
