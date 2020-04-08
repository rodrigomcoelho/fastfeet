import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import SignIn from '../pages/SignIn';

import Deliveries from '../pages/Deliveries';
import DeliveryRegister from '../pages/Deliveries/Register';
import DeliveryEdit from '../pages/Deliveries/Edit';

import Deliverymen from '../pages/Deliverymen';
import DeliverymanRegister from '../pages/Deliverymen/Register';
import DeliverymanEdit from '../pages/Deliverymen/Edit';

import Recipients from '../pages/Recipients';
import RecipientRegister from '../pages/Recipients/Register';
import RecipientEdit from '../pages/Recipients/Edit';

import Problems from '../pages/Problems';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/deliverymen" exact component={Deliverymen} isPrivate />
      <Route path="/deliveries" exact component={Deliveries} isPrivate />
      <Route path="/recipients" exact component={Recipients} isPrivate />
      <Route path="/problems" component={Problems} isPrivate />

      <Route
        path="/deliveries/register"
        component={DeliveryRegister}
        isPrivate
      />
      <Route path="/deliveries/:id/edit" component={DeliveryEdit} isPrivate />

      <Route
        path="/deliverymen/register"
        component={DeliverymanRegister}
        isPrivate
      />
      <Route
        path="/deliverymen/:id/edit"
        component={DeliverymanEdit}
        isPrivate
      />

      <Route
        path="/recipients/register"
        component={RecipientRegister}
        isPrivate
      />
      <Route path="/recipients/:id/edit" component={RecipientEdit} isPrivate />
    </Switch>
  );
}
