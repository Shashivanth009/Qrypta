import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Certificate {
  id: string;
  name: string;
  status: string;
  verificationCode: string;
  content: string;
}

const CertificateDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedCertificates = localStorage.getItem('certificates');
    if (storedCertificates) {
      const certificates = JSON.parse(storedCertificates) as Certificate[];
      const foundCertificate = certificates.find((cert) => cert.id === id);
      setCertificate(foundCertificate || null);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div>Loading certificate details...</div>;
  }

  if (!certificate) {
    return <div>Certificate not found.</div>;
  }

  return (
    <div>
      <h2>Certificate Details</h2>
      <p>Name: {certificate.name}</p>
      <p>Status: {certificate.status}</p>
      <p>Verification Code: {certificate.verificationCode}</p>
      <p>Content:</p>
      <div dangerouslySetInnerHTML={{ __html: certificate.content }} />
    </div>
  );
};

export default CertificateDetails;
