const Tour = require("../models/tourModel");
const mongoose = require("mongoose")
// GET /tours
// const getAllTours = (req, res) => {
//   const tours = Tour.getAll();
//   res.json(tours);
// };
const getAllTours = async (req, res) => {
  try{
    const tours = await Tour.find({}).sort({createdAt: -1});
    res.status(200).json(tours);
  }catch (error){
    res.status(500).json({message: "Failed to retrieve tours"});
  }
};
// POST /tours
// const createTour = (req, res) => {
//   const newTour = Tour.addOne({ ...req.body }); // Spread the req.body object

//   if (newTour) {
//     res.status(201).json(newTour); // 201 Created
//   } else {
//     // Handle error (e.g., failed to create tour)
//     res.status(400).json({ message: "Invalid tour data. Ensure all fields are provided, including 'season' and 'specialOffer'." });
//   }
// };
const createTour = async (req, res) => {
  try{
    const newTour = await Tour.create({...req.body});
    res.status(201).json(newTour);
  }catch(error){
    res.status(400).json({message: "Failed to create Tour"});
  }
} ;






// GET /tours/:tourId
// const getTourById = (req, res) => {
//   const tourId = req.params.tourId;
//   const tour = Tour.findById(tourId);
//   if (tour) {
//     res.json(tour);
//   } else {
//     res.status(404).json({ message: "Tour not found" });
//   }
// };
const getTourById = async (req, res) => {
  const { tourId } = req.params;
  if(!mongoose.Types.ObjectId.isValid(tourId)){
    return res.status(400).json({message: "Invalid Tour Id"});
  }
  try{
    const tour = await Tour.findById(tourId);
    if(tour){
      res.status(200).json(tour);
    }else{
      res.status(404).json({message: "Tour not found"});
    }
  }catch(error){
    res.status(500).json({message: "Failed to retrieve tour"});
  }
};








// PUT /tours/:tourId
// const updateTour = (req, res) => {
//   const tourId = req.params.tourId;
//   if (isNaN(tourId)) {
//     return res.status(400).json({ message: "Invalid tour ID" });
//   }
//   const updatedTour = Tour.updateOneById(tourId, { ...req.body }); // Spread the req.body object

//   if (updatedTour) {
//     res.json(updatedTour);
//   } else {
//     // Handle update failure (e.g., tour not found)
//     res.status(404).json({ message: "Tour not found" });
//   }
// };
const updateTour = async (req, res) => {
  const {tourId} = req. params;
  if (!mongoose.Types.ObjectId.isValid(tourId)){
    res.status(400).json({message: "Invalid tour Id"});
  }

  try{
    const updatedTour = await Tour.findOneAndUpdate(
      {_id: tourId},
      {...req.body},
      {new: true}
    );
    if(updatedTour){
      res.status(200).json(updatedTour);
    }else{
      res.status(404).json({messsage: "Tour not found"});
    }
  }catch(error){
    res.status(500).json({message: "Failed to update tour"});
  }
};


// DELETE /tours/:tourId
// const deleteTour = (req, res) => {
//   const tourId = req.params.tourId;
//   if (isNaN(tourId)) {
//     return res.status(400).json({ message: "Invalid tour ID" });
//   }
//   const isDeleted = Tour.deleteOneById(tourId);

//   if (isDeleted) {
//     res.status(204).send(); // 204 No Content
//   } else {
//     // Handle deletion failure (e.g., tour not found)
//     res.status(404).json({ message: "Tour not found" });
//   }
// };
const deleteTour = async(req, res) => {
  const {tourId} = req.params;
  if(!mongoose.Types.ObjectId.isValid(tourId)){
    res.status(400).json({message: "Invalid tour Id"});
  }
  try{
    const deletedTour = await Tour.findOneAndDelete({_id: tourId});
    if (deletedTour){
      res.status(200).json({message: "Tour deleted successfully."});

    }else{
      res.status(404).json({message: "Tour not found"});
    }
  }catch (error){
    res.status(500).json({message: "Failed to delete tour"});
  }
};




module.exports = {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
};

