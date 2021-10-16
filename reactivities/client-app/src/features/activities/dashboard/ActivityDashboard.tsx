import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/layout/models/Activity";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";
import ActivityDetails from "./details/ActivityDetails";
interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode: boolean;
    closeForm: () => void;
    openForm: (id: string) => void;
    createOrEdit: (activity: Activity) => void;
    handleDelete: (id: string) => void;
}
export default function ActivityDashboard(
    {activities, 
    selectActivity, 
    selectedActivity, 
    cancelSelectActivity, 
    editMode, 
    closeForm, 
    createOrEdit,
    handleDelete,
    openForm}: Props) {
    return (
        <Grid>
            <Grid.Column width= '10'>
                <ActivityList activities={activities} selectActivity={selectActivity} handleDelete={handleDelete} />
            </Grid.Column>
            <Grid.Column width= '6'>
                {selectedActivity && !editMode &&
               <ActivityDetails 
               activity={selectedActivity} 
               cancelSelectActivity={cancelSelectActivity} 
               openForm={openForm}
               />}
               {editMode && <ActivityForm closeForm={closeForm} activity={selectedActivity} createOrEdit={createOrEdit} />}
            </Grid.Column>
        </Grid>
    )
}