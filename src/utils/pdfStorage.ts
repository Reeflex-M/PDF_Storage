import { StoredPDF } from '../types';

export const savePDFToStorage = (pdf: StoredPDF): void => {
  const storedPDFs = getPDFsFromStorage();
  localStorage.setItem('stored_pdfs', JSON.stringify([...storedPDFs, pdf]));
};

export const getPDFsFromStorage = (): StoredPDF[] => {
  const pdfs = localStorage.getItem('stored_pdfs');
  return pdfs ? JSON.parse(pdfs) : [];
};

export const deletePDFFromStorage = (id: string): void => {
  const pdfs = getPDFsFromStorage().filter(pdf => pdf.id !== id);
  localStorage.setItem('stored_pdfs', JSON.stringify(pdfs));
};