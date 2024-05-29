import { Box, Button, Divider, Flex, FormControl, FormHelperText, FormLabel, HStack, Heading, IconButton, Image, Input, Link, Text, Textarea, VStack } from "@chakra-ui/react";
import { BsArrowBarLeft, BsArrowLeft, BsHeartFill, BsImage, BsXCircle } from "react-icons/bs";
import f from '../../function';
import { BiSolidMessage } from "react-icons/bi";
import { JSXElementConstructor } from "react";
import React from "react";

const color = {
    grey: '#909090',
    greyCard: '#262626'
}

export const threadsForm = 
<Flex flexDirection={'column'} justifyContent={'start'} alignItems={'start'} gap={'1rem'} margin={'1rem 0 0.5rem'} borderBottom={'1px solid rgb(110, 110, 110, 0.333)'}>
<Heading as={'h2'} size={'xl'} marginY={'1.5rem'} color={'whitesmoke'}>Home</Heading>
<HStack alignItems={'start'}>
{f.imageCircle('https://images.pexels.com/photos/1172207/pexels-photo-1172207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', '32px', '0.2rem')}
<FormControl display={'flex'} alignItems={'start'} marginBottom={'1rem'}>
    <Textarea placeholder="What is Happening..." width={'320px'} minHeight={'40px'} border={'none'} color={'rgba(255, 255, 255, 0.496)'} resize={'none'} textDecoration={'none'} marginEnd={'1rem'}></Textarea>
    <IconButton
    colorScheme='green'
    aria-label='Add Picture'
    size='sm'
    variant={'ghost'}
    fontSize={'1.33rem'}
    icon={<BsImage />}
    marginEnd={'0.5rem'}
    />
    <Button colorScheme="green" size={'sm'} type="submit" borderRadius={'20px'} width={'72px'}>Post</Button>
</FormControl>
</HStack>
</Flex>

export const status = 
<Flex flexDirection={'column'} margin={'1rem 0 0.5rem'} borderBottom={'1px solid rgb(110, 110, 110, 0.333)'} mb={'1rem'}>
<Flex gap={'0.5rem'} alignItems={'center'} mb={'0.5rem'}>
<Link fontSize={'1rem'} color={color.grey}><BsArrowLeft></BsArrowLeft></Link>
<Heading as={'h3'} size={'md'} color={'whitesmoke'} fontWeight={'medium'}>Status</Heading>
</Flex>
<Flex alignItems={'start'} color={'white'} borderBottom={'1px solid rgb(110, 110, 110, 0.333)'} marginTop={'1rem'} >
<Box className="picture">
{f.imageCircle('https://images.pexels.com/photos/1172207/pexels-photo-1172207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', '32px')}
</Box>
<Flex marginX={'1rem'} flexDirection={'column'} justifyContent={'start'} marginBottom={'0.5rem'}>
    <Flex flexDirection={'column'} fontSize={'small'} color={'rgb(199, 199, 199)'} marginEnd={'0.5rem'} marginBottom={'0.33rem'}>
        <Text fontWeight={'bold'} color={'white'}>
        Bagus Hendrawan
        </Text>
        <Text>
        @bag-user
        </Text>
    </Flex>
    <Box marginBottom={'0.5rem'}>
        <Text marginBottom={'0.33rem'}>
        What comes around goes around
        </Text>
        {/* {f.imageMessage('https://images.pexels.com/photos/1172207/pexels-photo-1172207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')} */}
    </Box>
    <HStack mb={'1rem'} mt={'0.5rem'}>
    <Text fontSize={'0.7rem'} color={color.grey}>11:30 AM •</Text>
    <Text fontSize={'0.7rem'} color={color.grey}>Jul 31, 2023</Text>
    </HStack>
    <Flex gap={'0.33rem'} marginBottom={'0.5rem'} alignItems={'center'}>
    <BsHeartFill></BsHeartFill>
    <Text marginEnd={'0.5rem'} color={'rgb(160, 160, 160)'} fontSize={'small'}>32</Text>
    <BiSolidMessage/>
    <Text marginEnd={'0.5rem'} color={'rgb(160, 160, 160)'} fontSize={'small'}>13 Replies</Text>
    </Flex>
