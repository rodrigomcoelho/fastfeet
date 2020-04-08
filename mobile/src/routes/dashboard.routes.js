import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DeliveryStack from './dashboard.delivery.routes';
import Profile from '~/pages/Profile';

import { DeliveryIcon, ProfileIcon } from './IconsRoute';

const Tab = createBottomTabNavigator();

export default function Dashboard() {
  return (
    <>
      <Tab.Navigator
        tabBarOptions={{
          keyboardHidesTabBar: true,
          showIcon: true,
          activeTintColor: '#7D40E7',
          inactiveTintColor: '#999',
          style: {
            backgroundColor: '#fafafa',
          },
          labelStyle: {
            padding: 0,
            marginBottom: 8,
            marginTop: -8,
            fontSize: 12,
          },
        }}>
        <Tab.Screen
          name="DeliveryStack"
          component={DeliveryStack}
          options={{
            tabBarIcon: DeliveryIcon,
            title: 'Entregas',
          }}
        />

        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ProfileIcon,
            title: 'Meu Perfil',
          }}
        />
      </Tab.Navigator>
    </>
  );
}
