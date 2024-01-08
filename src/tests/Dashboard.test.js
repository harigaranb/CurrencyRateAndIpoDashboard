import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from '../components/Dashboard';

describe('Dashboard Component', () => {
  test('renders welcome message and navigation links', () => {
    const user = { username: 'JohnDoe' };
    render(
      <Router>
        <Dashboard user={user} />
      </Router>
    );

    // Check if the welcome message is rendered
    expect(screen.getByText('Welcome, JohnDoe!')).toBeInTheDocument();

    // Check if navigation links are rendered
    expect(screen.getByText('IPO Calendar')).toBeInTheDocument();
    expect(screen.getByText('Currency Exchange Rates')).toBeInTheDocument();
  });

  // Add more test cases as needed
});
