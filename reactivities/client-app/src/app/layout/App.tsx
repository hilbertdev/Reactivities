import React, { Fragment, useEffect } from 'react';
import './styles.css';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';


function App() {
  const {activityStore} = useStore();
  useEffect(() => {
    activityStore.loadAcitvities()
  })
  if (activityStore.loading) return <LoadingComponent content='Loading app' />
  return (
    <Fragment>
           <NavBar />
       <Container style={{marginTop: '7em'}}>
         <ActivityDashboard />
       </Container>
      </Fragment> 
  );
}

export default App;
