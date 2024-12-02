import React from "react";
import CountsCard from "./CountsCard";
import CategoryChart from "./CategoryChart";
import WeeklyStatCard from "./WeeklyStatCard";
import WorkoutCard from "./WorkoutCard";
import { counts } from "./data";
import FitnessCalendar from "./FitnessCalendar";
import {
  Box,
  Stack,
  Container,
  ThemeProvider,
  CssBaseline,
  Typography
} from '@mui/material/';
import {createTheme} from '@mui/material/styles'
import { useSelector } from "react-redux";

// Create a custom dark theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B3B3B3",
    },
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
  },
  typography: {
    h3: {
      color: "#FFFFFF",
    },
    body1: {
      color: "#B3B3B3",
    },
  },
});

const Dashboard = () => {
  const user = useSelector((state) => state.user)
  console.log('user in dashboard: ',user);
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container
        sx={{
          paddingTop: "10vh",
          backgroundColor: "background.default",
          color: "text.primary",
        }}
      >
        <Typography variant="h5" align="left" gutterBottom>Welcome, {user.firstname}</Typography>
        <Stack spacing={3}>
          {/* Counts Cards Section */}
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            {counts.map((count, index) => (
              <Box
                key={index}
                sx={{
                  flex: 1,
                  backgroundColor: "background.paper",
                  borderRadius: 2,
                  padding: 2,
                }}
              >
                <CountsCard
                  name={count.name}
                  icon={count.icon}
                  desc={count.desc}
                  value={"100"} // Example value for display purposes
                  color={count.color}
                  lightColor={count.lightColor}
                />
              </Box>
            ))}
          </Stack>

          {/* Category Chart and Weekly Stats Section */}
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <Box
              sx={{
                flex: 2,
                backgroundColor: "background.paper",
                borderRadius: 2,
                padding: 2,
              }}
            >
              <CategoryChart data={counts} />
            </Box>
            <Box
              sx={{
                flex: 1,
                backgroundColor: "background.paper",
                borderRadius: 2,
                padding: 2,
              }}
            >
              <WeeklyStatCard data={counts} />
            </Box>
          </Stack>

          {/* Workout Card Section */}
          <Box
            sx={{
              backgroundColor: "background.paper",
              borderRadius: 2,
              padding: 2,
            }}
          >
            <WorkoutCard />
          </Box>
        </Stack>
      </Container>
      <Container maxWidth="lg">
      <Box sx={{ marginTop: 4 }}>

        {/* Fitness Calendar */}
        <FitnessCalendar />
      </Box>
    </Container>
    </ThemeProvider>
  );
};

export default Dashboard;
