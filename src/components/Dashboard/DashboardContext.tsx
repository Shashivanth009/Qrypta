import React, { createContext, useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Define the types for the context
interface Certificate {
  id: string;
  name: string;
  status: string;
  verificationCode: string;
  filePath: string;
  uploadDate: Date;
  verified?: boolean;
  qrCode?: string;
}

interface DashboardContextProps {
  certificates: Certificate[];
  setCertificates: React.Dispatch<React.SetStateAction<Certificate[]>>;
  selectedFiles: FileList | null;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpload: () => void;
  handleVerify: (id: string) => void;
  handleDelete: (id: string) => void;
}

// Export the Certificate interface
export type { Certificate };

// Create the context
const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

// Create a provider component
const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [certificates, setCertificates] = useState<Certificate[]>(() => {
    const storedCertificates = localStorage.getItem('certificates');
    return storedCertificates ? JSON.parse(storedCertificates, (key, value) => {
      if (key === 'uploadDate') {
        return new Date(value);
      }
      return value;
    }) : [];
  });
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  useEffect(() => {
    localStorage.setItem('certificates', JSON.stringify(certificates, (key, value) => {
      if (key === 'uploadDate' && value instanceof Date) {
        return value.toISOString();
      }
      return value;
    }));
  }, [certificates]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(event.target.files);
  };

  const handleUpload = () => {
    if (selectedFiles) {
      const newCertificates = Array.from(selectedFiles).map(file => ({
        id: Date.now().toString() + '-' + Math.random().toString(36).substring(2, 15), // Generate unique ID
        name: file.name,
        status: 'pending',
        verificationCode: uuidv4().substring(0, 8).toUpperCase(),
        filePath: `certificates/${uuidv4().substring(0, 8).toUpperCase()}-${file.name}`,
        uploadDate: new Date(),
      }));
      setCertificates(prev => [...prev, ...newCertificates]);
      setSelectedFiles(null);
    }
  };

  const handleVerify = useCallback(async (id: string) => {
    const certificate = certificates.find(cert => cert.id === id);
    if (certificate) {
      const qrCodeValue = `Verification Code: ${certificate.verificationCode}, Certificate ID: ${certificate.id}, Name: ${certificate.name}`;
      setCertificates(currentCerts =>
        currentCerts.map(cert =>
          cert.id === id ? { ...cert, verified: true, qrCode: qrCodeValue } : cert
        )
      );
    }
  }, [certificates, setCertificates]);

  const handleDelete = (id: string) => {
    setCertificates(prevCerts => prevCerts.filter(cert => cert.id !== id));
  };

  const value: DashboardContextProps = {
    certificates,
    setCertificates,
    selectedFiles,
    handleFileChange,
    handleUpload,
    handleVerify,
    handleDelete,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = React.useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

export default DashboardProvider;
