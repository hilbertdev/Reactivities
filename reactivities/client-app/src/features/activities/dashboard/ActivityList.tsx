import React from "react";
import { SyntheticEvent } from "react";
import { useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/layout/models/Activity";

interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void;
    handleDelete: (id: string) => void;
    submitting: boolean;
}
export default function ActivityList({activities,selectActivity, handleDelete, submitting } : Props) {

    const [target, setTarget] = useState('');
    function handleAcivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string)
    {
        setTarget(e.currentTarget.name);
        handleDelete(id);
    }
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
                                     <Button 
                                     name={activity.id}
                                     loading={submitting && target === activity.id} 
                                     onClick={(e) => handleAcivityDelete(e,activity.id)} floated= 'right' content='Delete' color='red' />
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