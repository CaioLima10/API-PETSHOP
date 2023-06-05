import sqlite3 from 'sqlite3';
import { randomUUID } from 'crypto';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);

const dbPath = path.resolve(__filename ,'..', 'petShop_db')

class PetRepository {
  constructor() {
    this.db = new sqlite3.Database(dbPath);
  }

  async create({ownerId , name, age, Weight, race }) {
    return new Promise((resolve , reject) => {
  
      const id = randomUUID();

      this.db.run('INSERT INTO pets VALUES(?, ?, ?, ?, ?, ?)', [id, ownerId, name, age, Weight, race], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(id);
        }
      });
  
    })
  }

  async list() {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM pets', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  async listById({ petId }) {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM pets WHERE id = ?', petId, (err, row) => {
        if (err) {
          reject(err);
        } else if(!row) {
          reject({ message: 'Pet não encontrado'});
        } else {
          resolve(row);
        }
      });
    });
  };

  async update({name, age, peso, race , petId}) {
    return new Promise((resolve, reject) => {
      this.db.run('UPDATE pets SET name = ?, age = ?, peso = ?, race = ? WHERE "id" = ?', [ name, age, peso, race , petId], (err, row) => {
        if (err) {
          reject(err)
        }  else {
          resolve(row)
        }
      })
    })
  }

 async deleteById({petId}){
    return new Promise((resolve , reject) => {
      this.db.run('DELETE FROM pets WHERE id = ?' , petId, (err , row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      })
    })
  }

  async ownerId({ ownerId }) {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT Id FROM owner WHERE id = ?', ownerId, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }
}

export default new PetRepository()