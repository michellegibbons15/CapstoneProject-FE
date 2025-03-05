import React, { useState, useEffect } from "react";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  addMonths,
  subMonths,
  isBefore,
  parseISO,
} from "date-fns";
import "../../Styles/Dashboard/Calendar.css";

const API_URL = "http://localhost:8081/api/events";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [eventText, setEventText] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);

  // Fetch all events from the backend
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setEvents(data.data || []))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);
  
// helper function to reset form 
const resetForm = () => {
  setSelectedDate(null);
  setEventText("");
  setEventTime("");
  setEditingEvent(null);
};

// create an event
  const createEvent = async () => {
    if (!eventText.trim() || !eventTime.trim() || !selectedDate) return;
  
    const eventData = {
      title:eventText,
      date: format(selectedDate, "yyyy-MM-dd"),
      time: eventTime,
      userId: 1
    };
  
    try {
      const response = await fetch(`${API_URL}/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });
  
      if (response.ok) {
        const newEvent = await response.json();
        setEvents([...events, newEvent.data]); // Update event list
        resetForm();
      }
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };
  
  //edit an event
  const editEvent = async () => {
    if (!eventText.trim() || !eventTime.trim() || !editingEvent) return;
  
    const updatedEvent = {
      title: eventText,
      date: format(selectedDate, "yyyy-MM-dd"),
      time: eventTime,
      userId: 1,
    };
  
    try {
      const response = await fetch(`${API_URL}/${editingEvent.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEvent),
      });
  
      if (response.ok) {
        setEvents(events.map(event =>
          event.id === editingEvent.id ? { ...event, ...updatedEvent } : event
        ));
        resetForm();
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };
// delete an event
  const deleteEvent = async (eventId) => {
    try {
      const response = await fetch(`${API_URL}/${eventId}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        setEvents(events.filter(event => event.id !== eventId)); // Remove from list
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  // Start editing event
  const startEditing = (event) => {
    setEditingEvent(event);
    setSelectedDate(parseISO(event.date));
    setEventText(event.title);
    setEventTime(event.time);
  };

  // Current date in EST
  const nowEST = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
  });
  const nowESTDate = new Date(nowEST);

  // Separate past and upcoming events
  const upcomingEvents = events.filter((event) =>
    isBefore(nowESTDate, parseISO(event.date))
  );
  const pastEvents = events.filter((event) =>
    isBefore(parseISO(event.date), nowESTDate)
  );

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const firstDayIndex = startOfMonth(currentDate).getDay();
  const emptyDays = Array(firstDayIndex).fill(null);

  return (
    <div className="calendar">
      <div className="calendar-header">
        <h2>{format(currentDate, "MMMM yyyy")}</h2>
        <button onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
          ← Prev
        </button>
        <button onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
          Next →
        </button>
        <div className="calendar-days-header">
          {[
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ].map((day) => (
            <div key={day} className="calendar-day-name">
              {day}
            </div>
          ))}
        </div>
        <div className="calendar-days">
          {emptyDays.map((_, index) => (
            <div key={`empty-${index}`} className="calendar-day"></div>
          ))}
          {daysInMonth.map((day) => (
            <div
              className="calendar-days"
              key={day}
              onClick={() => setSelectedDate(day)}
            >
              {format(day, "d")}
            </div>
          ))}
        </div>

        {/* Event Form */}
        {selectedDate && (
          <div className="event-form">
            <h4>
              {editingEvent ? `Edit Event` : `Add Event`} for
              {format(selectedDate, "PPP")}
            </h4>
            <input
              type="text"
              value={eventText}
              onChange={(e) => setEventText(e.target.value)}
              placeholder="Event description"
            />
            <input
              type="time"
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
            />
            <button onClick={editingEvent ? editEvent : createEvent}>
              {editingEvent ? "Update" : "Add"}
            </button>
            <button onClick={resetForm}>Cancel</button>
          </div>
        )}
      </div>

      {/* Events List */}
      <div className="events">
        <h3>Upcoming Events</h3>
        {upcomingEvents.length === 0 ? (
          <p>No upcoming events</p>
        ) : (
          upcomingEvents.map((event) => (
            <div key={event.id} className="event-item">
              <strong>{format(parseISO(event.date), "PPP")}</strong>:{" "}
              {event.text} at {event.time}
              <button onClick={() => startEditing(event)}>Edit</button>
              <button onClick={() => deleteEvent(event.id)}>Delete</button>
            </div>
          ))
        )}

        <h3>Past Events</h3>
        {pastEvents.length === 0 ? (
          <p>No past events</p>
        ) : (
          pastEvents.map((event, index) => (
            <div key={index} className="event-item">
              <strong>{format(parseISO(event.date), "PPP")}</strong>:{" "}
              {event.text} at {event.time}
              <button onClick={() => startEditing(event)}>Edit</button>
              <button onClick={() => deleteEvent(event.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Calendar;
