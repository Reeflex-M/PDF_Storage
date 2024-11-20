import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import PersonForm from './components/PersonForm';
import StoredPDFs from './components/StoredPDFs';
import { getPDFsFromStorage } from './utils/pdfStorage';
import type { StoredPDF } from './types';

function App() {
  const [storedPDFs, setStoredPDFs] = useState<StoredPDF[]>([]);

  useEffect(() => {
    setStoredPDFs(getPDFsFromStorage());
  }, []);

  const handlePDFDelete = (id: string) => {
    setStoredPDFs(prev => prev.filter(pdf => pdf.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Person Manager</h1>
          </div>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
              <PersonForm onPDFGenerated={(pdf) => setStoredPDFs(prev => [...prev, pdf])} />
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Stored PDFs</h2>
              <StoredPDFs pdfs={storedPDFs} onDelete={handlePDFDelete} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;