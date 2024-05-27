import { Button, Flex, FormControl, FormLabel, Heading, Input, InputGroup, InputLeftElement, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { BsPerson } from "react-icons/bs";
import f from '../function';
import Sidebar from "../sidebar";
import Profile from "../profileCard";
import { sideButton } from "../sidebar";

export default function search() {
    const color = {
        grey: '#909090',
        greyCard: '#262626'
    }
    
    const bgColor = '#1D1D1D'

    const searchBar =
    <FormControl isRequired mt={'2rem'}>
    <InputGroup>
        <InputLeftElement pointerEvents='none' mx={'0.33rem'}>
            <BsPerson fontSize={'1.25rem'} color={color.grey} />
        </InputLeftElement>
        <Input color={'white'} placeholder='Search Your Friend' borderRadius={'20px'} />
    </InputGroup>
    </FormControl>

    const searchDefault =
    <Flex height={'720px'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
    <Heading as={'h3'} size={'md'} mb={'0.33rem'} color={'whitesmoke'} fontWeight={'medium'}>Write and Search Something</Heading>
    <Text fontSize={'1rem'} color={color.grey} width={'50%'} textAlign={'center'}>Try searching for something else or check the spelling of what you typed.</Text>
    </Flex>

    function searchNotFound (user : string) {
        return <Flex height={'720px'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
        <Heading as={'h3'} size={'md'} mb={'0.33rem'} color={'whitesmoke'} fontWeight={'medium'}>No results for “{user}”</Heading>
        <Text fontSize={'1rem'} color={color.grey} width={'50%'} textAlign={'center'}>Try searching for something else or check the spelling of what you typed.</Text>
        </Flex>
    }

    const searchFound =
    <Flex flexDirection={'column'} width={'100%'} pt={'1rem'} borderRadius={'14px'} mx={'auto'} mt={'2rem'}>
        <Flex alignItems={'center'} justifyContent={'space-between'} mb={'1rem'}>
            <Flex>
                {f.imageCircle('https://images.pexels.com/photos/1172207/pexels-photo-1172207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', '40px')}
                <Flex flexDirection={'column'} ms={'1rem'}>
                <Text color={'white'} fontWeight={'bold'}>Bagus Hendrawan</Text>
                <Text fontSize={'1rem'} color={color.grey} mb={'0.2rem'}>@bag-user</Text>
                <Text color={'white'} fontSize={'0.95rem'}>Not all who wander are lost</Text>
                </Flex>
            </Flex>
            <Button justifySelf={'end'} colorScheme='gray' size={'sm'} variant='outline' color={'white'}  borderRadius={'14px'}>Follow</Button>
        </Flex>
        <Flex alignItems={'center'} justifyContent={'space-between'} mb={'1rem'}>
            <Flex>
                {f.imageCircle('https://images.pexels.com/photos/1172207/pexels-photo-1172207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', '40px')}
                <Flex flexDirection={'column'} ms={'1rem'}>
                <Text color={'white'} fontWeight={'bold'}>Bagus Hendrawan</Text>
                <Text fontSize={'1rem'} color={color.grey} mb={'0.2rem'}>@bag-user</Text>
                <Text color={'white'} fontSize={'0.95rem'}>Not all who wander are lost</Text>
                </Flex>
            </Flex>
            <Button justifySelf={'end'} colorScheme='gray' size={'sm'} variant='outline' color={'gray'} borderColor={'gray'}  borderRadius={'14px'}>Following</Button>
        </Flex>
        <Flex alignItems={'center'} justifyContent={'space-between'} mb={'1rem'}>
            <Flex>
                {f.imageCircle('https://images.pexels.com/photos/1172207/pexels-photo-1172207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', '40px')}
                <Flex flexDirection={'column'} ms={'1rem'}>
                <Text color={'white'} fontWeight={'bold'}>Bagus Hendrawan</Text>
                <Text fontSize={'1rem'} color={color.grey} mb={'0.2rem'}>@bag-user</Text>
                <Text color={'white'} fontSize={'0.95rem'}>Not all who wander are lost</Text>
                </Flex>
            </Flex>
            <Button justifySelf={'end'} colorScheme='gray' size={'sm'} variant='outline' color={'white'}  borderRadius={'14px'}>Follow</Button>
        </Flex>
    </Flex>


    return (
        <Flex justifyContent={'start'} bg={bgColor} maxHeight={'733px'}>
        {Sidebar(sideButton.search)}
        <Flex flexDirection={'column'} width={'40%'}>
        {searchBar}
        {searchNotFound("Asnmdidnfl")}
        </Flex>
        <Profile />
        </Flex>
    )
}