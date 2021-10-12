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
    createActivity: boolean;
}
export default function ActivityDashboard({activities, selectActivity, selectedActivity, cancelSelectActivity, createActivity}: Props) {
    return (
        <Grid>
            <Grid.Column width= '10'>
                <ActivityList activities={activities} selectActivity={selectActivity} />
            </Grid.Column>
            <Grid.Column width= '6'>
                {selectedActivity &&
               <ActivityDetails activity={selectedActivity} cancelSelectActivity={cancelSelectActivity} />}
               {createActivity && <ActivityForm />}
            </Grid.Column>
        </Grid>
    )
}