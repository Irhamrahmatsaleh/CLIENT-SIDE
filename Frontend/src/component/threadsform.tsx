import { Box, Button, Divider, Flex, FormControl, FormHelperText, HStack, Heading, IconButton, Image, Input, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, VStack, useEventListener } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import Axios, { AxiosError } from 'axios';
import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiSolidMessage } from "react-icons/bi";
import { BsArrowLeft, BsHeartFill, BsImage, BsXCircle } from "react-icons/bs";
import { createThreadSchema } from "../features/validators/threads";
import { api } from "../libs/api";
import { editProfileForm, thread, threadsForm } from "../libs/type";
import f from './function';
import { fetchThreads } from "./threads";
import { fetchProfile } from "./profileCard";
import { useEditProfileForm } from "../features/hooks/submitEditProfile";

export const ThreadsUpload : React.FC= () => {
    const textareaRef = useRef<string>() ;
    const fileInputRef = useRef<File | null>(null) ;
    const [imagePreview, setImagePreview] = useState<string>("");
    const [textValue, setTextValue] = useState<string>();

    const { refetch } = useQuery<thread[]>({
        queryKey: ["threads"],
        queryFn: fetchThreads,
        });

    const {
        register,
        handleSubmit,
        formState:{errors},
        resetField,
        unregister,
        getValues
      } = useForm<threadsForm>({
        mode: "onSubmit",
        resolver: zodResolver(createThreadSchema),
        });


    const { mutateAsync } = useMutation<
    thread,
    AxiosError,
    threadsForm
    >({
        mutationFn: async(data: { content: any; image: any; }) => {
            console.log("mutate mutation");
            const formData =  new FormData();
            formData.append('content', data.content);
            if (data.image && data.image[0]) {
                formData.append('image', data.image[0]);
                } else {
                formData.append('image', 'none');
                }
            
            const token = localStorage.getItem('token');
            return await Axios({
            method: "post",
            url: `${api}/threadPost`,
            data: formData,
            headers: { 
                "Content-Type": "multipart/form-data",
                'Authorization': `Bearer ${token}`
                },
            })
        },
    });
    
    const onSubmit: SubmitHandler<threadsForm> = async (data : { content: any; image: any ; }) => {
        console.log("test", data.image);
        if(!imagePreview || imagePreview === '') data.image = null;
        textareaRef.current = "";
        setTextValue('')
        await mutateAsync(data);
        refetch();
    }

    const changeImage = (event : React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if(file){
            setImagePreview(URL.createObjectURL(file));
            fileInputRef.current = file;
        }
    }

    const clearFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current = null;
            setImagePreview('')
            delete errors.image;
            }
        };
        
    return (
    <Flex flexDirection={'column'} justifyContent={'start'} alignItems={'start'} gap={'1rem'} margin={'0rem 0 0.5rem'} p={'1rem'} borderBottom={'1px solid rgb(110, 110, 110, 0.333)'}>
    <HStack alignItems={'start'}>
    {f.imageCircle('https://images.pexels.com/photos/1172207/pexels-photo-1172207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', '32px', '0.2rem')}
    <form onSubmit={handleSubmit(onSubmit)}>
    <FormControl display={'flex'} alignItems={'start'}>
        <VStack justifyContent={'start'} min-height={'60px'}>
                <Textarea placeholder="What is Happening..." width={'420px'} minHeight={'60px'} border={'none'} color={'rgba(255, 255, 255, 0.496)'} resize={'none'} textDecoration={'none'} marginEnd={'1rem'} {...register("content")} value={textValue} onClick={() => {
                if(!getValues('image'))  resetField('image')}} ></Textarea>
                {imagePreview && 
                
                <Box position="relative" display="inline-block">
                    <Image src={imagePreview} height="200px" />
                    <IconButton
                    position="absolute"
                    top="15%"
                    right="3%"
                    transform="translate(-50%, -50%)"
                    icon={<BsXCircle />}
                    color={'white'}
                    fontSize={'1.33rem'}
                    size={'sm'}
                    isRound={true}
                    colorScheme="red"
                    variant={'solid'}
                    aria-label="close"
                    onClick={() => {unregister('image'); setImagePreview('')}}
                    >
                    </IconButton>
                </Box>}
                </VStack>
                <Box position="relative" display="inline-block">
                    <Input
                        type="file"
                        id="file-input"
                        opacity="0"
                        position="absolute"
                        left="0"
                        top="0"
                        height="100%"
                        width="100%"
                        aria-hidden="true"
                        {...register('image')}
                        onChange={changeImage}
                        ///useref errorr
                    />
                    <IconButton
                        as="label"
                        htmlFor="file-input"
                        colorScheme="green"
                        aria-label="Add Picture"
                        size="sm"
                        variant="ghost"
                        fontSize="1.33rem"
                        icon={<BsImage />}
                        marginEnd="0.5rem"
                        cursor="pointer"
                    />
                    </Box>
                <Button isDisabled={!!(errors.image?.message)} colorScheme="green" size={'sm'} type="submit" borderRadius={'20px'} width={'72px'}>Post</Button>
            </FormControl>
            <Text color={"error.primary"}>{errors.image && errors.image.message}</Text>
            </form>
            </HStack>
            </Flex>
    )
}

