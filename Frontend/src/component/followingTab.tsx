import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Link, Button } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import Axios from 'axios'
import f from './function'
import { following } from "@/libs/type";

interface FollowTabComponentProps {
    // Define any props if necessary
}

const FollowTabComponent: React.FC<FollowTabComponentProps> = (props) => {
    const [isFollowed, setFollow] = useState(false);
    const notFollowButton = <Button justifySelf={'end'} colorScheme='gray' size={'sm'} variant='outline' color={'white'}  borderRadius={'14px'}>Follow</Button>
    const isFollowButton =  <Button justifySelf={'end'} colorScheme='gray' size={'sm'} variant='outline' color={'gray'} borderColor={'gray'}  borderRadius={'14px'}>Following</Button>

    const followerButton =  
    <Link onClick={() => {setFollow(!isFollowed)}}> {isFollowed ? isFollowButton : notFollowButton} </Link>

    const followingButton =  
    <Link onClick={() => {setFollow(!isFollowed)}}> { isFollowButton } </Link>

    const [followers, setFollowers] = useState<following[]>([]);
    const [followeds, setFolloweds] = useState<following[]>([]);

    useEffect (() => {
        async function fetchFollower(){
            const token = localStorage.getItem('token');
            const response = await Axios({
                method: "get",
                url: `http://localhost:5000/api/v1/follower`,
                headers: { 
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${token}`
                 },
            })
            setFollowers(response.data);
        }

        fetchFollower();


        async function fetchFollowed(){
            const token = localStorage.getItem('token');
            const response = await Axios({
                method: "get",
                url: `http://localhost:5000/api/v1/following`,
                headers: { 
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${token}`
                 },
            })
            setFolloweds(response.data);
        }
        fetchFollowed();
    },[setFollowers, setFolloweds] )
    
    //turn this into an array
    async function fetchFollower(){
        const token = localStorage.getItem('token');
        const response = await Axios({
            method: "get",
            url: `http://localhost:5000/api/v1/follower`,
            headers: { 
                "Content-Type": "multipart/form-data",
                'Authorization': `Bearer ${token}`
             },
        })
        setFollowers(response.data);
    }

    async function fetchFollowed(){
        const token = localStorage.getItem('token');
        const response = await Axios({
            method: "get",
            url: `http://localhost:5000/api/v1/following`,
            headers: { 
                "Content-Type": "multipart/form-data",
                'Authorization': `Bearer ${token}`
             },
        })
        setFolloweds(response.data);
    }
    


    const followerData =  followers.map((item,index) => {
            return (
                <Flex alignItems={'center'} justifyContent={'space-between'} width={'90%'} mb={'1rem'}>
                <Flex>
                {f.imageCircle(item && item.follower.photo_profile, '40px')}
                <Flex flexDirection={'column'} ms={'1rem'}>
                <Text color={'white'}>{item && item.follower.full_name}</Text>
                <Text fontSize={'1rem'} color='color.grey'>{item && item.follower.username}</Text>
                </Flex>
            </Flex>
            {followerButton}
            </Flex>
            )
        })


    
    const followingData =  followeds.map((item,index) => {
            return (
                <Flex alignItems={'center'} justifyContent={'space-between'} width={'90%'} mb={'1rem'}>
                <Flex>
                {f.imageCircle(item && item.followed.photo_profile, '40px')}
                <Flex flexDirection={'column'} ms={'1rem'}>
                <Text color={'white'}>{item && item.followed.full_name}</Text>
                <Text fontSize={'1rem'} color='color.grey'>{item && item.followed.username}</Text>
                </Flex>
                </Flex>
                {followingButton}
                </Flex>
            )
        })
    

    return (
        <Tabs isFitted color={'white'} mt={'2rem'} colorScheme="green">
            <TabList>
                <Tab onClick={fetchFollower}>Followers</Tab>
                <Tab onClick={fetchFollowed}>Following</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                {followerData}
                </TabPanel>

                <TabPanel>
                {followingData}
                </TabPanel>

            </TabPanels>
        </Tabs>
    );
};

export default FollowTabComponent;