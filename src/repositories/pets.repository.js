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

  async create({ nome, idade, peso, raca, proprietarioId }) {
    return new Promise((resolve , reject) => {
  
      const id = randomUUID();

      this.db.run('INSERT INTO pets VALUES(?, ?, ?, ?, ?, ?)', [id, nome, idade, peso, raca, proprietarioId], (err) => {
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

  async update({ nome, idade, peso, raca, petId }) {
    return new Promise((resolve, reject) => {
      this.db.run('UPDATE pets SET nome = ?, idade = ?, peso = ?, raca = ? WHERE "id" = ?', [nome, idade, peso, raca, petId], (err, row) => {
        if (err) {
          reject(err)
        }  else {
          resolve(row)
        }
      })
    })
  }

  async proprietarioId({ proprietarioId }) {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT Id FROM proprietarios WHERE id = ?', proprietarioId, (err, row) => {
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