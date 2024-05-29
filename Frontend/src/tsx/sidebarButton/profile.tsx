import { Flex } from "@chakra-ui/react";
import { forms, profileThreads, threadsForm } from "./home/threadsform";
import Threads from "./home/threads";
import Sidebar, { sideButton } from "../sidebar";
import Profile from "../profileCard";
import React from "react";

export default function profile()
{
    const bgColor = '#1D1D1D'
    return (
        <Flex justifyContent={'start'} bg={bgColor} maxHeight={'733px'}>
        {Sidebar(sideButton.profile)}
        <Flex flexDirection={'column'} width={'40%'}>
        {forms(profileThreads)}
        <Threads />
        </Flex>
        <Profile />
        </Flex>
    )
}