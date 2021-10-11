import React from "react";
import { act } from "react-dom/test-utils";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/layout/models/Activity";

interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void;
}
export default function ActivityList({activities,selectActivity } : Props) {
    return (
           <Segment>
               <Item.Group divided>
                 {activities.map(activity => (
                     <Item key={activity.id}>
                         <Item.Content>
                             <Item.Header as='a'>
                                    {activity.title}
                             </Item.Header>
                             <Item.Meta>
                                 {activity.date}
                             </Item.Meta>
                             <Item.Description>
                                 <Item.Extra>
                                     <Button onClick={() => selectActivity(activity.id)} floated= 'right' content='View' color='blue' />
                                     <Label basic content={activity.category} />
                                 </Item.Extra>
                             </Item.Description>
                         </Item.Content>
                     </Item>
                 ))}
               </Item.Group>
           </Segment>
    )
}