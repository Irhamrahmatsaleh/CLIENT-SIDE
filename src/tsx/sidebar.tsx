
import { Flex, Button, Icon, Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, IconButton, Divider } from '@chakra-ui/react';
import { BsDoorOpen, BsHeart, BsHouseDoor, BsImage, BsPerson, BsSearch } from 'react-icons/bs';
import { IconType } from 'react-icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import f from './function'

export enum sideButton {
    home,
    search,
    follow,
    profile
}

const color = {
  grey: '#909090',
  greyCard: '#262626'
}

export default function Sidebar(side : sideButton){
    const [isOpen, setIsOpen] = useState(false);

    const onClose = () => setIsOpen(false);
    const onOpen = () => setIsOpen(true);

    function buttonSide (iconButton: IconType, desc : string, link : string, bold? : string | '300')
    {
      return <Link to={link}><Button color={'white'} fontSize={'1.2rem'} _hover={{fontWeight: 'Bold'}} leftIcon={<Icon as={iconButton} />}  colorScheme='white' fontWeight={bold} variant='ghost' width={'75%'} justifyContent={'start'}>{desc}</Button></Link>
    }

    const buttonHome = () => {
        if(side === sideButton.home)
            {
              return buttonSide(BsHouseDoor, 'Home', '/', 'bold')
            } else{
              return  buttonSide(BsHouseDoor, 'Home', '/')
            }
    }

    const buttonProfile = () => {
        if(side === sideButton.profile)
            {
              return  buttonSide(BsPerson, 'Profile', '/profile', 'bold')
            } else{
              return  buttonSide(BsPerson, 'Profile', '/profile')
            }
    }

    const buttonSearch = () => {
        if(side === sideButton.search)
            {
              return  buttonSide(BsSearch, 'Search', '/search', 'bold')
            } else{
              return  buttonSide(BsSearch, 'Search', '/search')
            }
    }

    const buttonFollow = () => {
        if(side === sideButton.follow)
            {
              return  buttonSide(BsHeart, 'Follow', '/follow', 'bold')
            } else{
              return  buttonSide(BsHeart, 'Follow', '/follow')
            }
    }

    return(
        <Flex flexDirection={'column'} margin={'1.33rem 2rem'} width={'25%'} borderEnd={'1px solid rgb(110, 110, 110, 0.333)'} justifyContent={'start'}>
            <Flex flexDirection={'column'}>
            <Heading as={'h2'} size={'2xl'} marginBottom={'2rem'} color={'lime'}>Circle</Heading>
            
            {buttonHome()}
            {buttonFollow()}
            {buttonSearch()}
            {buttonProfile()}

            <Button onClick={onOpen} colorScheme='green' variant='solid' width={'90%'} borderRadius={'20px'} marginTop={'1rem'}>Create Post</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bgColor={color.greyCard} maxWidth={'640px'} borderRadius={'12px'} mt={'2rem'} pt={'1.5rem'} pb={'0.33rem'} px={'0.33rem'} top={'2rem'} right={'1.5rem'}>
                <ModalCloseButton color={'white'} mt={'0.5rem'} me={'0.5rem'} />
                <ModalBody>
                {f.threadsFormCard}
                </ModalBody>
                <ModalFooter pt={'0'}>
                <Flex width={'100%'} justifyContent={'space-between'}>
                    <IconButton colorScheme='green' aria-label='Add Picture' size='md' variant={'ghost'} fontSize={'1.33rem'} icon={<BsImage />} marginEnd={'0.5rem'}/>
                    <Button colorScheme="green" size={'md'} type="submit" borderRadius={'20px'} width={'72px'}>Post</Button>
                </Flex>
                </ModalFooter>
                </ModalContent>
            </Modal>
            </Flex>
            <Flex mt={'22rem'}>
            {buttonSide(BsDoorOpen, 'Log Out', '/logout')}
            </Flex>
        </Flex>
    )
}