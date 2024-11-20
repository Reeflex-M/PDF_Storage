import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Person, CustomField, StoredPDF } from '../types';
import { savePDFToStorage } from './pdfStorage';

export const generatePDF = (person: Person, customFields: CustomField[]): StoredPDF => {
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(20);
  doc.text('Person Record', 105, 15, { align: 'center' });

  // Prepare data for the table
  const basicInfo = [
    ['First Name', person.firstName],
    ['Last Name', person.lastName],
    ['Email', person.email],
    ['Phone', person.phone],
    ['Birth Date', person.birthDate],
    ['Address', person.address],
  ];

  const customFieldsData = customFields.map(field => [
    field.label || 'Custom Field',
    person.customFields[field.id] || '',
  ]);

  // Add basic information table
  autoTable(doc, {
    head: [['Field', 'Value']],
    body: [...basicInfo, ...customFieldsData],
    startY: 25,
    theme: 'grid',
    styles: { fontSize: 10 },
    headStyles: { fillColor: [66, 139, 202] },
  });

  const fileName = `${person.firstName}-${person.lastName}-record.pdf`;
  
  // Create PDF storage object
  const storedPDF: StoredPDF = {
    id: crypto.randomUUID(),
    fileName,
    personId: person.id,
    personName: `${person.firstName} ${person.lastName}`,
    createdAt: new Date().toISOString(),
    dataUrl: doc.output('datauristring'),
  };

  // Save to storage
  savePDFToStorage(storedPDF);

  // Save the PDF
  doc.save(fileName);

  return storedPDF;
};