import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

interface Certificate {
  id: string;
  name: string;
  status: string;
  verificationCode: string;
  content: string;
  uploadDate: string;
}

const CertificateVerification = () => {
  const { id } = useParams<{ id: string }>();
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificate = async () => {
      setLoading(true);
      try {
        // const command = `sqlite3 certificates.db "SELECT id, name, status, verificationCode, uploadDate FROM certificates WHERE id = '${id}'"`;
        // const result = await execute_command(command);
        // const lines = result.trim().split('\n').filter(Boolean);
        // if (lines.length > 0) {
        // const [dbId, name, status, verificationCode, uploadDate] = lines[0].split('|');
        // setCertificate({ id: dbId, name, status, verificationCode, content: '', uploadDate });

        // // Record verification history
        // const dbPath = 'certificates.db';
        // const sqlite3Lib = require('sqlite3').verbose();
        // const db = new sqlite3Lib.Database(dbPath);
        // db.run(
        //   'INSERT INTO certificate_history (certificate_id, event_type, event_time) VALUES (?, ?, ?)',
        //   [dbId, 'verified', new Date().toISOString()],
        //   (err: Error | null) => {
        //     if (err) {
        //       console.error('Error recording verification history:', err);
        //     } else {
        //       console.log('Verification history recorded for certificate:', dbId);
        //     }
        //   }
        // );
        // db.close();
        // } else {
        //   setCertificate(null);
        // }
      } catch (error) {
        console.error('Error fetching certificate from database:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificate();
  }, [id]);

  if (!certificate) {
    return <div>Certificate not found.</div>;
  }

  const uploadDate = certificate.uploadDate ? new Date(certificate.uploadDate) : null;
  const formattedDate = uploadDate ? uploadDate.toLocaleDateString() : '';
  const formattedTime = uploadDate ? uploadDate.toLocaleTimeString() : '';
  const formattedDay = uploadDate ? uploadDate.toLocaleDateString('en-US', { weekday: 'long' }) : '';

  return (
    <div className="p-4 dark:bg-gray-900 dark:text-white">
      <h2 className="text-xl font-bold mb-4 dark:text-gray-100">Certificate Verification</h2>
      <div className="border rounded p-4 mb-4 dark:bg-gray-800 dark:border-gray-700">
        <p><span className="font-bold dark:text-gray-100">Name:</span> {certificate.name}</p>
        <p><span className="font-bold dark:text-gray-100">Verification Code:</span> {certificate.verificationCode}</p>
      </div>
      <div className="flex items-center justify-center">
        <QRCodeSVG value={JSON.stringify({ 
          verificationCode: certificate.verificationCode,
          certificateId: certificate.id,
          name: certificate.name,
          date: formattedDate,
          time: formattedTime,
          day: formattedDay,
        })} size={256} 
        fgColor="#374151"
        />
        {uploadDate && (
          <div className="ml-4 dark:text-gray-300">
            <p>Uploaded on: {formattedDate}</p>
            <p>Time: {formattedTime}</p>
            <p>Day: {formattedDay}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateVerification;
