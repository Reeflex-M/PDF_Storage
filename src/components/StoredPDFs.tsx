import React, { useState } from 'react';
import { FileText, Download, Trash2, Eye } from 'lucide-react';
import { StoredPDF } from '../types';
import { deletePDFFromStorage } from '../utils/pdfStorage';
import PDFPreview from './PDFPreview';

interface StoredPDFsProps {
  pdfs: StoredPDF[];
  onDelete: (id: string) => void;
}

export default function StoredPDFs({ pdfs, onDelete }: StoredPDFsProps) {
  const [selectedPDF, setSelectedPDF] = useState<StoredPDF | null>(null);

  const handleDownload = (pdf: StoredPDF) => {
    const link = document.createElement('a');
    link.href = pdf.dataUrl;
    link.download = pdf.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = (id: string) => {
    deletePDFFromStorage(id);
    onDelete(id);
  };

  const handlePreview = (pdf: StoredPDF) => {
    setSelectedPDF(pdf);
  };

  if (pdfs.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        No stored PDFs yet
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {pdfs.map((pdf) => (
          <div
            key={pdf.id}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-blue-500" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">{pdf.fileName}</h3>
                <p className="text-sm text-gray-500">
                  Created: {new Date(pdf.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handlePreview(pdf)}
                className="inline-flex items-center p-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Eye className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDownload(pdf)}
                className="inline-flex items-center p-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Download className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDelete(pdf.id)}
                className="inline-flex items-center p-1.5 border border-transparent text-sm font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedPDF && (
        <PDFPreview
          dataUrl={selectedPDF.dataUrl}
          isOpen={!!selectedPDF}
          onClose={() => setSelectedPDF(null)}
        />
      )}
    </>
  );
}