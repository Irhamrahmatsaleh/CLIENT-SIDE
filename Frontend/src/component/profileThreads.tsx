import { thread } from "@/libs/type";
import { Box, Flex, Link, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import { useQuery } from "@tanstack/react-query";
import Axios from 'axios';
import { useEffect, useState } from "react";
import { BiMessage, BiSolidMessage } from "react-icons/bi";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { api } from "../libs/api";
import f from './function';

export async function fetchThreads(){
    try {
        const token = localStorage.getItem('token');
        const response = await Axios({
            method: "get",
            url: `${api}/thread`,
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

export default function Threads(){
    const { data: threads } = useQuery<thread[]>({
        queryKey: ["threads"],
        queryFn: fetchThreads,
        });
    const [, setThread] = useState<thread[]>([]);
    const [isLiked, setIsLiked] = useState<boolean[]>([]);

    useEffect(  () => {
        async function fetchThreads(){
            try {
                const token = localStorage.getItem('token');
                const response = await Axios({
                    method: "get",
                    url: `${api}/threadProfile`,
                    headers: { 
                        "Content-Type": "multipart/form-data",
                        'Authorization': `Bearer ${token}`
                     },
                })
                setThread(response.data);
                setIsLiked(response.data.map((data : any) => {
                    return data["isliked"];
                }))
            } catch(error){

                return error;
            }
        }
        fetchThreads();
    }, [])


    const handleLike = async (id : number, index : number) => {
            likeHandle(index, true);
            try {
                const token = localStorage.getItem('token');
                await Axios({
                    method: "get",
                    url: `${api}/like${id}`,
                    headers: { 
                        "Content-Type": "multipart/form-data",
                        'Authorization': `Bearer ${token}`
                    },
                });
            } catch (error) {
                console.error('Error liking the item', error);
                likeHandle(index, false);
            }
            };

    const handleUnlike = async (id : number, index : number) => {
        likeHandle(index, false);
        try {
            const token = localStorage.getItem('token');
            await Axios({
                method: "get",
                url: `${api}/unlike${id}`,
                headers: { 
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${token}`
                },
            });
        } catch (error) {
            console.error('Error unliking the item', error);
            likeHandle(index, true);
        }
        };

    const likeHandle = (index : number, con : boolean) => {
        console.log(isLiked);
        const newLiked = [...isLiked];
        newLiked[index] = con;
        setIsLiked(newLiked);
    }

    const data = threads?.map((item, index) => {
            if(item.users == null)
                {
                    return;
                }
            return (
            <Flex alignItems={'start'} color={'white'} borderBottom={'1px solid rgb(110, 110, 110, 0.333)'} marginTop={'1rem'} key={index}>
            <Box className="picture" >
            {f.imageCircle(item.users.photo_profile, '32px')}
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
                    {f.dateDifferences(item.update_at)}
                    </Text>
                </Flex>
                <Box marginBottom={'0.5rem'}>
                    <Text marginBottom={'0.33rem'}>
                    {item.content}
                    </Text>
                    {item.image ? (f.imageMessage(item.image)) : <></>}
                </Box>
                <Flex gap={'0.33rem'} marginBottom={'0.5rem'} alignItems={'center'}>
                {isLiked[index] ? 
                <Link onClick={() => handleUnlike(item.id, index)}> <BsHeartFill /> </Link> : <Link onClick={() => handleLike(item.id, index)}> <BsHeart /> </Link>}
                <Text marginEnd={'0.5rem'} color={'rgb(160, 160, 160)'} fontSize={'small'}>{item.likes.length}</Text>
                <LinkBox>
                <LinkOverlay href={`/threads/${item.id}`}><Box>{item.isReplied ? <BiSolidMessage /> : <BiMessage />}</Box></LinkOverlay>
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