module.exports = app => {
  const mongoose = app.mongoose;
  const ObjectId = mongoose.Schema.Types.ObjectId;
  const Mixed = mongoose.Schema.Types.Mixed;
  const RoadSchema = new mongoose.Schema({
    touches: {
      type: Array
    }
  });

  return mongoose.model('Road', RoadSchema);
};
