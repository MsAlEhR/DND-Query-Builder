import React from 'react';
import ErrorPage from './ErrorPage';

function action() {
  return {
    title: 'User Management',
    component: <ErrorPage />,
  };
}

export default action;
