import { useState } from "react";
import cardData from "../card-dummy.json";
import { BsHeart, BsHeartFill, BsImage, BsMessenger } from "react-icons/bs";
import { Box, Button, Flex, FormControl, Heading, IconButton, Image, Text, Textarea } from '@chakra-ui/react';
import { BiSolidMessage } from "react-icons/bi";
import f from './function';

export default function Threads(){
    const [state, setState] = useState(cardData);

    const data = state.data.threads.map(item => {
        let likeIcon
        if(item.isLiked) {
            likeIcon = <BsHeartFill/>;
        } else {
            likeIcon = <BsHeart/>;
        }

        return (
        <Flex alignItems={'start'} color={'white'} borderBottom={'1px solid rgb(110, 110, 110, 0.333)'} marginTop={'1rem'} >
            <Box className="picture">
            {f.imageCircle('https://images.pexels.com/photos/1172207/pexels-photo-1172207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', '32px')}
            </Box>
            <Flex marginX={'1rem'} flexDirection={'column'} justifyContent={'start'} marginBottom={'0.5rem'}>
                <Flex 
                fontSize={'small'}
                color={'rgb(199, 199, 199)'}
                marginEnd={'0.5rem'}
                marginBottom={'0.33rem'}
                gap={'0.33rem'}>
                    <Text fontWeight={'bold'} color={'white'}>
                    {item.user.name}
                    </Text>
                    <Text>
                    @{item.user.username}
                    </Text>
                    <Text>
                    {f.dateDifferences(item.created_at)}
                    </Text>
                </Flex>
                <Box marginBottom={'0.5rem'}>
                    <Text marginBottom={'0.33rem'}>
                    {item.content}
                    </Text>
                    {f.imageMessage('https://images.pexels.com/photos/1172207/pexels-photo-1172207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')}
                </Box>
                <Flex gap={'0.33rem'} marginBottom={'0.5rem'} alignItems={'center'}>
                {likeIcon}
                <Text marginEnd={'0.5rem'} color={'rgb(160, 160, 160)'} fontSize={'small'}>{item.likes}</Text>
                <BiSolidMessage/>
                <Text marginEnd={'0.5rem'} color={'rgb(160, 160, 160)'} fontSize={'small'}>{item.reply} Replies</Text>
                </Flex>
            </Flex>
        </Flex>
        )
    })

    const threadsForm = <Flex justifyContent={'start'} alignItems={'start'} gap={'1rem'} margin={'1rem 0 0.5rem'} borderBottom={'1px solid rgb(110, 110, 110, 0.333)'}>
        {f.imageCircle('https://images.pexels.com/photos/1172207/pexels-photo-1172207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', '32px')}
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
        </FormControl></Flex>

    return(
        <>
            <Flex flexDirection={'column'} justifyContent={'start'} width={'40%'} height={'720px'} overflowY="scroll" overflowX="hidden" css={{
        '::-webkit-scrollbar': {
          display: 'none',
        },
        '-ms-overflow-style': 'none', // IE and Edge
        'scrollbar-width': 'none', // Firefox
      }}>
                <Heading as={'h2'} size={'xl'} marginY={'1.5rem'} color={'whitesmoke'}>Home</Heading>
                {threadsForm}
                {data}
            </Flex>
        </>
    )
}