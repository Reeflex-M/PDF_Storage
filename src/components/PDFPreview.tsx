import React from 'react';
import Modal from './Modal';

interface PDFPreviewProps {
  dataUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function PDFPreview({ dataUrl, isOpen, onClose }: PDFPreviewProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="h-[80vh] w-full">
        <iframe
          src={dataUrl}
          className="w-full h-full rounded-lg"
          title="PDF Preview"
        />
      </div>
    </Modal>
  );
}