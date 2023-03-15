const express = require("express");
const app = express();
const cors = require("cors");

const AuthControllers = require("./controllers/AuthControllers");
const UserController = require("./controllers/UserControllers");
const PetControllers = require("./controllers/PetControllers");
const { validateToken } = require("./midllewares/AuthMidlleware");

const { initDB } = require("./Models/init");
const upload = require("./upload");

initDB();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// AUTH ROUTES
app.post("/signup", AuthControllers.Register);
app.post("/login", AuthControllers.Login);
app.get("/auth", validateToken, AuthControllers.Auth);

// USER ROUTES
app.get("/user/:id", UserController.getUserById);
app.post("/update/:email", UserController.updateUser);
app.get("/user", UserController.getAllUsers);
app.post("/adopt/:user/:pet", UserController.Adopt);
app.post("/foster/:user/:pet", UserController.Foster);
app.post("/return/:user/:pet", UserController.Return);
app.post("/save/:user/:pet", UserController.Save);
app.post("/unsave/:user/:pet", UserController.UnSave);

// PET ROUTES

app.post("/petadd", upload.single("file"), PetControllers.createPet);
app.get("/pet/:id", PetControllers.FindPetById);
app.get("/search/:type", PetControllers.FindPetByType);
app.get("/pet", PetControllers.getAllPets);
app.get("/fullsearch", PetControllers.FindFullPet);

app.listen(3000, async () => {
  console.log("Server is running on port : 3000");
});
