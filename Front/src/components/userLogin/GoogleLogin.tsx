import { Button } from "@mui/material";

interface GoogleLoginProps {
  goBack: () => void;
}

const GoogleLogin: React.FC<GoogleLoginProps> = ({ goBack }) => {
  return (
    <>
      <h2> Google Login </h2>
      <Button variant="contained" color="primary" onClick={goBack}>
        Volver
      </Button>
    </>
  );
};

export default GoogleLogin;
