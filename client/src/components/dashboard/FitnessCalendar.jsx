// FitnessCalendar.jsx

import React, { useState } from "react";
import styled from "styled-components";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers";
import { Card, Typography, Box } from "@mui/material";
import dayjs from "dayjs";

// Styled components
const CalendarContainer = styled(Box)`
  display: flex;
  justify-content: center;
  padding: 20px;
  margin-top: 20px;
  gap: 20px; /* Space between calendar and workout details */
`;

const CalendarWrapper = styled(Box)`
  flex: 1; /* Take available space for the calendar */
`;

const WorkoutWrapper = styled(Box)`
  flex: 0.35;
  max-width: 400px;
  padding: 20px;
  margin-top: 20px;
  border-radius: 8px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #333; /* Dark theme background */
  color: #fff; /* White text for dark theme */
`;

// Mock Workout Data (more dates)
const mockWorkouts = [
  { date: "2024-12-01", title: "Morning Yoga", description: "A full body stretch and relaxation session." },
  { date: "2024-12-05", title: "HIIT Workout", description: "High-intensity interval training for endurance." },
  { date: "2024-12-10", title: "Strength Training", description: "Focus on building muscle with weights." },
  { date: "2024-12-15", title: "Cardio Run", description: "5k run for cardio endurance." },
];

// Main component
const FitnessCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  // Function to check if a date has a workout
  const hasWorkoutOnDate = (date) => {
    return mockWorkouts.some(workout => dayjs(workout.date).isSame(date, 'day'));
  };

  // Get workout details for the selected date
  const getWorkoutForSelectedDate = (date) => {
    const workout = mockWorkouts.find(workout => dayjs(workout.date).isSame(date, 'day'));
    return workout || null;
  };

  // Handle day selection
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    const workout = getWorkoutForSelectedDate(newDate);
    setSelectedWorkout(workout);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CalendarContainer>
        {/* Calendar Wrapper */}
        <CalendarWrapper>
          <DateCalendar
            value={selectedDate}
            onChange={handleDateChange}
            renderDay={(day, _value, DayComponent) => {
              const workoutOnThisDay = hasWorkoutOnDate(day);
              return (
                <div>
                  {/* Custom rendering for days with workouts */}
                  <DayComponent />
                  {workoutOnThisDay && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: 2,
                        right: 2,
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        backgroundColor: "pink",
                      }}
                    />
                  )}
                </div>
              );
            }}
          />
        </CalendarWrapper>

        {/* Workout Details */}
        <WorkoutWrapper>
          <Typography variant="h6">Workout on {selectedDate.format("MMMM DD, YYYY")}</Typography>
          {selectedWorkout ? (
            <>
              <WorkoutTitle>{selectedWorkout.title}</WorkoutTitle>
              <WorkoutDescription>{selectedWorkout.description}</WorkoutDescription>
            </>
          ) : (
            <Typography>No workouts done today!</Typography>
          )}
        </WorkoutWrapper>
      </CalendarContainer>
    </LocalizationProvider>
  );
};

// Styled components for workout details
const WorkoutTitle = styled(Typography)`
  font-weight: bold;
  font-size: 18px;
`;

const WorkoutDescription = styled(Typography)`
  font-size: 14px;
  margin-top: 10px;
`;

export default FitnessCalendar;
