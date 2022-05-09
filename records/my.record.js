import { pool } from '../ultis/db.js';
import { v4 as uuid } from 'uuid';

export class MyRecord {
  constructor(obj) {
    console.log(obj);
    // console.log(obj.count);
    if (!obj.name || obj.name.length < 3 || obj.name.length > 55) {
      throw new ValidationError('Item name should be min 3 max 55 characters.');
    }

    if (!obj.count || obj.count < 1 || obj.count > 999999) {
      throw new ValidationError('Items should be min 1 max 999999.');
    }
    this.id = obj.id;
    this.name = obj.name;
    this.count = obj.count;
  }

  async insert() {
    if (!this.id) {
      this.id = uuid();
    }
    await pool.execute('INSERT INTO `itmes` VALUES(:id, :name, :count)', {
      id: this.id,
      name: this.name,
      count: this.count,
    });
    return this.id;
  }

  static async listAll() {
    const [results] = await pool.execute('SELECT * FROM `items`');
    return results.map((obj) => new MyRecord(obj));
  }
  static async getOne(id) {
    const [results] = await pool.execute('SELECT * FROM `items` WHERE `id` = :id', {
      id,
    });
    return results.length === 0 ? null : new MyRecord(results[0]);
  }

  async delete() {
    await pool.execute('DELETE FROM `items` WHERE `id` = :id', {
      id: this.id,
    });
  }
}
