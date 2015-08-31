function plantsCreate (req,res) {
  User.findById(req.user.id, function (err, user) {
    Plant.create(req.body, function (err, plant) {
      user.plants.push(plant);
      user.save();
      res.json({ plant: plant});
    })
  })
}

function plantsIndex (req,res) {
  Plant.find({}).populate("_owner").exec(function (err,plants) {
    res.json(plants);
  });
}

function plantsUpdate (req,res) {
  
  Plant.findById(req.params.id, function (err, plant) {
    if (plants._owner == req.user.id)
      plant.
        
  })
}

function plantsDelete (req,res) {
  Plant.findByIdAndRemove(req.params.id, function (err, plant) {
    if (err) res.send(err);
    res.json({ message: "Plant deleted"});
  })
}
function plantsShow (req,res) {
  Plant.findById(req.params.id, function (err, plant) {
    if(err) res.send(err);
    res.json(plant)
  })
}

module.exports = {
  plantsShow: plantsShow,
  plantsIndex: plantsIndex,
  plantsDelete: plantsDelete,
  plantsCreate: plantsCreate
}