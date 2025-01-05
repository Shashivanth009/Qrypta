import * as sqlite3 from 'sqlite3';
import { verbose } from 'sqlite3';

const db = new (verbose().Database)('./certificates.db', (err: Error | null) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    console.log('Connected to the database');
  }
});

export default db;
