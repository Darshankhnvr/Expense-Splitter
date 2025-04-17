// "use client"
// import React, { useState } from 'react';
// import { Grid, Typography, TextField, Button, Paper, Box, Card, CardContent, Divider } from '@mui/material';
// import { styled } from '@mui/system';

// const GradientBox = styled(Box)({
//   background: 'linear-gradient(45deg, #00bcd4, #8e24aa)', // Gradient background
//   borderRadius: '10px',
//   padding: '20px',
// });

// const PaperStyled = styled(Paper)({
//   background: 'rgba(255, 255, 255, 0.15)',
//   backdropFilter: 'blur(10px)',
//   borderRadius: '15px',
//   padding: '30px',
//   boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
// });

// const CardStyled = styled(Card)({
//   background: 'rgba(0, 0, 0, 0.1)',
//   borderRadius: '12px',
//   padding: '20px',
//   transition: 'transform 0.3s ease',
//   '&:hover': {
//     transform: 'scale(1.05)',
//   },
// });

// const Page = () => {
//   const [expense, setExpense] = useState({ name: '', amount: '' });
//   const [expenses, setExpenses] = useState([]);
//   const [totalExpense, setTotalExpense] = useState(0);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setExpense((prev) => ({ ...prev, [name]: value }));
//   };

//   const addExpense = () => {
//     if (expense.name && expense.amount) {
//       const newExpense = { name: expense.name, amount: parseFloat(expense.amount) };
//       setExpenses((prev) => [...prev, newExpense]);
//       setTotalExpense((prev) => prev + newExpense.amount);
//       setExpense({ name: '', amount: '' });
//     }
//   };

//   const handleAIPlanner = () => {
//     alert('AI Budget Planner triggered!');
//   };

//   return (
//     <GradientBox>
//       {/* Header Section */}
//       <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>
//         Local Expense Splitter with AI Budget Planner
//       </Typography>

//       {/* Expense Input Form */}
//       <PaperStyled>
//         <Typography variant="h5" sx={{ color: '#fff', marginBottom: 2 }}>
//           Add Expense
//         </Typography>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Expense Name"
//               variant="outlined"
//               fullWidth
//               name="name"
//               value={expense.name}
//               onChange={handleInputChange}
//               sx={{
//                 '& .MuiOutlinedInput-root': {
//                   background: 'rgba(255, 255, 255, 0.2)',
//                   borderRadius: '10px',
//                 },
//               }}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Amount"
//               variant="outlined"
//               fullWidth
//               name="amount"
//               value={expense.amount}
//               onChange={handleInputChange}
//               type="number"
//               sx={{
//                 '& .MuiOutlinedInput-root': {
//                   background: 'rgba(255, 255, 255, 0.2)',
//                   borderRadius: '10px',
//                 },
//               }}
//             />
//           </Grid>
//         </Grid>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={addExpense}
//           sx={{
//             marginTop: 2,
//             borderRadius: '50px',
//             background: 'linear-gradient(45deg, #00bcd4, #8e24aa)',
//             '&:hover': {
//               background: 'linear-gradient(45deg, #8e24aa, #00bcd4)',
//             },
//           }}
//         >
//           Add Expense
//         </Button>
//       </PaperStyled>

//       {/* Expenses List */}
//       <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 4 }}>
//         {expenses.length > 0 ? (
//           <Grid item xs={12} sm={8} md={6}>
//             <CardStyled>
//               <CardContent>
//                 <Typography variant="h5" sx={{ color: '#fff', marginBottom: 2 }}>
//                   Expense Summary
//                 </Typography>
//                 {expenses.map((expense, index) => (
//                   <Box key={index}>
//                     <Grid container justifyContent="space-between" alignItems="center">
//                       <Grid item>
//                         <Typography variant="body1" sx={{ color: '#fff' }}>
//                           {expense.name}
//                         </Typography>
//                       </Grid>
//                       <Grid item>
//                         <Typography variant="body1" sx={{ color: '#fff' }}>
//                           ${expense.amount.toFixed(2)}
//                         </Typography>
//                       </Grid>
//                     </Grid>
//                     {index !== expenses.length - 1 && <Divider sx={{ marginY: 1, borderColor: '#fff' }} />}
//                   </Box>
//                 ))}
//                 <Typography variant="h6" sx={{ marginTop: 2, textAlign: 'right', color: '#fff' }}>
//                   Total: ${totalExpense.toFixed(2)}
//                 </Typography>
//               </CardContent>
//             </CardStyled>
//           </Grid>
//         ) : (
//           <Grid item xs={12} sm={8} md={6}>
//             <Typography variant="body1" align="center" sx={{ color: '#fff' }}>
//               No expenses added yet.
//             </Typography>
//           </Grid>
//         )}
//       </Grid>

//       {/* AI Budget Planner Button */}
//       <Box sx={{ marginTop: 4, textAlign: 'center' }}>
//         <Button
//           variant="contained"
//           color="secondary"
//           onClick={handleAIPlanner}
//           sx={{
//             background: 'linear-gradient(45deg, #8e24aa, #00bcd4)',
//             borderRadius: '50px',
//             '&:hover': {
//               background: 'linear-gradient(45deg, #00bcd4, #8e24aa)',
//             },
//           }}
//         >
//           Use AI Budget Planner
//         </Button>
//       </Box>
//     </GradientBox>
//   );
// };

// export default Page;
"use client"

import React from 'react'
import LandingPage from './Landingpage'

const page = () => {
  return (
    <div>
      <LandingPage />
    </div>
  )
}

export default page
