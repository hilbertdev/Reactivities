import React, { Fragment } from 'react';
import './styles.css';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import HomePage from '../../features/Home/HomePage';
import { Route, Routes } from 'react-router-dom';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/dashboard/details/ActivityDetails';


function App() {
  return (
    <Fragment>
           <NavBar />
       <Container style={{marginTop: '7em'}}>
         <Routes>
         <Route path='/' element={<HomePage/>} />
          <Route path='/activities' element={<ActivityDashboard/>} />
          <Route path='/activities/:id' element={<ActivityDetails/>} />
          <Route path='/createActivity' element={<ActivityForm/>} />
          <Route path={['/createActivity', 'manage/:id']} element={<ActivityForm/>} />
         </Routes>
        
       </Container>
      </Fragment> 
  );
}

export default App;
