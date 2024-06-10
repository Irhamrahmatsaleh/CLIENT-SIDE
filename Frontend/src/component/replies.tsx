import { replies, thread } from "@/libs/type";
import { Box, Button, Divider, Flex, HStack, Heading, Image, Link, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import Axios, { AxiosError } from 'axios';
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BiMessage, BiSolidMessage } from "react-icons/bi";
import { BsArrowLeft, BsDot, BsHeart, BsHeartFill } from "react-icons/bs";
import { createThreadSchema } from "../features/validators/threads";
import { threadsForm } from "../libs/type";
import f from './function';
import Threads, { fetchThreads } from "./threads";
import { useParams } from "react-router-dom";
import Sidebar, { sideButton } from "./sidebar";
import Profile from "./profileCard";
import { RepliesForm } from "./repliesForm";
import { number } from "zod";
import { api } from "../libs/api";

export async function fetchReplies(id : string | undefined){
    try {
        const token = localStorage.getItem('token');
        const response = await Axios({
            method: "get",
            url: `${api}/replies${id}`,
            headers: { 
                "Content-Type": "multipart/form-data",
                'Authorization': `Bearer ${token}`
             },
        })
    return response.data;
    } catch(error){
        return error;
    }
}

export default function Replies(){
    const {id} = useParams();
    const [thread, setThread] = useState<thread>();
    const [likedStates, setLikedStates] = useState<boolean>(false);
    const [repliesLiked, setRepliesLiked] = useState<boolean[]>([]);
    const [isHover, setHover] = useState(false);

    const { data: replies } = useQuery<replies[]>({
        queryKey: ["replies"],
        queryFn: () => fetchReplies(id),
        });
        console.log("replies", replies);
        
    const likeHandle = () => {
        setLikedStates(!likedStates);
    }

    const repliesLikeHandle = (index : number) => {
        const newLiked = [...repliesLiked];
        newLiked[index] = !newLiked[index];
        setRepliesLiked(newLiked);
    }

    const mouseEnter = () => {
        setHover(true);
    };

    const mouseLeave = () => {
        setHover(false);
    };

    const likeIcon = <Link onClick={() => {likeHandle();}}> {likedStates ? <BsHeartFill/> : <BsHeart/>} </Link>

    useEffect(() => {
        async function fetchThreads(){
            try {
                const token = localStorage.getItem('token');
                const response = await Axios({
                    method: "get",
                    url: `${api}/thread${id}`,
                    headers: { 
                        "Content-Type": "multipart/form-data",
                        'Authorization': `Bearer ${token}`
                        },
                })
                setThread(response.data);
                console.log(response.data);
            } catch(error){
                return error;
            }
        }
        fetchThreads();
    }, []);
    
    const replied =
            <Flex alignItems={'start'} color={'white'} borderBottom={'1px solid rgb(110, 110, 110, 0.333)'} marginTop={'1rem'}>
            <Box className="picture" >
            {f.imageCircle('https://images.pexels.com/photos/1172207/pexels-photo-1172207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', '32px')}
            </Box>
            <Flex marginX={'1rem'} flexDirection={'column'} justifyContent={'start'} marginBottom={'0.5rem'}>
                <Flex 
                fontSize={'small'}
                color={'rgb(199, 199, 199)'}
                marginEnd={'0.5rem'}
                marginBottom={'0.33rem'}
                gap={'0.33rem'} >
                    <Text fontWeight={'bold'} color={'white'}>
                    {thread?.users.full_name ? thread?.users.full_name : 'null'}
                    </Text>
                    <Text>
                    @{thread?.users.username ? thread?.users.username : 'null'}
                    </Text>
                </Flex>
                <Box marginBottom={'0.5rem'}>
                    <Text marginBottom={'0.33rem'}>
                    {thread?.content}
                    </Text>
                    {thread?.image ? (f.imageMessage(thread?.image)) : <></>}
                </Box>
                <HStack fontSize={'0.75rem'} color={'circle.grey'} mt={'0.33rem'} mb={'0.5rem'}>
                <Text>
                    { thread && f.timeString(thread.update_at)}
                </Text>
                <BsDot></BsDot>
                <Text>
                    { thread && f.dateString(thread.update_at)}
                </Text>
                </HStack>

                <Flex gap={'0.33rem'} marginBottom={'0.5rem'} alignItems={'center'}>
                {likeIcon}
                <Text marginEnd={'0.5rem'} color={'rgb(160, 160, 160)'} fontSize={'small'}>{thread?.likes.length}</Text>
                <LinkBox>
                <LinkOverlay href={`/threads`}><Box onMouseOver={mouseEnter} onMouseLeave={mouseLeave}>{isHover ? <BiSolidMessage /> : <BiMessage />}</Box></LinkOverlay>
                </LinkBox>
                <Text marginEnd={'0.5rem'} color={'rgb(160, 160, 160)'} fontSize={'small'}>{thread?.number_of_replies} Replies</Text>
                </Flex>
            </Flex>
        </Flex>


    const repliedList = replies?.map((item, index) => {
        
        const likeIcon = <Link onClick={() => {repliesLikeHandle(index);}}> {repliesLiked[index] ? <BsHeartFill/> : <BsHeart/>} </Link>
        if(item.users == null)
            {
                return;
            }
        return (
        <Flex alignItems={'start'} color={'white'} borderBottom={'1px solid rgb(110, 110, 110, 0.333)'} marginTop={'1rem'} key={index}>
            <Box className="picture" >
            {f.imageCircle('https://images.pexels.com/photos/1172207/pexels-photo-1172207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', '32px')}
            </Box>
            <Flex marginX={'1rem'} flexDirection={'column'} justifyContent={'start'} marginBottom={'0.5rem'}>
                <Flex 
                fontSize={'small'}
                color={'rgb(199, 199, 199)'}
                marginEnd={'0.5rem'}
                marginBottom={'0.33rem'}
                gap={'0.33rem'} >
                    <Text fontWeight={'bold'} color={'white'}>
                    {item.users.username && item.users.username}
                    </Text>
                    <Text>
                    @{item.users.username && item.users.username}
                    </Text>
                    <Text>
                    {f.dateDifferences(item.updated_at)}
                    </Text>
                </Flex>
                <Box marginBottom={'0.5rem'}>
                    <Text marginBottom={'0.33rem'}>
                    {item.content}
                    </Text>
                    {item.image ? (f.imageMessage(item.image)) : <></>}
                </Box>
                <Flex gap={'0.33rem'} marginBottom={'0.5rem'} alignItems={'center'}>
                {likeIcon}
                <Text marginEnd={'0.5rem'} color={'rgb(160, 160, 160)'} fontSize={'small'}>dbnull</Text>
                {/* <LinkBox>
                <LinkOverlay href={`/threads/${item.id}`}><Box onMouseOver={mouseEnter} onMouseLeave={mouseLeave}>{isHover ? <BiSolidMessage /> : <BiMessage />}</Box></LinkOverlay>
                </LinkBox>
                <Text marginEnd={'0.5rem'} color={'rgb(160, 160, 160)'} fontSize={'small'}>{item.number_of_replies} Replies</Text> */}
                </Flex>
            </Flex>
        </Flex>
        )
    })


    const bgColor = '#1D1D1D';
    return (
        <Flex justifyContent={'start'} bg={bgColor} maxHeight={'733px'}>
        {Sidebar(sideButton.home)}
        <Flex flexDirection={'column'} width={'40%'}>
            <HStack color={'white'} mt={'2rem'}>
                <BsArrowLeft fontSize={'1.33rem'}></BsArrowLeft>
                <Text fontSize={'1.33rem'} ms={'0.33rem'}>Status</Text>
            </HStack>
        {replied}
        <RepliesForm />
        {repliedList}
        </Flex>
        <Profile />
        </Flex>
    )
}