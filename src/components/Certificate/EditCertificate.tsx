import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Certificate } from '../Dashboard/DashboardContext'; // Import the Certificate interface

const EditCertificate: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [certificate, setCertificate] = useState<Certificate | null>(null); // Update state type

  useEffect(() => {
    // Fetch certificate details based on the ID
    // Replace this with your actual data fetching logic
    const fetchCertificate = async () => {
      // Example: Fetch from local storage
      const storedCertificates = localStorage.getItem('certificates');
      if (storedCertificates) {
        const certificates = JSON.parse(storedCertificates);
        const foundCertificate = certificates.find((cert: Certificate) => cert.id === id);
        setCertificate(foundCertificate);
      }
    };

    fetchCertificate();
  }, [id]);

  if (!certificate) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Certificate</h1>
      {certificate && <p>Editing certificate with ID: {certificate.id}</p>}
      {/* Implement form for editing certificate details here */}
    </div>
  );
};

export default EditCertificate;
