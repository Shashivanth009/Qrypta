import React from 'react';
import DashboardNavbar from '../DashboardNavbar';
import { useDashboard } from './DashboardContext';
import QRCode from 'qrcode.react';

const Dashboard: React.FC = () => {
  const { certificates, selectedFiles, handleFileChange, handleUpload, handleVerify, handleDelete } = useDashboard();

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <DashboardNavbar />
      <div className="p-4 max-w-4xl mx-auto">
        {/* Upload Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Upload Certificates</h2>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              multiple // Allow multiple file selection
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
            />
            <button
              onClick={handleUpload}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
              disabled={!selectedFiles}
            >
              Upload
            </button>
          </div>
        </div>

        {/* Certificates List Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Your Certificates</h2>
          <div className="space-y-4">
            {certificates.length === 0 ? (
              <p className="text-gray-500">No certificates uploaded yet.</p>
            ) : (
              certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="flex items-center justify-between p-4 bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <span className="font-medium">{cert.name}</span>
                    {cert.verified && (
                      <span className="text-green-600 font-semibold">Verified</span>
                    )}
                    {cert.verified && cert.qrCode && (
                      <QRCode value={cert.qrCode} size={60} />
                    )}
                  </div>
                  <div>
                    <button
                      onClick={() => handleVerify(cert.id)}
                      className={cert.verified ? 'px-4 py-2 rounded-lg text-white bg-gray-400 cursor-not-allowed' : 'px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600'}
                      disabled={cert.verified}
                    >
                      {cert.verified ? "Verified" : "Verify"}
                    </button>
                    <button
                      onClick={() => handleDelete(cert.id)}
                      className="px-4 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600 ml-2"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
