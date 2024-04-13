const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://riri:nomelase123456789@cluster0.yvokzqh.mongodb.net";
const client = new MongoClient(uri);
// NameCluster: riri
// PassCluester: nomelase123456789

class New_service {


async ConsultarRestaurantes() {
  try {
      const database = client.db('sample_restaurants');
      // Se consulta el documento 'users' por defecto
      this.document = database.collection('restaurants');

      const filtro = {};
      const filtro2 = {"name":"Twins Pub"}
      const result = await this.document.find(filtro2).toArray();
      
      return result;

  } catch (error) {
      console.error(error);
      throw error; // Propaga el error
  }
}
};

module.exports = New_service;