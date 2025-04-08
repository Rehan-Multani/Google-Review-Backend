import db from "../Config/Connection.js"

class BaseModel {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async getAll() {
    const [rows] = await db.query(`SELECT * FROM ${this.tableName}`);
    return rows;
  }

  async getById(id) {
    const [rows] = await db.query(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id]);
    console.log("rows",rows);
    return rows.length > 0 ? rows[0] : null;
  }
  
  async findEmail(email) {
    const [rows] = await db.query(`SELECT * FROM ${this.tableName} WHERE email = ?`, [email]);
    return rows.length > 0 ? rows[0] : null;
  }
  
  async create(data) {
    const [result] = await db.query(`INSERT INTO ${this.tableName} SET ?`, [data]);
    return result;
  }

  async update(id, data) {
    const [result] = await db.query(`UPDATE ${this.tableName} SET ? WHERE id = ?`, [data, id]);
    return result;
  }

  async delete(id) {
    const [result] = await db.query(`DELETE FROM ${this.tableName} WHERE id = ?`, [id]);
    return result;
  }
}

export default BaseModel