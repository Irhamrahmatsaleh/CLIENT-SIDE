import { useEffect, useState } from "react";
import cardData from "../card-dummy.json";
import { BsHeart, BsHeartFill, BsImage, BsMessenger } from "react-icons/bs";
import { Box, Button, Flex, FormControl, Heading, IconButton, Image, Link, LinkBox, LinkOverlay, Text, Textarea, useDisclosure } from '@chakra-ui/react';
import { BiMessage, BiSolidMessage } from "react-icons/bi";
import f from './function';
import Axios from 'axios';
import React from "react";
import { thread } from "@/libs/type";

export default function Threads(){
    // const [state, setState] = useState(cardData);
    const [thread, setThread] = useState<thread[]>([]);
    const [likedStates, setLikedStates] = useState<boolean[]>([]);
    const [isHover, setHover] = useState(false);

    const mouseEnter = () => {
        setHover(true);
    };

    const mouseLeave = () => {
        setHover(false);
    };

    useEffect(  () => {
        async function fetchThreads(){
            try {
                const token = localStorage.getItem('token');
                const response = await Axios({
                    method: "get",
                    url: `http://localhost:5000/api/v1/thread`,
                    headers: { 
                        "Content-Type": "multipart/form-data",
                        'Authorization': `Bearer ${token}`
                     },
                })
                setThread(response.data);
            } catch(error){
                return error;
            }
        }
        fetchThreads();
    }, [])

    if(!thread || thread.length === 0)
        {
           return (
            <>
            <h1>Threads Empty</h1>
            </>
           ) 
        }

    const likeHandle = (index : number) => {
        const newLiked = [...likedStates];
        newLiked[index] = !newLiked[index];
        setLikedStates(newLiked);
    }

    console.log("Thread ", thread)
    const data = thread.map((item, index) => {
            const likeIcon = <Link onClick={() => {likeHandle(index);}}> {likedStates[index] ? <BsHeartFill/> : <BsHeart/>} </Link>
            if(item.users == null)
                {
                    return;
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
                        {item.users.username && item.users.username}
                        </Text>
                        <Text>
                        @{item.users.username && item.users.username}
                        </Text>
                        <Text>
                        {f.dateDifferences(item.update_at)}
                        </Text>
                    </Flex>
                    <Box marginBottom={'0.5rem'}>
                        <Text marginBottom={'0.33rem'}>
                        {item.content}
                        </Text>
                        {f.imageMessage(item.image)}
                    </Box>
                    <Flex gap={'0.33rem'} marginBottom={'0.5rem'} alignItems={'center'}>
                    {likeIcon}
                    <Text marginEnd={'0.5rem'} color={'rgb(160, 160, 160)'} fontSize={'small'}>{item.likes.length}</Text>
                    <LinkBox>
                    <LinkOverlay href={`/threads`}><Box onMouseOver={mouseEnter} onMouseLeave={mouseLeave}>{isHover ? <BiSolidMessage /> : <BiMessage />}</Box></LinkOverlay>
                    </LinkBox>
                    <Text marginEnd={'0.5rem'} color={'rgb(160, 160, 160)'} fontSize={'small'}>{item.number_of_replies} Replies</Text>
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