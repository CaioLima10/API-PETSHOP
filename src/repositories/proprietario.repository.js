import sqlite3 from 'sqlite3';
import { randomUUID } from 'crypto';
import { fileURLToPath } from 'url';
import path from 'path';


const __filename = fileURLToPath(import.meta.url);

const dbPath = path.resolve(__filename ,'..', 'petShop_db')

class ProprietarioRepository {
  constructor() {
    this.db = new sqlite3.Database(dbPath);
  }

  async create({ nome, cpf, telefone  }) {
    return new Promise((resolve , reject) => {
  
      const id = randomUUID();

      this.db.run('INSERT INTO proprietarios VALUES(?, ?, ?, ?)', [id, nome, cpf, telefone], (err) => {
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
      this.db.all('SELECT * FROM proprietarios', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  async listById({ proprietarioId }) {
    return new Promise((resolve,reject) => {
      
      this.db.get('SELECT * FROM proprietarios WHERE id = ?', proprietarioId, (err, row) => {
        if (err) {
          reject(err);
        } else if(!row){
          reject({ message: 'Proprietario não encontrado'});
        } else {
          resolve(row)
        }
      });

    });
  }

  async listByProprietario({ cpf }) {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT cpf FROM proprietarios WHERE cpf = ?', cpf,(err, row) => {
        if(err) {
          reject(err);
        } else {
          resolve(row);
        }
      });

    });
  }

  async update({ nome, telefone, proprietarioId }) {
    return new Promise((resolve, reject) => {
      this.db.run('UPDATE proprietarios SET nome = ?, telefone = ? WHERE "id" = ?', [nome, telefone, proprietarioId], (err, row) => {
        if (err) {
          reject(err)
        }  else {
          resolve(row)
        }
      })
    })
  }

  async delete({ proprietarioId }) {
    return new Promise((resolve, reject ) => {
      this.db.run('DELETE FROM proprietarios WHERE id = ?', proprietarioId, (err) => {
        if(err) {
          reject(err)
        }
        resolve()
      })
    })
  }

}

export default new ProprietarioRepository()