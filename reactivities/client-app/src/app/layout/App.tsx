import React, { Fragment, useEffect, useState } from 'react';
import './styles.css';
import { Container } from 'semantic-ui-react';
import { Activity } from './models/Activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';


function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState (false);
  const [loading, setLoading] =  useState(true);
  useEffect(() => {
    agent.Activities.list().then(response => {
      setActivities(response);
      setLoading(false);
    })
  }, [])
  function handleFormOpen(id?: string){
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
    console.log('here')
  }
  function handleFormClose() {
    setEditMode(false);
  }

  function handleSelectActivity(id: string){
    setSelectedActivity(activities.find(x => x.id === id))
  }
  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }
  function handleCreateOrEditActivity(activity : Activity) {
    activity.id 
    ? setActivities([...activities.filter( x => x.id !== activity.id), activity])
    : setActivities([...activities, {...activity, id: uuid()}]);
    setEditMode(false);
    setSelectedActivity(activity);
  }
  function handleDeleteActivity(id: string) {
    setActivities([...activities.filter(x => x.id !== id)]);
  }
  if (loading) return <LoadingComponent content='Loading app' />
  return (
    <Fragment>
           <NavBar 
           openForm={handleFormOpen}
            />
       <Container style={{marginTop: '7em'}}>
         <ActivityDashboard 
         activities={activities} 
         selectedActivity={selectedActivity}
         selectActivity={handleSelectActivity}
         cancelSelectActivity={handleCancelSelectActivity}
         editMode = {editMode}
         openForm = {handleFormOpen}
         closeForm ={handleFormClose}
         createOrEdit={handleCreateOrEditActivity}
         handleDelete={handleDeleteActivity}
         />
       </Container>
      </Fragment> 
  );
}

export default App;
