export interface Project {
  _id: string;
  name: string;
  description: string;
  image: File | null;
}

export interface Client {
  _id: string;
  name: string;
  description: string;
  designation: string;
  image: File | null;
}

export interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
}

export interface Subscriber {
  _id: string;
  email: string;
}

export interface CroppedAreaPixels {
  x: number;
  y: number;
  width: number;
  height: number;
}