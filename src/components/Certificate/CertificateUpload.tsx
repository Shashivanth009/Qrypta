import React, { useCallback, useContext, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import AuthContext from '../Auth/AuthContext';
import { useDashboard } from '../Dashboard/DashboardContext';

interface CertificateUploadProps {
  onUploadSuccess: () => void;
}

export default function CertificateUpload({ onUploadSuccess }: CertificateUploadProps) {
  const { user } = useContext(AuthContext);
  const { setCertificates } = useDashboard();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    const ensureCertificatesDir = async () => {
      // Ensure the certificates directory exists
    };
    ensureCertificatesDir();
  }, []);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!user) {
      console.error('User is not authenticated');
      return;
    }

    setIsUploading(true);
    try {
      // Simulate file upload
      const uploadedCertificates = acceptedFiles.map(file => ({
        id: uuidv4(),
        name: file.name,
        size: file.size,
        type: file.type,
        userId: user.id,
        status: 'pending',
        verificationCode: '',
        filePath: '',
        uploadDate: new Date(),
      }));
      setCertificates(prev => [...prev, ...uploadedCertificates]);
      setUploadSuccess(true);
      onUploadSuccess();
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  }, [user, setCertificates, onUploadSuccess]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps({ className: 'dropzone dark:bg-gray-800 dark:text-white' })}>
      <input {...getInputProps()} />
      <div className="upload-area dark:bg-gray-700 dark:border-gray-600">
        <Upload className="upload-icon dark:text-indigo-400" />
        <p>Drag & drop some files here, or click to select files</p>
      </div>
      {isUploading && <p>Uploading...</p>}
      {uploadSuccess && <p>Upload successful!</p>}
    </div>
  );
}
