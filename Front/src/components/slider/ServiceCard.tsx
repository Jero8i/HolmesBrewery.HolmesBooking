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
  service: Service;
  image: string;
  handleCardSelection: (value: string) => void;
}> = ({ service, image, handleCardSelection }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ margin: "0% 10% 10% 10%" }} className="card">
      <CardMedia
        component="img"
        image={image}
        alt="Descriptive Image"
        sx={{
          height: { xs: 150, sm: 250, md: 250, lg: 300, xl: 300 },
        }}
      />
      <CardContent>
        <Typography
          sx={{
            fontSize: {
              xs: "120%",
              sm: "130%",
              md: "140%",
              lg: "150%",
            },
          }}
        >
          {service.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ fontFamily: "Roboto Slab, serif" }}
        >
          Descripción Resumida.
        </Typography>
        <Link
          href="https://menu.fu.do/holmessrl"
          underline="hover"
          target="-blank"
          rel="noopener"
        >
          Ver carta online
        </Link>
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
          <Typography paragraph>Descripción</Typography>
          <Typography paragraph style={{ fontFamily: "Roboto Slab, serif" }}>
            {reactHtmlParser(service.description)}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};
