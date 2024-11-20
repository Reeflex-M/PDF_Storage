import React, { useState } from 'react';
import { UserPlus, Download, Plus, Trash2 } from 'lucide-react';
import type { Person, CustomField, StoredPDF } from '../types';
import { generatePDF } from '../utils/pdfGenerator';

interface PersonFormProps {
  onPDFGenerated: (pdf: StoredPDF) => void;
}

const initialPerson: Person = {
  id: crypto.randomUUID(),
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  birthDate: '',
  address: '',
  customFields: {},
};

export default function PersonForm({ onPDFGenerated }: PersonFormProps) {
  const [person, setPerson] = useState<Person>(initialPerson);
  const [customFields, setCustomFields] = useState<CustomField[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPerson(prev => ({ ...prev, [name]: value }));
  };

  const handleCustomFieldChange = (e: React.ChangeEvent<HTMLInputElement>, fieldId: string) => {
    setPerson(prev => ({
      ...prev,
      customFields: {
        ...prev.customFields,
        [fieldId]: e.target.value,
      },
    }));
  };

  const addCustomField = () => {
    const newField: CustomField = {
      id: crypto.randomUUID(),
      label: '',
      type: 'text',
      required: false,
    };
    setCustomFields(prev => [...prev, newField]);
  };

  const removeCustomField = (id: string) => {
    setCustomFields(prev => prev.filter(field => field.id !== id));
    setPerson(prev => {
      const { [id]: removed, ...rest } = prev.customFields;
      return { ...prev, customFields: rest };
    });
  };

  const handleGeneratePDF = () => {
    const pdf = generatePDF(person, customFields);
    onPDFGenerated(pdf);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleGeneratePDF();
    setPerson(initialPerson);
    setCustomFields([]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            required
            value={person.firstName}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastName"
            required
            value={person.lastName}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            required
            value={person.email}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            name="phone"
            value={person.phone}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Birth Date</label>
          <input
            type="date"
            name="birthDate"
            value={person.birthDate}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={person.address}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      {customFields.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Custom Fields</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {customFields.map(field => (
              <div key={field.id} className="relative">
                <label className="block text-sm font-medium text-gray-700">{field.label || 'New Field'}</label>
                <div className="flex gap-2">
                  <input
                    type={field.type}
                    value={person.customFields[field.id] || ''}
                    onChange={(e) => handleCustomFieldChange(e, field.id)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeCustomField(field.id)}
                    className="mt-1 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center pt-5">
        <button
          type="button"
          onClick={addCustomField}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Custom Field
        </button>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleGeneratePDF}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Download className="h-5 w-5 mr-2" />
            Download PDF
          </button>

          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <UserPlus className="h-5 w-5 mr-2" />
            Save Person
          </button>
        </div>
      </div>
    </form>
  );
}