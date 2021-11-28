import React, { Fragment } from 'react';
import './styles.css';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import HomePage from '../../features/Home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/dashboard/details/ActivityDetails';
import { Route, Switch, useLocation } from 'react-router-dom';


export default function App() {
  const location = useLocation()
  return (
    <Fragment>
           <NavBar />
       <Container style={{marginTop: '7em'}}>
       <Switch>
       <Route exact path='/' component={HomePage} />
            <Route exact path='/activities' component={ActivityDashboard} />
            <Route path='/activities/:id' component={ActivityDetails} />
            <Route key={location.key}  path={['/createActivity', '/manage/:id']} component={ActivityForm} />
        </Switch>
       </Container>
      </Fragment> 
  );
}

