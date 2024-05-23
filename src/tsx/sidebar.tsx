import React from 'react';
import { Flex, Spacer, Button, Icon, Heading } from '@chakra-ui/react';
import { BsDoorOpen, BsHeart, BsHouseDoor, BsPerson, BsSearch } from 'react-icons/bs';
import { IconType } from 'react-icons';
import { BiSolidHome } from 'react-icons/bi';

export default function Sidebar(){
   
    function buttonSide (iconButton: IconType, desc : string)
    {
      return <Button color={'white'} fontSize={'1.2rem'} _hover={{fontWeight: 'Bold'}} leftIcon={<Icon as={iconButton} />}  colorScheme='white' fontWeight={'light'} variant='ghost' width={'75%'} justifyContent={'start'}>{desc}</Button>
    }

    return(
        <>
        <Flex flexDirection={'column'} margin={'1.33rem 2rem'} width={'25%'} borderEnd={'1px solid rgb(110, 110, 110, 0.333)'} justifyContent={'start'}>
            <Flex flexDirection={'column'}>
            <Heading as={'h2'} size={'2xl'} marginBottom={'2rem'} color={'lime'}>Circle</Heading>
            {buttonSide(BsHouseDoor, 'Home')}
            {buttonSide(BsSearch, 'Search')}
            {buttonSide(BsHeart, 'Heart')}
            {buttonSide(BsPerson, 'Person')}
            <Button colorScheme='green' variant='solid' width={'90%'} borderRadius={'20px'} marginTop={'1rem'}>Create Post</Button>
            </Flex>
            <Flex mt={'22rem'}>
            {buttonSide(BsDoorOpen, 'Log Out')}
            </Flex>
        </Flex>
        </>
    )
}