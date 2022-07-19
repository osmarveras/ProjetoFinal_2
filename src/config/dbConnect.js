import mongoose from "mongoose";

mongoose.connect("mongodb+srv://admin:admin@projetofinal.zbgkqvj.mongodb.net/ProjetoFinal");

let db = mongoose.connection;

export default db;