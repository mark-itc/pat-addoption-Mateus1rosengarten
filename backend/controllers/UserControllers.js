const UsersDAO = require("../Models/userDAO");
const PetDAO = require("../Models/petDAO");
const sha256 = require("sha256");

module.exports = class UserController {
  static async getUserById(req, res) {
    const { id } = req.params;
    try {
      const user = await UsersDAO.getUserById(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ message: "Something got wrong" });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await UsersDAO.getUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(404).json({ message: "Something got wrong" });
    }
  }

  static async updateUser(req, res) {
    try {
      const userEmail = req.params.email;
      const { userData } = req.body;
      userData.password = sha256(userData.password);
      userData.repeatPass = sha256(userData.password);

      const user = await UsersDAO.updateUser(userEmail, userData);

      return res.status(200).json({
        userupdated: user,
        success: true,
        message: "User updated",
      });
    } catch (error) {
      res.status(404).json({ message: "Something got wrong" });
    }
  }

  static async Adopt(req, res) {
    try {
      const userEmail = req.params.user;
      const petId = req.params.pet;
      const adoptStatus = { status: "Adopted" };

      await UsersDAO.adoptPetToUser(userEmail, petId);
      await PetDAO.updatePet(petId, adoptStatus);

      return res.status(200).json({
        success: true,
        message: "Pet adopted sucessfuly",
      });
    } catch (error) {
      res.status(404).json({ message: "Something got wrong" });
    }
  }

  static async Foster(req, res) {
    try {
      const userEmail = req.params.user;
      const petId = req.params.pet;
      const fosteredStatus = { status: "Fostered" };

      await UsersDAO.fosterPetToUser(userEmail, petId);
      await PetDAO.updatePet(petId, fosteredStatus);

      return res.status(200).json({
        success: true,
        message: "Pet fostered sucessfuly",
      });
    } catch (error) {
      res.status(404).json({ message: "Something got wrong" });
    }
  }

  static async Return(req, res) {
    try {
      const userEmail = req.params.user;
      const petId = req.params.pet;
      const AvaibleStatus = { status: "Avaible" };

      await UsersDAO.returnPet(userEmail, petId);
      await PetDAO.updatePet(petId, AvaibleStatus);

      return res.status(200).json({
        success: true,
        message: "Pet returned sucessfuly",
      });
    } catch (error) {
      res.status(404).json({ message: "Something got wrong" });
    }
  }

  static async Save(req, res) {
    try {
      const userEmail = req.params.user;
      const petId = req.params.pet;

      await UsersDAO.savePetToUser(userEmail, petId);

      return res.status(200).json({
        success: true,
        message: "Pet saved sucessfuly",
      });
    } catch (error) {
      res.status(404).json({ message: "Something got wrong" });
    }
  }

  static async UnSave(req, res) {
    try {
      const userEmail = req.params.user;
      const petId = req.params.pet;

      await UsersDAO.UnSavePetFromUser(userEmail, petId);

      return res.status(200).json({
        success: true,
        message: "Pet Unsaved sucessfuly",
      });
    } catch (error) {
      res.status(404).json({ message: "Something got wrong" });
    }
  }

  static async GetUserPets(req, res, next) {
    try {
      const { userEmail } = req.params;
      const user = await UsersDAO.GetUserPets(userEmail);

      req.adopted = user.adopted;

      next();
    } catch (error) {
      res.status(404).json({ message: "Something got wrong" });
    }
  }
};
