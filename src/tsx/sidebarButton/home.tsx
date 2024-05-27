import { Flex } from "@chakra-ui/react";
import Threads from "./home/threads";
import { forms, threadsForm } from "./home/threadsform";
import Sidebar, { sideButton } from "../sidebar";
import Profile from "../profileCard";

export default function home ()
{
    const bgColor = '#1D1D1D'
    return (
        <Flex justifyContent={'start'} bg={bgColor} maxHeight={'733px'}>
        {Sidebar(sideButton.home)}
        <Flex flexDirection={'column'} width={'40%'}>
        {forms(threadsForm)}
        <Threads />
        </Flex>
        <Profile />
        </Flex>
    )
}