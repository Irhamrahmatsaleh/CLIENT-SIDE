import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react"
import Sidebar, { sideButton } from "../component/sidebar"
import ProfileCard from "../component/profileCard"
import Profile from "../component/profileCard";
import React from "react";
import FollowComponent from "../component/followingTab";

export default function followTab()
{
    return (

        <Flex justifyContent={'start'} bg='circle.followBg' maxHeight={'733px'}>
        {Sidebar(sideButton.follow)}
        <Flex flexDirection={'column'} width={'40%'}>
        <FollowComponent />
        </Flex>
        <ProfileCard />
        </Flex>
        
    )
}