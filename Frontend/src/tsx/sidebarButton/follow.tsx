import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react"
import Sidebar, { sideButton } from "../sidebar"
import ProfileCard from "../profileCard"
import Profile from "../profileCard";
import React from "react";

export default function followTab()
{
    const bgColor = '#1D1D1D';
    const followTab =
    <Tabs isFitted color={'white'} mt={'2rem'} colorScheme="green">
    <TabList>
        <Tab>Followers</Tab>
        <Tab>Following</Tab>
    </TabList>
    <TabPanels>
        <TabPanel>
        <Text>Followers list</Text>
        </TabPanel>
        <TabPanel>
        <Text>Following list</Text>
        </TabPanel>
    </TabPanels>
    </Tabs>
    
    return (

        <Flex justifyContent={'start'} bg={bgColor} maxHeight={'733px'}>
        {Sidebar(sideButton.follow)}
        <Flex flexDirection={'column'} width={'40%'}>
        {followTab}
        </Flex>
        <ProfileCard />
        </Flex>
        
    )
}