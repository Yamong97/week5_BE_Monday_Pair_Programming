const express = require("express");
const router = express.Router();
// const {errorHandler} = require("../middleware/customMiddleware");
const {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
} = require("../controllers/tourControllers");
// const auth = require("../middleware/auth");
 
router.get("/", getAllTours);
// router.use(auth);
router.post("/", createTour);
router.get("/:tourId", getTourById);
router.put("/:tourId", updateTour);
router.delete("/:tourId", deleteTour);
// router.use(errorHandler);
module.exports = router;

