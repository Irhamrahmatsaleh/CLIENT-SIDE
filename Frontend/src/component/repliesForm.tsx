import { Box, Button, Flex, FormControl, HStack, IconButton, Image, Input, Textarea, VStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import Axios, { AxiosError } from 'axios';
import React, { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsImage, BsXCircle } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { createThreadSchema } from "../features/validators/threads";
import { api } from "../libs/api";
import { replies, repliesForm, thread, threadsForm } from "../libs/type";
import f from './function';
import { fetchReplies } from "./replies";


export const RepliesForm : React.FC= () => {
    const {id} = useParams();
    const textareaRef = useRef<string>() ;
    const fileInputRef = useRef<File | null>(null) ;
    const [imagePreview, setImagePreview] = useState<string>("");
    const [textValue, setTextValue] = useState<string>();

    const { refetch } = useQuery<replies[]>({
        queryKey: ["replies"],
        queryFn: () => fetchReplies(id),
        });

    const {
        register,
        handleSubmit,
      } = useForm<repliesForm>({
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
            url: `${api}/replies${id}`,
            data: formData,
            headers: { 
                "Content-Type": "multipart/form-data",
                'Authorization': `Bearer ${token}`
                },
            })
        },
    });

    
    const onSubmit: SubmitHandler<threadsForm> = async (data : { content: any; image: any ; }) => {
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
            console.log('File input cleared');
        }
        };
        

    return (
    <Flex flexDirection={'column'} justifyContent={'start'} alignItems={'start'} gap={'1rem'} margin={'0rem 0 0.5rem'} p={'1rem'} borderBottom={'1px solid rgb(110, 110, 110, 0.333)'}>
    <HStack alignItems={'start'}>
    {f.imageCircle('https://images.pexels.com/photos/1172207/pexels-photo-1172207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', '32px', '0.2rem')}
    <form onSubmit={handleSubmit(onSubmit)}>
    <FormControl display={'flex'} alignItems={'start'}>
        <VStack justifyContent={'start'} min-height={'60px'}>
                <Textarea placeholder="Type your reply!" width={'420px'} minHeight={'60px'} border={'none'} color={'rgba(255, 255, 255, 0.496)'} resize={'none'} textDecoration={'none'} marginEnd={'1rem'} {...register("content")} value={textValue} ></Textarea>
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
                    onClick={clearFileInput}
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
                <Button onClick={() => {console.log("Hit Submit")}} colorScheme="green" size={'sm'} type="submit" borderRadius={'20px'} width={'72px'}>Reply</Button>
            </FormControl>
            </form>
            </HStack>
            </Flex>
    )
}