import sqlite3 from 'sqlite3';
import { randomUUID } from 'crypto';
import { fileURLToPath } from 'url';
import path from 'path';


const __filename = fileURLToPath(import.meta.url);

const dbPath = path.resolve(__filename ,'..', 'petShop_db')

class OwnerRepository {
  constructor() {
    this.db = new sqlite3.Database(dbPath);
  }

  async create({ name, cpf, telephone  }) {
    return new Promise((resolve , reject) => {
  
      const id = randomUUID();

      this.db.run('INSERT INTO owners VALUES(?, ?, ?, ?)', [id, name, cpf, telephone], (err) => {
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
      this.db.all('SELECT * FROM owners', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  async listById({ ownerid }) {
    return new Promise((resolve,reject) => {
      
      this.db.get('SELECT * FROM owners WHERE id = ?', ownerid, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row)
        }
      });

    });
  }


async listPetsOwner({ ownerid }){
  return new Promise((resolve , reject) => {
    this.db.all('SELECT * FROM pets WHERE ownerid = ?', ownerid , (err , rows) => {
      if(err){
        reject(err)
      }else{
        resolve(rows)
      }
    })
  })
}


  async update({ name, telephone, ownerid }) {
    return new Promise((resolve, reject) => {
      this.db.run('UPDATE owners SET name = ?, telephone = ? WHERE "id" = ?', [name, telephone, ownerid], (err, row) => {
        if (err) {
          reject(err)
        }  else {
          resolve(row)
        }
      })
    })
  }

  async delete({ ownerid }) {
    return new Promise((resolve, reject ) => {
      this.db.run('DELETE FROM owners WHERE id = ?', ownerid, (err) => {
        if(err) {
          reject(err)
        }
         resolve()
      })
    })
  }

  async listByOwner({ cpf }) {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT cpf FROM owner WHERE cpf = ?', cpf,(err, row) => {
        if(err) {
          reject(err);
        } else {
          resolve(row);
        }
      });

    });
  }

}

export default new OwnerRepository()