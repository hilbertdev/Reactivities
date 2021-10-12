import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
interface Props {
    createActivityToggle: (setActivity: boolean) => void;
    createActivity: boolean;
}

export default function NavBar({createActivityToggle, createActivity}: Props) {
    return (
        <Menu inverted fixed='top'>
<Container>
    <Menu.Item header>
      <img src ="assets/logo.png" alt="logo" style={{marginRight: 10}}/>
    </Menu.Item>
    <Menu.Item name="Activities" />
    <Menu.Item>
        <Button positive content = 'Create Activity' onClick={() => createActivityToggle(createActivity)}/>
    </Menu.Item>
</Container>
        </Menu>
    )
}