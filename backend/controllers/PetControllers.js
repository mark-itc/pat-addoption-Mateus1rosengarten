const PetDAO = require("../Models/petDAO");
const ModelImg = require("../validation/ImageModelValidation");

module.exports = class PetControllers {
  static async createPet(req, res) {
    try {
      const validRequest = ModelImg(req.body.file);
      if (!validRequest) {
        return res.status(400).json({
          sucess: false,
          message: "Something bad happened",
        });
      }

      const pet = req.body;
      console.log("pet", pet);
      //  pet.file = "http://localhost:3000/" + req.file.path;

      const petCreated = await PetDAO.addPet(pet);

      res.status(201).json(petCreated);
    } catch (error) {
      res.status(404).json({ message: "something got wrong " });
    }
  }

  static async getAllPets(req, res) {
    try {
      const allPets = await PetDAO.getPets();
      res.status(201).json(allPets);
      console.log(allPets);
    } catch (error) {
      res.status(404).json({ message: "something got wrong" });
    }
  }

  static async FindPetById(req, res) {
    const { id } = req.params;
    try {
      const pet = await PetDAO.getPetById(id);
      console.log("mypett", pet);
      console.log("id", id);
      res.status(201).json({ pet: pet });
    } catch {
      res.status(404).json({ message: "something got wrong" });
    }
  }

  static async FindPetByType(req, res) {
    const { type } = req.params;
    try {
      const pet = await PetDAO.getPetsbyType(type);
      res.status(201).json(pet);
    } catch (error) {
      res.status(404).json({ message: "something got wrong" });
    }
  }

  static async deletePet(req, res) {
    const { id } = req.params;
    try {
      const deleted = await PetDAO.deletePet(id);
      res.status(201).json(deleted);
    } catch {
      res.status(404).json({ message: "something got wrong" });
    }
  }

  static async findPetByUserID(req, res) {
    const { id } = req.params;
    try {
      const pet = PetDAO.getPetByUserId(id);
      res.status(201).json(pet);
    } catch {
      res.status(404).json({ message: "something got wrong" });
    }
  }
};
