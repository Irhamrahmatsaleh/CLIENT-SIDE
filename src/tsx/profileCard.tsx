    import { Box, Button, Flex, HStack, Heading, Image, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
    import f from './function'
    import { BsFacebook, BsGithub, BsInstagram, BsLinkedin, BsXCircle } from "react-icons/bs";
    import { useState } from "react";

    const color = {
        grey: '#909090',
        greyCard: '#262626'
    }
    export default function Profile()
    {
        const [isOpen, setIsOpen] = useState(false);

        const onClose = () => setIsOpen(false);
        const onOpen = () => setIsOpen(true);

        const [isFollowed, setFollow] = useState(false);
        const notFollowButton = <Button justifySelf={'end'} colorScheme='gray' size={'sm'} variant='outline' color={'white'}  borderRadius={'14px'}>Follow</Button>
        const isFollowButton =  <Button justifySelf={'end'} colorScheme='gray' size={'sm'} variant='outline' color={'gray'} borderColor={'gray'}  borderRadius={'14px'}>Following</Button>

        //make the following list an array then map through each just like threads, needs some json
        const followButton =  
        <Link onClick={() => {setFollow(!isFollowed)}}> {isFollowed ? isFollowButton : notFollowButton} </Link>

        const profile = 
        <Flex flexDirection={'column'} bgColor={color.greyCard} alignItems={'start'} width={'90%'} borderRadius={'14px'} justifyContent={'space-around'} height={'45%'} py={'1rem'}>
        <Heading as={'h3'} size={'md'} marginStart={'1.33rem'} mb={'1rem'} color={'whitesmoke'} fontWeight={'medium'}>My Profile</Heading>
        <Box width={'90%'} marginX={'auto'} height={'42%'} mb={'1rem'}>
            <Image src="https://images.pexels.com/photos/1172207/pexels-photo-1172207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" width={'720px'} height={'80px'} objectFit={'cover'} borderRadius={'12px'}/>
            <Image borderRadius={'50%'} width={'64px'} height={'64px'} objectFit={'cover'} src={'https://images.pexels.com/photos/1172207/pexels-photo-1172207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} zIndex={4} position={'relative'} top={'-2rem'} left={'1rem'} border={`4px solid ${color.greyCard}`}/>
            
            <Button onClick={onOpen} colorScheme='gray' size={'sm'} variant='outline' color={'white'} zIndex={4} position={'relative'} top={'-3rem'} left={'16rem'} borderRadius={'14px'}>Edit Profile</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bgColor={color.greyCard} maxWidth={'720px'} borderRadius={'12px'} px={'1.5rem'} py={'1rem'} mt={'2rem'}>
                <ModalHeader color={'white'}>Edit Profile</ModalHeader>
                <ModalCloseButton color={'white'} mt={'0.5rem'} me={'0.5rem'} />
                <ModalBody>
                {f.editProfileCard}
                </ModalBody>
                <ModalFooter>
                <Button colorScheme="green" size={'md'} type="submit" borderRadius={'20px'} width={'72px'}>Save</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
        <Flex flexDirection={'column'} alignItems={'start'} width={'90%'} marginX={'auto'} gap={'0.33rem'}>
            <Heading as={'h3'} size={'md'} color={'whitesmoke'}>Bagus Hendrawan</Heading>
            <Text fontSize={'1rem'} color={color.grey}>@bag-user</Text>
            <Text color={'white'}>Not all who wander are lost</Text>
        </Flex>
        <Flex justifyContent={'start'} width={'90%'} gap={'0.33rem'} marginX={'auto'} color={'white'} fontSize={'small'}>
            <Text fontWeight={'bold'}>229</Text>
            <Text me={'0.33rem'} color={color.grey}>Following</Text>
            <Text fontWeight={'bold'}>344</Text>
            <Text color={color.grey}>Followers</Text>
        </Flex>
        </Flex>

        const suggested = 
        <Flex flexDirection={'column'} bgColor={color.greyCard} width={'90%'} pt={'1rem'} borderRadius={'14px'}>
        <Heading as={'h3'} size={'md'} marginStart={'1.33rem'} mb={'1rem'} color={'whitesmoke'} fontWeight={'medium'}>Suggested For You</Heading>
        <Flex flexDirection={'column'} marginStart={'1.33rem'} mt={'1rem'}>
            <Flex alignItems={'center'} justifyContent={'space-between'} width={'90%'} mb={'1rem'}>
                <Flex>
                    {f.imageCircle('https://images.pexels.com/photos/1172207/pexels-photo-1172207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', '40px')}
                    <Flex flexDirection={'column'} ms={'1rem'}>
                    <Text color={'white'}>Bagus Hendrawan</Text>
                    <Text fontSize={'1rem'} color={color.grey}>@bag-user</Text>
                    </Flex>
                </Flex>
                {followButton}
            </Flex>
            <Flex alignItems={'center'} justifyContent={'space-between'} width={'90%'} mb={'1rem'}>
                <Flex>
                    {f.imageCircle('https://images.pexels.com/photos/1172207/pexels-photo-1172207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', '40px')}
                    <Flex flexDirection={'column'} ms={'1rem'}>
                    <Text color={'white'}>Bagus Hendrawan</Text>
                    <Text fontSize={'1rem'} color={color.grey}>@bag-user</Text>
                    </Flex>
                </Flex>
                {followButton}            
                </Flex>
            <Flex alignItems={'center'} justifyContent={'space-between'} width={'90%'} mb={'1rem'}>
                <Flex>
                    {f.imageCircle('https://images.pexels.com/photos/1172207/pexels-photo-1172207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', '40px')}
                    <Flex flexDirection={'column'} ms={'1rem'}>
                    <Text color={'white'}>Bagus Hendrawan</Text>
                    <Text fontSize={'1rem'} color={color.grey}>@bag-user</Text>
                    </Flex>
                </Flex>
                {followButton}            
                </Flex>
        </Flex>
        </Flex>

        const watermark = 
        <Flex flexDirection={'column'} bgColor={color.greyCard} width={'90%'} py={'1rem'} borderRadius={'14px'}> 
        <Flex ms={'1.33rem'} alignItems={'center'} mb={'0.2rem'}>
            <Flex alignItems={'center'} me={'0.3rem'}>
                <Text fontSize={'0.9rem'} color={'white'} me={'0.2rem'}>Developed By</Text>
                <Text fontSize={'0.9rem'} color={'white'} fontWeight={'bold'} me={'0.3rem'}>Bagus Hendrawan</Text>
                <Text fontSize={'0.9rem'} color={color.grey}>•</Text>
            </Flex>
            <Flex gap={'0.5rem'}>
                <Link fontSize={'0.9rem'} color={color.grey}><BsGithub></BsGithub></Link>
                <Link fontSize={'0.9rem'} color={color.grey}><BsLinkedin></BsLinkedin></Link>
                <Link fontSize={'0.9rem'} color={color.grey}><BsFacebook></BsFacebook></Link>
                <Link fontSize={'0.9rem'} color={color.grey}><BsInstagram></BsInstagram></Link>
            </Flex>
        </Flex>
        <Flex ms={'1.33rem'} alignItems={'center'}>
            <HStack>
            <Text fontSize={'0.7rem'} color={color.grey}>Powered by </Text>
            <Image src="/Red.svg"></Image>
            <Text fontSize={'0.7rem'} color={color.grey}>DumbWays Indonesia • </Text>
            </HStack>
            <Link fontSize={'0.7rem'} color={color.grey}>#1 Coding Bootcamp</Link>
        </Flex>
        </Flex>

        return (
            <Flex flexDirection={'column'} gap={'1rem'} alignItems={'center'} width={'30%'} borderStart={'1px solid rgb(110, 110, 110, 0.333)'} marginStart={'2rem'} marginTop={'2rem'}>
                {profile}
                {suggested}
                {watermark}
            </Flex>
        )
    }