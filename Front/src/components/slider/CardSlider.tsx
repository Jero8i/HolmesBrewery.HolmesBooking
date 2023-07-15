import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  IconButton,
  IconButtonProps,
  styled,
} from "@mui/material";
import { Service } from "../../types";
import ReactHtmlParser from "react-html-parser";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface CardSliderProps {
  numberCards: number;
  services: Service[];
  image: string;
  onChange: (value: Service) => void;
}

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

const CardSlider: React.FC<CardSliderProps> = ({
  numberCards,
  services,
  image,
  onChange,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const handleNext = () => {
    if (activeIndex < services.length - numberCards) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleCardSelection = (serviceId: string) => {
    const selectedService = services.find(
      (service) => service.name === serviceId
    );
    if (selectedService) {
      console.log(selectedService);
      onChange(selectedService);
    }
  };

  return (
    <>
      <Button onClick={handlePrev}>⇠</Button>
      {services.slice(activeIndex, activeIndex + numberCards).map((service) => (
        <Card
          key={service.name}
          onClick={() => handleCardSelection(service.name)}
          sx={{ maxWidth: 500 }}
        >
          <CardMedia
            component="img"
            height={100}
            image={image}
            alt="Service Image"
          />
          <h3>{service.name}</h3>
          <CardActions disableSpacing>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>{ReactHtmlParser(service.description)}</CardContent>
            </Collapse>
          </CardActions>
        </Card>
      ))}
      <Button onClick={handleNext}>⇢</Button>
    </>
  );
};

export default CardSlider;
