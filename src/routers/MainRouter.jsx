import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { UserForm } from '../components/users/UserForm';
import { UserScreen } from '../components/users/UserScreen';
import { HomeScreen } from '../components/home/HomeScreen';
import { Layout } from '../components/ui/Layout';
import { Login } from '../components/login/Login';
import { ExerciseScreen } from '../components/exercises/ExerciseScreen';
import { WorkoutEventScreen } from '../components/workoutEvent/WorkoutEventScreen';
import { PermissionScreen } from '../components/permission/PermissionScreen';
import { HealthScreen } from '../components/health/HealthScreen';

export const MainRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Layout>
          <Route exact path="/home">
            <HomeScreen />
          </Route>
          <Route exact path="/users">
            <UserScreen />
          </Route>
          <Route exact path="/users/:action/:userId?">
            <UserForm />
          </Route>
          <Route exact path="/exercises">
            <ExerciseScreen />
          </Route>
          <Route exact path="/workoutevents">
            <WorkoutEventScreen />
          </Route>
          <Route exact path="/permission">
            <PermissionScreen />
          </Route>
          <Route exact path="/health">
            <HealthScreen />
          </Route>
        </Layout>
      </Switch>
    </Router>
  );
};
