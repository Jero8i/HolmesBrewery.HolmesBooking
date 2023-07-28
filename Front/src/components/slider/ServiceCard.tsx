import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Link } from "@mui/material";
import reactHtmlParser from "react-html-parser";
import { Service } from "../../types";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const ServiceCard: React.FC<{
  selectedService: Service;
  service: Service;
  handleCardSelection: (value: string) => void;
}> = ({ selectedService, service, handleCardSelection }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{
        width: expanded ? {xs:"85%", md: "85%", lg:"80%"} : {xs:"85%", md:"75%", lg:"65%"},
        border: selectedService.name === service.name ? "solid 4px #432818" : "",
      }}
      className="card"
    >
      <CardMedia
        component="img"
        image={
          service.imageUrl !== null
            ? service.imageUrl
            : "https://images.squarespace-cdn.com/content/v1/5907bfac46c3c49694ae8d0e/1597359215844-XI39XM101P6D0QI4CW17/C9325D06-F2FB-49B6-AE88-8C58BDDDB987.jpeg?format=2500w"
        }
        alt="Descriptive Image"
        sx={{
          height: { xs: 100, sm: 130, md: 130, lg: 125, xl: 125 },
          objectPosition: "center",
        }}
      />
      <CardContent sx={{ mb: "-5%" }}>
        <Typography
          sx={{
            fontSize: {
              xs: "100%",
              sm: "110%",
              md: "120%",
              lg: "130%",
            },
          }}
        >
          {service.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontFamily: "Roboto Slab, serif", mt: "-2%" }}
        >
          {reactHtmlParser(service.shortDescription)}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          variant="contained"
          onClick={() => handleCardSelection(service.name)}
        >
          Elegir!
        </Button>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph style={{ fontFamily: "Roboto Slab, serif" }}>
            {reactHtmlParser(service.description)}
          </Typography>
          <Link
            href="https://menu.fu.do/holmessrl"
            underline="hover"
            target="-blank"
            rel="noopener"
            sx={{ mt: "-2%" }}
          >
            Ver carta online
          </Link>
        </CardContent>
      </Collapse>
    </Card>
  );
};
