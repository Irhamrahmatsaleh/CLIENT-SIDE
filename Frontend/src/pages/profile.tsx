import { Flex } from "@chakra-ui/react";
import { forms, profileThreads } from "../component/threadsform";
import ThreadsProfile from '../component/profileThreads'
import Sidebar, { sideButton } from "../component/sidebar";
import Profile from "../component/profileCard";
import React from "react";

export default function profile()
{
    const bgColor = '#1D1D1D'
    return (
        <Flex justifyContent={'start'} bg={bgColor} maxHeight={'733px'}>
        {Sidebar(sideButton.profile)}
        <Flex flexDirection={'column'} width={'40%'}>
        {forms(profileThreads)}
        <ThreadsProfile />
        </Flex>
        <Profile />
        </Flex>
    )
}