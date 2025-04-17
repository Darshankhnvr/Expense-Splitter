"use client";
import React from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import { styled } from '@mui/system';

// Super-modern glass card
const GlassCard = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(20px)',
  borderRadius: '20px',
  padding: '30px',
  boxShadow: '0 0 20px rgba(0,255,255,0.1)',
  transition: '0.3s ease',
  '&:hover': {
    boxShadow: '0 0 40px rgba(0,255,255,0.2)',
    transform: 'scale(1.02)',
  },
}));

const GradientBox = styled(Box)({
  minHeight: '100vh',
  background: 'radial-gradient(circle at top left, #0f2027, #203a43, #2c5364)',
  color: '#ffffff',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  padding: '40px 20px',
});

const NeonButton = styled(Button)({
  background: 'transparent',
  border: '2px solid #00e5ff',
  color: '#00e5ff',
  padding: '12px 30px',
  borderRadius: '50px',
  fontWeight: 'bold',
  fontSize: '1rem',
  marginTop: '30px',
  transition: '0.3s ease',
  '&:hover': {
    background: '#00e5ff',
    color: '#000',
  },
});

const LandingPage = () => {
  return (
    <GradientBox>
      <Container maxWidth="md">
        <Typography
          variant="h2"
          sx={{
            fontWeight: '900',
            fontSize: { xs: '2.5rem', md: '4rem' },
            lineHeight: '1.2',
            background: 'linear-gradient(to right, #00e5ff, #ff00cc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Expense Splitting. AI Budgeting. Done Right.
        </Typography>

        <Typography variant="h6" sx={{ mt: 3, color: '#bbb' }}>
          Say goodbye to money stress. Track, split, and optimize your budget using smart AI recommendations.
        </Typography>

        <NeonButton href="/app">Launch Planner</NeonButton>

        <Grid container spacing={3} sx={{ mt: 8 }} justifyContent="center">

          {[
            {
              title: 'Smart AI Insights',
              desc: 'Let AI find where you overspend and suggest savings.',
            },
            {
              title: 'Effortless Splitting',
              desc: 'Split with friends or family, no drama, no math.',
            },
            {
              title: 'Secure + Local',
              desc: 'Your data stays on your device. Fully private.',
            },
          ].map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <GlassCard>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#ccc' }}>
                  {item.desc}
                </Typography>
              </GlassCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </GradientBox>
  );
};

export default LandingPage;
