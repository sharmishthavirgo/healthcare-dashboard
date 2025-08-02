import React from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const barData = months.map((month) => ({
  month,
  patients: Math.floor(Math.random() * 100) + 20,
}));

const statusData = [
  { name: 'Active', value: Math.floor(Math.random() * 100) + 50 },
  { name: 'Inactive', value: Math.floor(Math.random() * 50) + 10 },
  { name: 'Critical', value: Math.floor(Math.random() * 20) + 5 },
];

const COLORS = ['#4caf50', '#ff9800', '#f44336'];
const DashboardPage: React.FC = () => {
  return (
     <Container maxWidth="lg" sx={{ py: 3, flexGrow: 1 }}>
     <Typography variant="h4" gutterBottom>Dashboard Overview</Typography>
      <Typography variant="body1" gutterBottom>
        Welcome to the Healthcare Dashboard. Here you will see key metrics and recent activities.
      </Typography>
      <Grid container spacing={3}>
        <Grid>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Patient Visits by Month</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="patients" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid >
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Patient Status Distribution</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name }) => name}
                  outerRadius={80}
                  fill="#8884d8"
                >
                  {statusData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
// const DashboardPage: React.FC = () => {
//   return (
//     <Box>
//       <Typography variant="h4" gutterBottom>Dashboard Overview</Typography>
//       <Typography variant="body1">
//         Welcome to the Healthcare Dashboard. Here you will see key metrics and recent activities.
//       </Typography>
//     </Box>
//   );
// };

export default DashboardPage;
