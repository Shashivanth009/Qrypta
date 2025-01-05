import sqlite3 from 'sqlite3';
import * as fs from 'node:fs/promises';
import { open } from 'node:fs/promises';

const dbPath = 'project/certificates.db';

const exportCertificates = async () => {
  const db = new sqlite3.Database(dbPath);

  db.all('SELECT * FROM certificates', [], async (err, rows) => {
    if (err) {
      console.error('Error fetching certificates:', err);
      db.close();
      return;
    }

    try {
      await fs.writeFile('src/data/certificates_backup.json', JSON.stringify(rows, null, 2));
      console.log('Certificates exported to src/data/certificates_backup.json');
    } catch (error) {
      console.error('Error writing to JSON file:', error);
    } finally {
      db.close();
    }
  });
};

exportCertificates();
