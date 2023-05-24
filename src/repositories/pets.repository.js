import sqlite3 from 'sqlite3';
import { randomUUID } from 'crypto';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);

const dbPath = path.resolve(__filename ,'..', 'petShop_db')

class PetsRepository {
    constructor() {
      this.db = new sqlite3.Database(dbPath)
    }

async create({ proprietarioId , nome , idade , peso , raca}){
    return new Promise((resolve , reject) => {
    
        const id = randomUUID();

        this.db.run('INSERT INTO pets VALUES(? ,? , ?, ?, ? , ?)'), [id, proprietarioId , nome , idade , peso , raca], (err) => {
            if(err){
                reject(err)
            }else{
                resolve(id)
            }
        }
    })
}   

async list(){
  return new Promise((resolve , reject) => {
    this.db.all('SELECT * FROM  pets' , (err , rows) => {
        if(err){
            reject(err)
        }else{
            resolve(rows)
        }
    })
  })
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
}



export default new PetsRepository() 