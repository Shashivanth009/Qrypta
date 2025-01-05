import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../Auth/AuthContext';

// Mock function for execute_command
const execute_command = async (command: string): Promise<string> => {
  // Replace this with actual implementation
  console.log(`Executing command: ${command}`);
  return '';
};
import { Download, CheckCircle } from 'lucide-react';

interface Certificate {
  id: string;
  name: string;
  status: string;
  verificationCode: string;
  filePath: string;
  uploadDate: string;
}

const CertificateList = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const now = new Date();
  const formattedDate = now.toLocaleDateString();
  const formattedTime = now.toLocaleTimeString();

  useEffect(() => {
    const fetchCertificates = async () => {
      setLoading(true);
      try {
        if (user?.id) {
          const command = `sqlite3 certificates.db "SELECT id, name, status, verificationCode, filePath, uploadDate FROM certificates WHERE user_id = '${user.id}'"`;
          const result = await execute_command(command);

          // Parse the output of the sqlite command
          const lines = result.trim().split('\n').filter(Boolean);
          const fetchedCertificates = lines.map((line: string) => {
            const [id, name, status, verificationCode, filePath, uploadDate] = line.split('|');
            return { id, name, status, verificationCode, filePath, uploadDate };
          });
          setCertificates(fetchedCertificates);
        }
      } catch (error) {
        console.error('Error fetching certificates from database:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, [user?.id]);

  const handleDelete = async (id: string, filePath: string) => {
    console.log(`Deleting certificate with id: ${id} and filePath: ${filePath}`);
    try {
      // Record delete history
      // const historyCommand = `sqlite3 certificates.db "INSERT INTO certificate_history (certificate_id, event_type, event_time) VALUES ('${id}', 'deleted', '${new Date().toISOString()}')"`;
      // await execute_command(historyCommand);
      console.log('Delete history recorded for certificate:', id);

      // await execute_command(`sqlite3 certificates.db "DELETE FROM certificates WHERE id = '${id}'"`);
      setCertificates(certificates.filter((certificate) => certificate.id !== id));
      // Optionally delete the file from the filesystem as well
      // await execute_command(`del "${filePath}"`);
    } catch (error) {
      console.error('Error deleting certificate:', error);
    }
  };

  if (loading) {
    return <div>Loading certificates...</div>;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="dark:bg-gray-900 dark:text-white p-4">
      <div>
        Current Date: {formattedDate}
      </div>
      <div>
        Current Time: {formattedTime}
      </div>
      <h2 className="dark:text-gray-100">Certificates</h2>
      {certificates.length === 0 ? (
        <p className="dark:text-gray-300">No certificates uploaded yet.</p>
      ) : (
        <div className="space-y-4">
          {certificates.map((certificate) => (
            <div key={certificate.id} className="justify-between p-2 border rounded dark:bg-gray-800 dark:border-gray-700">
              <div>
                <a href={certificate.filePath} download={certificate.name} className="inline-flex items-center dark:text-indigo-400">
                  {certificate.name}
                  {certificate.uploadDate && (
                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                      {new Date(certificate.uploadDate).toLocaleDateString()},
                      {new Date(certificate.uploadDate).toLocaleTimeString()},
                      {new Date(certificate.uploadDate).toLocaleDateString('en-US', { weekday: 'long' })}
                    </span>
                  )}
                </a>
              </div>
              <div className="mt-2 flex justify-end">
                <Link to={`/verify/${certificate.id}`}>
                  <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded flex items-center dark:bg-purple-600 dark:hover:bg-purple-700">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Verify
                  </button>
                </Link>
                <button onClick={() => handleDelete(certificate.id, certificate.filePath)} className="ml-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificateList;
