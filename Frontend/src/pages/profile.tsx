import { Flex } from "@chakra-ui/react";
import Profile from "../component/profileCard";
import ThreadsProfile from '../component/profileThreads';
import Sidebar, { sideButton } from "../component/sidebar";
import { forms, profileThreads } from "../component/threadsform";

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