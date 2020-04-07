import React from 'react';
import Login from './Login';
import { PageType } from '../../constants/general';
import AppLayout from '../../components/AppLayout';

const title = 'User Management';

function action() {
  // const dispatch = context.store.dispatch;
  // dispatch(loginReset());
  return {
    chunks: ['login'],
    title,
    component: (
      <AppLayout type={PageType.RAW}>
        <Login title={title} />
      </AppLayout>
    ),
  };
}

export default action;
