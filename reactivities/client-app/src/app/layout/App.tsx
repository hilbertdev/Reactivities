import React, { Fragment, useEffect, useState } from 'react';
import './styles.css';
import axios  from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from './models/Activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';


function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [createActivity, setCreateActivity] = useState (false);
  useEffect(() => {
    axios.get<Activity[]>("http://localhost:5000/api/activities").then(response => {
      console.log(response);
      setActivities(response.data);
    })
  }, [])
  function toggleCreateActivity() {
       setCreateActivity(createActivity => !createActivity)
  }

  function handleSelectActivity(id: string){
    setSelectedActivity(activities.find(x => x.id === id))
  }
  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }
  return (
    <Fragment>
           <NavBar 
          createActivityToggle ={toggleCreateActivity}
          createActivity={createActivity}
            />
       <Container style={{marginTop: '7em'}}>
         <ActivityDashboard 
         activities={activities} 
         selectedActivity={selectedActivity}
         selectActivity={handleSelectActivity}
         cancelSelectActivity={handleCancelSelectActivity}
         createActivity = {createActivity}
         />
       </Container>
      </Fragment> 
  );
}

export default App;