</Flex>
</Flex>
<Flex justifyContent={'start'} alignItems={'start'} gap={'1rem'} mt={'1rem'}>
    {f.imageCircle('https://images.pexels.com/photos/1172207/pexels-photo-1172207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', '32px')}
    <FormControl display={'flex'} alignItems={'start'} marginBottom={'1rem'}>
    <Textarea placeholder="What is Happening..." width={'320px'} minHeight={'40px'} border={'none'} color={'rgba(255, 255, 255, 0.496)'} resize={'none'} textDecoration={'none'} marginEnd={'1rem'}></Textarea>
    <IconButton colorScheme='green' aria-label='Add Picture' size='sm' variant={'ghost'} fontSize={'1.33rem'} icon={<BsImage />} marginEnd={'0.5rem'}/>
    <Button colorScheme="green" size={'sm'} type="submit" borderRadius={'20px'} width={'72px'}>Post</Button>
    </FormControl>
</Flex>
</Flex>

export const profileThreads =
<Flex flexDirection={'column'} alignItems={'start'} width={'100%'} borderRadius={'14px'} justifyContent={'space-around'} height={'45%'} pt={'1rem'} mt={'2rem'} mx={'auto'}>
<Heading as={'h3'} size={'md'} marginStart={'1.33rem'} mb={'1rem'} color={'whitesmoke'} fontWeight={'medium'}>Bagus Hendrawan</Heading>
<Box width={'90%'} marginX={'auto'} height={'42%'} mb={'1rem'}>
    <Image src="https://images.pexels.com/photos/1172207/pexels-photo-1172207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" width={'720px'} height={'80px'} objectFit={'cover'} borderRadius={'12px'}/>
    <Image borderRadius={'50%'} width={'64px'} height={'64px'} objectFit={'cover'} src={'https://images.pexels.com/photos/1172207/pexels-photo-1172207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} zIndex={4} position={'relative'} top={'-2rem'} left={'1rem'} border={`4px solid ${color.greyCard}`}/>
    <Button colorScheme='gray' size={'sm'} variant='outline' color={'white'} zIndex={4} position={'relative'} top={'-3rem'} left={'24rem'} borderRadius={'14px'}>Edit Profile</Button>
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
<Divider orientation='horizontal' borderColor={'rgb(110, 110, 110, 0.333)'} mt={'1rem'}/>
</Flex>

export const otherProfileThreads =
<Flex flexDirection={'column'} alignItems={'start'} width={'100%'} borderRadius={'14px'} justifyContent={'space-around'} height={'45%'} pt={'1rem'} mt={'1.33rem'} mx={'auto'}>
<Flex gap={'0.5rem'} alignItems={'start'} mb={'0.5rem'}>
    <Link fontSize={'1rem'} color={color.grey} mt={'0.2rem'}><BsArrowLeft></BsArrowLeft></Link>
    <Heading as={'h3'} size={'md'} marginStart={'1.33rem'} mb={'1rem'} color={'whitesmoke'} fontWeight={'medium'}>John Doe</Heading>
</Flex>
<Box width={'90%'} marginX={'auto'} height={'42%'} mb={'1rem'}>
    <Image src="https://images.pexels.com/photos/1172207/pexels-photo-1172207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" width={'720px'} height={'80px'} objectFit={'cover'} borderRadius={'12px'}/>
    <Image borderRadius={'50%'} width={'64px'} height={'64px'} objectFit={'cover'} src={'https://images.pexels.com/photos/1172207/pexels-photo-1172207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} zIndex={4} position={'relative'} top={'-2rem'} left={'1rem'} border={`4px solid ${color.greyCard}`}/>
    <Button colorScheme='gray' size={'sm'} variant='outline' color={'white'} zIndex={4} position={'relative'} top={'-3rem'} left={'24rem'} borderRadius={'14px'}>Edit Profile</Button>
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
<Divider orientation='horizontal' borderColor={'rgb(110, 110, 110, 0.333)'} mt={'1rem'}/>
</Flex>

export function forms(component : JSX.Element) {
    return (
        <>
        {component}
        </>
    )
}