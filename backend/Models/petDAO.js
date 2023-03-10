const { ObjectId } = require("mongodb");
let petCollection;

module.exports = class PetDAO {
  static async injectDB(connection) {
    if (!connection) return;

    try {
      petCollection = await connection.collection("pet");
    } catch (e) {
      console.log(`Could not establish connection to pet collection ${e}`);
    }
  }

  static async addPet(petData) {
    petData.created_at = new Date().toISOString();
    petData.status = "Avaible";
    await petCollection.insertOne({ ...petData });
  }

  static async getPets() {
    const allPets = await petCollection.find({}).toArray();
    return allPets;
  }

  static async getPetsbyType(petType) {
    const petTypeResult = await petCollection
      .find({ petInfo: { type: petType } })
      .toArray();
    return petTypeResult;
  }

  static async getPetById(id) {
    const findPet = await petCollection.findOne({ _id: new ObjectId(id) });
    console.log("testando", findPet);
    return findPet;
  }

  static async deletePet(pet) {
    const deletedPet = await petCollection.deleteOne({ _id: pet._id });
    return deletedPet;
  }

  static async getPetByUserId(petID) {
    const userPet = await petCollection.find({ creator: petID });
    return userPet;
  }

  static async GetManyPets(ids) {
    return await petCollection.find({ _id: ids }).toArray();
  }

  static async updatePet(petId, newData) {
    try {
      const pets = await petCollection.updateOne(
        {
          _id: ObjectId(petId),
        },
        {
          $set: newData,
        }
      );

      console.log("updatepet", pets);
      return pets;
    } catch (err) {
      console.log("unknow error happening");
    }
  }
};
