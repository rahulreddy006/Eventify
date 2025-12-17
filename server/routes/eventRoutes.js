const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
  rsvpEvent,
  unRsvpEvent,
} = require("../controllers/eventController");

router.get("/", getEvents);
router.post("/", auth, upload.single("image"), createEvent);
router.put("/:id", auth, updateEvent);
router.delete("/:id", auth, deleteEvent);
router.post("/:id/rsvp", auth, rsvpEvent);
router.post("/:id/unrsvp", auth, unRsvpEvent);

module.exports = router;
