import * as SQLite from "expo-sqlite";
import { BaseModel, types } from "expo-sqlite-orm";

export default class Pessoa extends BaseModel {
  constructor(obj) {
    super(obj);
  }

  static get database() {
    return async () => SQLite.openDatabase("database.db");
  }

  static get tableName(){
      return "pessoas";
  }

  static get columnMapping() {
    return {
      id: { type: types.INTEGER, primary_key: true },
      nome: { type: types.TEXT, not_null: true },
      age: { type: types.NUMERIC, not_null: true },
    };
  }
}
