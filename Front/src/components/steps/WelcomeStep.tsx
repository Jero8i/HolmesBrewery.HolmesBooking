import React from 'react';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LoginIcon from '@mui/icons-material/Login';
import marca from '../../images/marca.png';
import { useWindowRezise } from '../../hooks/useWindowRezise';
import { theme } from '../../styles/themeProvider';

const WelcomeStep = ({onNext}: {onNext: () => void}) => {

  const { isMedium, isSmall, isMobile } = useWindowRezise();

  return (
    <Box
      width="100%"
      height="100%"
      display= "flex"
      justifyContent="center"
    >

      <Stack 
        position="absolute"
        top='10px'
      >
        <img src={marca} alt="Logo de HOLMES" height= {isMobile ? '50px' : isSmall ? '70px' : isMedium ? '100px' : '120px'}/>
      </Stack>

      <Grid container
        width="100%"
        height="100%"
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{mt: isMobile ? 1 : {xs:3, sm:4, md: 4} }}
      >

        <Grid item>
          <Typography variant="h2" color="primary"
            sx={{
              fontSize: {
                xs: '1.7rem', sm: '2.6rem', md: '3.3rem', lg: '3.7rem',
              },
            }}
          >
            HOLMES BREWERY
          </Typography>
        </Grid>
  
        <Grid item 
          sx={{ mt:-1}}
        >
          <Typography variant="h5" color="info" style={{fontFamily: "Roboto Slab, serif"}}
          sx={{
            fontSize: {
              xs: '1.2rem', sm: '1.3rem', md: '1.5rem', lg: '1.8rem',
          },
          }}
          >
            Sistema de reservas</Typography>
        </Grid>

        <Grid item 
          width='100%'
          sx={{ mt: isSmall ? 3 : isMedium ? 3 : 4, }}
        >
          <Button variant="contained" size={isSmall ? 'small' : isMedium ? 'medium' : 'large'} onClick={onNext} startIcon={<RestaurantIcon />}
          sx={{
            width: 
            isMobile ? '100%' 
            : {
              xs: '100%', sm: '48%',
            },
            mr: {sm: '4%',},
          }}>
          Reservar</Button>

          <Button variant="contained" size={isSmall ? 'small' : isMedium ? 'medium' : 'large'} startIcon={<LoginIcon />}
          sx={{
            width: 
            isMobile ? '100%' 
            : {
              xs: '100%', sm: '48%',
            },
            mt: 
            isMobile ? '5%' :
            {xs: '4%', sm: '0%'},
          }}>
          Mis reservas</Button>
        </Grid>



      </Grid>
    </Box>
  );
}

export default WelcomeStep;