import { useState } from "react";
import cardData from "../../../card-dummy.json";
import { BsHeart, BsHeartFill, BsImage, BsMessenger } from "react-icons/bs";
import { Box, Button, Flex, FormControl, Heading, IconButton, Image, Link, LinkBox, LinkOverlay, Text, Textarea, useDisclosure } from '@chakra-ui/react';
import { BiMessage, BiSolidMessage } from "react-icons/bi";
import f from '../../function';
import React from "react";

export default function Threads(){
    const [state, setState] = useState(cardData);
    
    const [isHover, setHover] = useState(false);

    const mouseEnter = () => {
        setHover(true);
    };

    const mouseLeave = () => {
        setHover(false);
    };

    const data = state.data.threads.map((item, index) => {
        const [isLiked, setLiked] = useState(item.isLiked);

        const likeIcon = <Link onClick={() => {setLiked(!isLiked)}}> {isLiked ? <BsHeartFill/> : <BsHeart/>} </Link>
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
                <LinkBox>
                <LinkOverlay href={`/threads`}><Box onMouseOver={mouseEnter} onMouseLeave={mouseLeave}>{isHover ? <BiSolidMessage /> : <BiMessage />}</Box></LinkOverlay>
                </LinkBox>
                <Text marginEnd={'0.5rem'} color={'rgb(160, 160, 160)'} fontSize={'small'}>{item.reply} Replies</Text>
                </Flex>
            </Flex>
        </Flex>
        )
    })

    return(
        <>
            <Flex flexDirection={'column'} justifyContent={'start'} mt={'1rem'} height={'720px'} overflowY="scroll" overflowX="hidden" css={{
        '::-webkit-scrollbar': {
          display: 'none',
        },
        '-ms-overflow-style': 'none', // IE and Edge
        'scrollbar-width': 'none', // Firefox
      }}>
                {data}
            </Flex>
        </>
    )
}