export const status = 
<Flex flexDirection={'column'} margin={'1rem 0 0.5rem'} borderBottom={'1px solid rgb(110, 110, 110, 0.333)'} mb={'1rem'}>
<Flex gap={'0.5rem'} alignItems={'center'} mb={'0.5rem'}>
<Link fontSize={'1rem'} color='color.grey'><BsArrowLeft></BsArrowLeft></Link>
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
    <Text fontSize={'0.7rem'} color='color.grey'>11:30 AM •</Text>
    <Text fontSize={'0.7rem'} color='color.grey'>Jul 31, 2023</Text>
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


export const otherProfileThreads =
<Flex flexDirection={'column'} alignItems={'start'} width={'100%'} borderRadius={'14px'} justifyContent={'space-around'} height={'45%'} pt={'1rem'} mt={'1.33rem'} mx={'auto'}>
<Flex gap={'0.5rem'} alignItems={'start'} mb={'0.5rem'}>
    <Link fontSize={'1rem'} color='color.grey' mt={'0.2rem'}><BsArrowLeft></BsArrowLeft></Link>
    <Heading as={'h3'} size={'md'} marginStart={'1.33rem'} mb={'1rem'} color={'whitesmoke'} fontWeight={'medium'}>John Doe</Heading>
</Flex>
<Box width={'90%'} marginX={'auto'} height={'42%'} mb={'1rem'}>
    <Image src="https://images.pexels.com/photos/1172207/pexels-photo-1172207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" width={'720px'} height={'80px'} objectFit={'cover'} borderRadius={'12px'}/>
    <Image borderRadius={'50%'} width={'64px'} height={'64px'} objectFit={'cover'} src={'https://images.pexels.com/photos/1172207/pexels-photo-1172207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} zIndex={4} position={'relative'} top={'-2rem'} left={'1rem'} border={`4px solid color.greyCard`}/>
    <Button colorScheme='gray' size={'sm'} variant='outline' color={'white'} zIndex={4} position={'relative'} top={'-3rem'} left={'24rem'} borderRadius={'14px'}>Edit Profile</Button>
</Box>
<Flex flexDirection={'column'} alignItems={'start'} width={'90%'} marginX={'auto'} gap={'0.33rem'}>
    <Heading as={'h3'} size={'md'} color={'whitesmoke'}>Bagus Hendrawan</Heading>
    <Text fontSize={'1rem'} color='color.grey'>@bag-user</Text>
    <Text color={'white'}>Not all who wander are lost</Text>
</Flex>
<Flex justifyContent={'start'} width={'90%'} gap={'0.33rem'} marginX={'auto'} color={'white'} fontSize={'small'}>
    <Text fontWeight={'bold'}>229</Text>
    <Text me={'0.33rem'} color='color.grey'>Following</Text>
    <Text fontWeight={'bold'}>344</Text>
    <Text color='color.grey'>Followers</Text>
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