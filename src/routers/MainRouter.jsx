import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { UserScreen } from '../components/users/UserScreen';
import { HomeScreen } from '../components/home/HomeScreen';
import { Layout } from '../components/ui/Layout';
import { Login } from '../components/login/Login';
import { ExerciseScreen } from '../components/exercises/ExerciseScreen';
import { WorkoutEventScreen } from '../components/workoutEvent/WorkoutEventScreen';
import { PermissionScreen } from '../components/permission/PermissionScreen';
import { HealthScreen } from '../components/health/HealthScreen';
import { PostScreen } from '../components/post/PostScreen';
import { SubscriptionScreen } from '../components/subscription/SubscriptionScreen';
import { EventMemberScreen } from '../components/eventMember/EventMemberScreen';
import { RoutineScreen } from '../components/routine/RoutineScreen';
import { ExerciseRoutineScreen } from '../components/exerciseRoutine/ExerciseRoutineScreen';

export const MainRouter = () => {
  const userSerialized = localStorage.getItem('user');
  return (
    <Router>
      <div>
        {(userSerialized == null)? (
          <Route>
            <Login />
          </Route>
        ) : 
        (
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
              <Route exact path="/exercises">
                <ExerciseScreen />
              </Route>
              <Route exact path="/workoutEvent">
                <WorkoutEventScreen />
              </Route>
              <Route exact path="/eventMembers">
                <EventMemberScreen />
              </Route>
              <Route exact path="/permission">
                <PermissionScreen />
              </Route>
              <Route exact path="/health">
                <HealthScreen />
              </Route>
              <Route exact path="/post">
                <PostScreen/>
              </Route>
              <Route exact path="/subscription">
                <SubscriptionScreen/>
              </Route>
              <Route exact path="/routines">
                <RoutineScreen/>
              </Route>
              <Route exact path="/exerciseroutines">
                <ExerciseRoutineScreen/>
              </Route>
            </Layout>
          </Switch>
        )}
      </div>
    </Router>
  );
};
