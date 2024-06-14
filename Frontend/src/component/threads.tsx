import { thread } from "@/libs/type";
import { Box, Flex, Heading, Image, Link, LinkBox, LinkOverlay, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { useQuery } from "@tanstack/react-query";
import Axios from 'axios';
import { useEffect, useState } from "react";
import { BiMessage, BiSolidMessage } from "react-icons/bi";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { api } from "../libs/api";
import f from './function';
import { ThreadsUpload } from "./threadsform";

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

export async function fetchUserThreads(id : number){
    try {
        const token = localStorage.getItem('token');
        const response = await Axios({
            method: "get",
            url: `${api}/threadProfile${id}`,
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

export async function setLike(id : number){
    try {
        const token = localStorage.getItem('token');
        const response = await Axios({
            method: "get",
            url: `${api}/like${id}`,
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
    // const [likedStates, setLikedStates] = useState<boolean[]>([]);
    // const [isHover, setHover] = useState(false);

    // const mouseEnter = () => {
    //     setHover(true);
    // };

    // const mouseLeave = () => {
    //     setHover(false);
    // };

    const [isLiked, setIsLiked] = useState<boolean[]>([]);
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
    

    useEffect(() => {
        async function fetchThreads(){
            try {
                const token = localStorage.getItem('token');
                const response= await Axios({
                    method: "get",
                    url: `${api}/thread`,
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

    const likeHandle = (index : number, con : boolean) => {
        const newLiked = [...isLiked];
        newLiked[index] = con;
        setIsLiked(newLiked);
    }

    const tabThreads = threads?.map((item, index) => {
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
                        {item.users.full_name && item.users.full_name}
                        </Text>
                        <Text>
                        {item.users.username && item.users.username}
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

    const tabImage = threads?.map((item, index) => {
        return (
            <Image src={item.image} my={'0.33rem'} height={'auto'} key={index}/>
        )
    })
    
    return(
        <Box>
        <Heading as={'h3'} fontSize={'1.5rem'} mt={'2rem'} mb={'1rem'} color={'whitesmoke'}>Home</Heading>
        <Tabs isFitted colorScheme="green">
                <TabList mb='1rem' color={'white'}>
                    <Tab>Threads</Tab>
                    <Tab>Media</Tab>
                </TabList>
                <ThreadsUpload />
                <Flex flexDirection={'column'} justifyContent={'start'} height={'480px'} overflowY="scroll" overflowX="hidden" css={{
                        '::-webkit-scrollbar': {
                        display: 'none',
                        },
                        '-ms-overflow-style': 'none',
                        'scrollbar-width': 'none',
                    }}>
                <TabPanels>
                    <TabPanel>
                    {tabThreads}
                    </TabPanel>
                    <TabPanel>
                    {tabImage}
                    </TabPanel>
                </TabPanels>
                </Flex>
                </Tabs>
        </Box>
    )
}