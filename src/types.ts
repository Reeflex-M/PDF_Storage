export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  address: string;
  customFields: Record<string, string>;
}

export interface CustomField {
  id: string;
  label: string;
  type: 'text' | 'date' | 'email' | 'tel';
  required: boolean;
}

export interface StoredPDF {
  id: string;
  fileName: string;
  personId: string;
  personName: string;
  createdAt: string;
  dataUrl: string;
}