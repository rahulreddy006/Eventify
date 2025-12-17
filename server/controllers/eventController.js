const Event = require("../models/Event");
const cloudinary = require("../config/cloudinary");
const mongoose = require("mongoose");

//craeteEvent

exports.createEvent = async (req, res) => {
  try {
    let imageUrl = "";

    if (req.file) {
  const uploadResult = await cloudinary.uploader.upload(
    `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`
  );
  imageUrl = uploadResult.secure_url;
}


    const event = await Event.create({
      ...req.body,
      imageUrl,
      createdBy: req.user,
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: "Event creation failed" });
  }
};


//get Evrnts
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("createdBy", "name");
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch events" });
  }
};


//update events
exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid event ID" });

    const event = await Event.findById(id);
    if (!event)
      return res.status(404).json({ message: "Event not found" });

    if (event.createdBy.toString() !== req.user)
      return res.status(403).json({ message: "Unauthorized" });

    Object.assign(event, req.body);
    await event.save();

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Event update failed" });
  }
};

//delete events

exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid event ID" });

    const event = await Event.findById(id);
    if (!event)
      return res.status(404).json({ message: "Event not found" });

    if (event.createdBy.toString() !== req.user)
      return res.status(403).json({ message: "Unauthorized" });

    await event.deleteOne();
    res.json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ message: "Event deletion failed" });
  }
};

//rsvp event
exports.rsvpEvent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid event ID" });

    const event = await Event.findOneAndUpdate(
      {
        _id: id,
        attendees: { $ne: req.user },
        $expr: { $lt: [{ $size: "$attendees" }, "$capacity"] },
      },
      { $push: { attendees: req.user } },
      { new: true }
    );

    if (!event)
      return res
        .status(400)
        .json({ message: "Event full or already joined" });

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "RSVP failed" });
  }
};


//un rsvp event
exports.unRsvpEvent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid event ID" });

    const event = await Event.findByIdAndUpdate(
      id,
      { $pull: { attendees: req.user } },
      { new: true }
    );

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Un-RSVP failed" });
  }
};

