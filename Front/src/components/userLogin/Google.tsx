import { useEffect } from "react";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import GoogleIcon from "@mui/icons-material/Google";
import GoogleLogo from "../../images/googleLogo.png";
import { gapi } from "gapi-script";
import { Customer } from "../../types";
import { googleLoginCustomer } from "../../api";
import { Button, Typography } from "@mui/material";
import { theme } from "../../styles/themeProvider";

interface GoogleProps {
  customer: Customer;
  onNext: () => void;
  onChange: (customer: Customer) => void;
}

const Google: React.FC<GoogleProps> = ({ customer, onNext, onChange }) => {
  const clientID =
    "700718116668-2u91tg44c6eru6l81qov06odhfsv07ch.apps.googleusercontent.com";

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        client_id: clientID,
      });
    };

    gapi.load("client:auth2", start);
  }, []);

  const handleLoginGoogle = async (customer: Customer) => {
    try {
      let reservationCustomer = await googleLoginCustomer(customer);
      onChange(reservationCustomer);
      onNext();
    } catch (error) {
      //error handling
    }
  };

  const onSuccess = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    console.log(res);
    if ("profileObj" in res) {
      // res is of type GoogleLoginResponse
      const profileObj = (res as GoogleLoginResponse).profileObj;
      customer.email = profileObj.email;
      customer.name = profileObj.givenName;
      customer.lastname = profileObj.familyName;
      handleLoginGoogle(customer);
    }
  };

  const onFailure = (res: any) => {
    console.log(res);
  };

  return (
    <>
      <GoogleLogin
        clientId={clientID}
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        render={(renderProps) => (
          <Button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            variant="contained"
          >
            {/*<img src={GoogleLogo} alt="Google Logo" style={{ width: "32px", height: "32px" }}/>*/}
            <GoogleIcon />
          </Button>
        )}
      />
    </>
  );
};

export default Google;
