import { Customer, Reservation, Service } from "./types";

export interface OfflineDay{
  id: string;
  date: Date;
}

const apiUrl = process.env.REACT_APP_API_URL;

export async function fetchDaysOffline(): Promise<OfflineDay[]> {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token no encontrado en el localStorage.');
      throw new Error('Token no encontrado');
    }
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(`${apiUrl}/days-offline`, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener los servicios:', error);
    throw error;
  }
}

export async function fetchActiveServices(): Promise<Service[]> {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token no encontrado en el localStorage.');
      throw new Error('Token no encontrado');
    }
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(`${apiUrl}/all-active-services`, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener los servicios:', error);
    throw error;
  }
}

export async function createReservation(reservation: Reservation): Promise<void> {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token no encontrado en el localStorage.');
      throw new Error('Token no encontrado');
    }
    const formData = new FormData();
    if (reservation.id != null) formData.append("Reservation.Id", reservation.id!);
    formData.append("Reservation.Service.Id", reservation.service.id!);
    formData.append("Reservation.Customer.Id", reservation.customer.id!);
    formData.append("Reservation.NumberDiners", reservation.numberDiners.toString());
    formData.append("Reservation.Time", reservation.time.toISOString().split("T")[0]);
    formData.append("Reservation.TimeSelected", reservation.time.toLocaleTimeString());
    formData.append("Reservation.State", reservation.state.toString());
    formData.append("Reservation.Note", reservation.note!);
    const response = await fetch('https://holmesbooking.com/save-reservation', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error al crear la reserva.');
    }

  } catch (error) {
    console.error('Error al crear la reserva:', error);
    throw error;
  }
}

export async function registerCustomer(customer: Customer): Promise<Customer> {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token no encontrado en el localStorage.');
      throw new Error('Token no encontrado');
    }
    const formData = new FormData();
    formData.append("Customer.Id", customer.id);
    formData.append("Customer.Name", customer.name);
    formData.append("Customer.LastName", customer.lastname);
    formData.append("Customer.Email", customer.email);
    formData.append("Customer.PhoneNumber", customer.phonenumber);
    formData.append("Customer.Password", customer.password);
    formData.append("Customer.Classification", customer.classification.toString());
    const response = await fetch(`${apiUrl}/save-customer`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error al registrar al cliente.');
    }

    return await response.json() as Customer;
    
  } catch (error) {
    console.error('Error al registrar al cliente.', error);
    throw error;
  }
}

export async function googleLoginCustomer(customer: Customer): Promise<Customer> {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token no encontrado en el localStorage.');
      throw new Error('Token no encontrado');
    }
    const formData = new FormData();
    formData.append("Customer.Name", customer.name);
    formData.append("Customer.LastName", customer.lastname);
    formData.append("Customer.Email", customer.email);
    formData.append("Customer.PhoneNumber", customer.phonenumber);
    formData.append("Customer.Password", customer.password);
    formData.append("Customer.Classification", customer.classification.toString());
    const response = await fetch(`${apiUrl}/external-login`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error al registrar al cliente.');
    }

    return await response.json() as Customer;
    
  } catch (error) {
    console.error('Error al registrar al cliente.', error);
    throw error;
  }
}

export async function customerLogin(email: string, password: string): Promise<Customer> {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token no encontrado en el localStorage.');
      throw new Error('Token no encontrado');
    }
    const formData = new FormData();
    formData.append("Username", email);
    formData.append("Password", password);
    formData.append("CalledFromAdmin", "false");
    const response = await fetch(`${apiUrl}/users/login`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Error al iniciar sesión.');
    }
    
    return await response.json() as Customer;

  } catch (error) {
    console.error('Error al iniciar sesión.', error);
    throw error;
  }
}

export async function fetchAndStoreToken() {
  const apiKey = process.env.REACT_APP_API_KEY!;
  try {
    const formData = new FormData();
    formData.append("ApiKey", apiKey);
    const response = await fetch(`${apiUrl}/users/getToken`, {
      method: 'POST',
      body: formData,
    })
    var token = await response.json().then((data) => data.token);
    localStorage.setItem('token', token);
    console.log('Token almacenado:', token);
  } catch (error) {
    console.error('Error al obtener el token:', error);
  }
}