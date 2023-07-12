import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

export enum DayOfWeek {
    lunes,
    martes,
    miércoles,
    jueves,
    viernes,
    sábado,
    domingo
}

export enum Classification {
  bronce = "Bronce",
  plata = "Plata",
  oro = "Oro",
  platino = "Platino",
}

export enum State {
  sin_confirmar = "SIN_CONFIRMAR",
  confirmada = "CONFIRMADA",
  planificada = "PLANIFICADA",
  demorada = "DEMORADA",
  caducada = "CADUCADA",
  cancelada = "CANCELADA",
}

export interface Customer {
  id: string;
  name: string;
  lastname: string;
  email: string;
  phonenumber: string;
  password: string;
  classification: number;
}

export interface Reservation {
  id: string | null;
  customer: Customer;
  service: Service;
  time: Date;
  state: number;
  numberDiners: number
  note: string;
}

export interface Service {
  id: string | null;
  name: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  maxPeople: number;
  schedule: Schedule;
}

export interface Schedule {
  [key: string]: string[];
}

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  flexGrow: 1,
}));
