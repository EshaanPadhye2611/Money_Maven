import React, { useState } from "react";

const advisorsData = {
  "term-life": [
    { id: 1, name: "Amit Sharma", experience: "12 years", contact: "+91 9876543210", availableSlots: ["10:00 AM", "2:00 PM"] },
    { id: 2, name: "Priya Verma", experience: "9 years", contact: "+91 8765432109", availableSlots: ["11:30 AM", "3:30 PM"] }
  ],
  "health": [
    { id: 3, name: "Dr. Rajesh Mehta", experience: "15 years", contact: "+91 9988776655", availableSlots: ["9:00 AM", "1:00 PM"] }
  ],
  "auto": [
    { id: 4, name: "Sneha Iyer", experience: "10 years", contact: "+91 9123456789", availableSlots: ["10:30 AM", "4:00 PM"] }
  ]
};

const AdvisorySystem = () => {
  const [selectedInsurance, setSelectedInsurance] = useState("");
  const [selectedAdvisor, setSelectedAdvisor] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [appointmentConfirmed, setAppointmentConfirmed] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState(null); // Store appointment details

  const handleSelectInsurance = (e) => {
    setSelectedInsurance(e.target.value);
    setSelectedAdvisor(null);
    setSelectedDate("");
    setSelectedSlot("");
    setAppointmentConfirmed(false);
    setAppointmentDetails(null);
  };

  const handleBookAppointment = () => {
    if (!selectedAdvisor || !selectedSlot || !selectedDate) {
      alert("Please select an advisor, date, and time slot.");
      return;
    }

    // Locally storing appointment details
    setAppointmentDetails({
      advisorName: selectedAdvisor.name,
      contact: selectedAdvisor.contact,
      date: selectedDate,
      timeSlot: selectedSlot
    });

    setAppointmentConfirmed(true);

    // Hide toast after 3 seconds
    setTimeout(() => setAppointmentConfirmed(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 animate-fadeIn">Insurance Advisory</h2>

      {/* Insurance Type Selector */}
      <select
        onChange={handleSelectInsurance}
        className="w-64 p-3 border rounded-lg shadow-sm bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 transition-all"
      >
        <option value="">Select Insurance Type</option>
        <option value="term-life">Term Life Insurance</option>
        <option value="health">Health Insurance</option>
        <option value="auto">Auto Insurance</option>
      </select>

      {/* Advisor List */}
      {selectedInsurance && (
        <div className="mt-6 w-full max-w-md bg-white p-5 shadow-lg rounded-lg animate-fadeIn">
          <h3 className="text-xl font-semibold text-gray-800">Available Advisors</h3>
          {advisorsData[selectedInsurance].map((advisor) => (
            <div key={advisor.id} className="border-b py-4 transition-transform transform hover:scale-105">
              <h4 className="text-lg font-medium">{advisor.name}</h4>
              <p className="text-gray-600">Experience: {advisor.experience}</p>
              <p className="text-gray-600">Contact: {advisor.contact}</p>

              {/* Date Picker */}
              <p className="mt-2 text-gray-700">Select Date:</p>
              <input
                type="date"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />

              {/* Available Slots */}
              <p className="mt-2 text-gray-700">Available Slots:</p>
              <div className="flex flex-wrap gap-2">
                {advisor.availableSlots.map((slot) => (
                  <button
                    key={slot}
                    className={`px-3 py-1 border rounded-lg shadow-sm transition-all ${
                      selectedSlot === slot ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-blue-400 hover:text-white"
                    }`}
                    onClick={() => {
                      setSelectedAdvisor(advisor);
                      setSelectedSlot(slot);
                    }}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirm Button */}
      {selectedAdvisor && selectedDate && (
        <button
          onClick={handleBookAppointment}
          className="mt-4 px-5 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-all"
        >
          Confirm Appointment
        </button>
      )}

      {/* Confirmation Toast Message */}
      {appointmentConfirmed && appointmentDetails && (
        <div className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg animate-slideIn">
          ✅ Appointment Confirmed with {appointmentDetails.advisorName} on {appointmentDetails.date} at {appointmentDetails.timeSlot}!
        </div>
      )}
    </div>
  );
};

export default AdvisorySystem;
