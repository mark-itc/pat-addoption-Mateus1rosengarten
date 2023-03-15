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

      //  pet.file = "http://localhost:3000/" + req.file.path;

      const petCreated = await PetDAO.addPet(pet);

      res.status(200).json(petCreated);
    } catch (error) {
      res.status(404).json({ message: "something got wrong " });
    }
  }

  static async getAllPets(req, res) {
    try {
      const allPets = await PetDAO.getPets();
      res.status(200).json(allPets);
    } catch (error) {
      res.status(404).json({ message: "something got wrong" });
    }
  }

  static async FindPetById(req, res) {
    const { id } = req.params;
    try {
      const pet = await PetDAO.getPetById(id);

      res.status(200).json({ pet: pet });
    } catch {
      res.status(404).json({ message: "something got wrong" });
    }
  }

  static async FindPetByType(req, res) {
    const { type } = req.params;
    try {
      const pet = await PetDAO.getPetsbyType(type);
      console.log("petByType", pet);
      res.status(200).json(pet);
    } catch (error) {
      res.status(404).json({ message: "something got wrong..." });
    }
  }

  static async FindFullPet(req, res) {
    const queryParameters = req.query;
    const queryObj = {};
    if (queryParameters.status) {
      queryObj.status = queryParameters.status;
    }
    if (queryParameters.type) {
      queryObj.type = queryParameters.type;
    }
    if (queryParameters.heigth) {
      queryObj.heigth = queryParameters.heigth;
    }
    if (queryParameters.weight) {
      queryObj.weight = queryParameters.weight;
    }
    if (queryParameters.name) {
      queryObj.name = queryParameters.name;
    }

    try {
      const result = await PetDAO.GetFullPet(queryObj);
      if (result) {
        console.log("nome", queryObj.type);
        res.status(200).send({
          sucess: true,
          pets: result,
        });
      } else {
        res.status(400).send({
          sucess: false,
          message: "Somethin got wrong ",
        });
      }
    } catch (error) {
      res.status(404).json({ message: "something got wrong " });
    }
  }

  static async deletePet(req, res) {
    const { id } = req.params;
    try {
      const deleted = await PetDAO.deletePet(id);
      res.status(200).json(deleted);
    } catch {
      res.status(404).json({ message: "something got wrong" });
    }
  }

  static async findPetByUserID(req, res) {
    const { id } = req.params;
    try {
      const pet = PetDAO.getPetByUserId(id);
      res.status(200).json(pet);
    } catch {
      res.status(404).json({ message: "something got wrong" });
    }
  }
};
