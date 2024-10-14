const Event = require("../models/Event");
// Create Event by User ID
const CreateEvent = async (req, res) => {
  try {
    const eventData = req.body;
    const newEvent = new Event({
      title: eventData.title,
      description: eventData.description,
      start: eventData.start,
      end: eventData.end,
      timeZone: eventData.timeZone,
      userId: eventData.userId,
      slotMinutes: eventData.slotMinutes,
      totalSlots: eventData.totalSlots,
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating event", error });
  }
};
// Fetch events by userId
const getEventsByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    // Find all events by userId
    const events = await Event.find({ userId });

    // If no events found, return a 404 error
    if (events.length === 0) {
        return res.status(200).json({ message: "No events found for this user.", events: [] });
    }

    // Return the list of events
    res.status(200).json({ events });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch events", error });
  }
};

const getEventsById = async (req, res) => {
  const { eventId } = req.params;
  try {
    // Find all events by userId
    const events = await Event.findById(eventId);

    // If no events found, return a 404 error
    if (events.length === 0) {
      return res
        .status(404)
        .json({ message: "No events found for this user." });
    }

    // Return the list of events
    res.status(200).json({ events });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch events", error });
  }
};

module.exports = {
  CreateEvent,
  getEventsByUserId,
  getEventsById,
};
