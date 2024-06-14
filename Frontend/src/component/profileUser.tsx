import { Box, Button, Divider, Flex, FormControl, FormHelperText, Heading, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { BsImage } from "react-icons/bs";
import { useEditProfileForm } from "../features/hooks/submitEditProfile";
import { editProfileForm } from "../libs/type";
import { fetchProfile } from "./profileCard";

export default function profileUser(){
    const { data: profileData  } = useQuery<editProfileForm>({
        queryKey: ["profile"],
        queryFn: fetchProfile,
        });
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    const onOpen = () => setIsOpen(true);
    const fileInputRef = useRef<File | null>(null) ;
    const [photoPreview, setPhotoPreview] = useState<string | undefined>(profileData?.photo_profile);
    const changePhoto = (event : React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        console.log(file);
        if(file){
            setPhotoPreview(URL.createObjectURL(file));
            fileInputRef.current = file;
            console.log(photoPreview);
        }
    }
    const { handleSubmit, onSubmit, register, errors } = useEditProfileForm();
    return (
        <Flex flexDirection={'column'} alignItems={'start'} width={'100%'} borderRadius={'14px'} justifyContent={'space-around'} height={'45%'} pt={'1rem'} mt={'2rem'} mx={'auto'}>
        <Heading as={'h3'} size={'md'} marginStart={'1.33rem'} mb={'1rem'} color={'whitesmoke'} fontWeight={'medium'}>My Profile</Heading>
            <Box width={'90%'} marginX={'auto'} height={'42%'}>
                <Image src={profileData?.photo_profile} width={'720px'} height={'80px'} objectFit={'cover'} borderRadius={'12px'}/>
                <Image borderRadius={'50%'} width={'64px'} height={'64px'} objectFit={'cover'} src={profileData?.photo_profile} zIndex={4} position={'relative'} top={'-2rem'} left={'1rem'} border={`4px solid ${'circle.greyCard'}`}/>
                
                <Button onClick={onOpen} colorScheme='gray' size={'sm'} variant='outline' color={'white'} zIndex={4} position={'relative'} top={'-3rem'} left={'27rem'} borderRadius={'14px'}>Edit Profile</Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalContent bgColor={'circle.greyCard'} maxWidth={'720px'} borderRadius={'12px'} px={'1.5rem'} py={'1rem'} mt={'2rem'}>
                    <ModalHeader color={'white'}>Edit Profile</ModalHeader>
                    <ModalCloseButton color={'white'} mt={'0.5rem'} me={'0.5rem'} />
                    <ModalBody>
                    <Flex flexDirection={'column'}>
                        <Box width={'100%'} marginX={'auto'} height={'60%'} mb={'0.5rem'}>
                        <Image src={photoPreview && photoPreview} width={'720px'} height={'120px'} objectFit={'cover'} borderRadius={'12px'}/>
                        <Image borderRadius={'50%'} width={'72px'} height={'72px'} objectFit={'cover'} src={ photoPreview && photoPreview} zIndex={4} position={'relative'} top={'-2rem'} left={'1rem'} border={`4px solid ${'circle.greyCard'}`}/>
                        </Box>
                        <FormControl display={'flex'} width={'100%'} flexDirection={'column'} alignItems={'start'} marginBottom={'0.33rem'} color={'white'}>
                            <Box mb={'1rem'} width={'100%'} border={`1px solid grey`} p={'0.33rem'} borderRadius={'12px'}>
                            <FormHelperText fontSize={'0.75rem'} color={'circle.grey'} ms={'1rem'}>Name</FormHelperText>
                            <Input border={'none'} type='text' placeholder="John Doe" {...register("full_name", {required: true})} isRequired/>
                            </Box>
                            <Box mb={'1rem'} width={'100%'} border={`1px solid grey`} p={'0.33rem'} borderRadius={'12px'}>
                            <FormHelperText fontSize={'0.75rem'} color={'circle.grey'} ms={'1rem'}>Username</FormHelperText>
                            <Input border={'none'} type='text' placeholder="@john_doe" {...register("username", {required: true})} isRequired/>
                            </Box>
                            <Box width={'100%'} border={`1px solid grey`} p={'0.33rem'} borderRadius={'12px'}>
                            <FormHelperText fontSize={'0.75rem'} color={'circle.grey'} ms={'1rem'}>Bio</FormHelperText>
                            <Textarea width={'100%'} minHeight={'80px'} border={'none'} resize={'none'} textDecoration={'none'} marginEnd={'1rem'} {...register("bio")}></Textarea>
                            </Box>
                        </FormControl>
                    </Flex>
                    </ModalBody>
                    <ModalFooter>
                    <Box position="relative" display="inline-block">
                            <Input
                                type="file"
                                id="photo-input"
                                opacity="0"
                                position="absolute"
                                left="0"
                                top="0"
                                height="100%"
                                width="100%"
                                aria-hidden="true"
                                {...register('photo_profile')}
                                
                                onChange={changePhoto}
                            />
                            <IconButton
                                as="label"
                                htmlFor="photo-input"
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
                    <Button colorScheme="green" size={'md'} type="submit" borderRadius={'20px'} width={'72px'}>Save</Button>
                    </ModalFooter>
                    </ModalContent>
                    </form>
                </Modal>
            </Box>
            <Flex flexDirection={'column'} alignItems={'start'} width={'90%'} marginX={'auto'} gap={'0.33rem'}>
                <Heading as={'h3'} size={'md'} color={'whitesmoke'}>{profileData?.full_name}</Heading>
                <Text fontSize={'1rem'} color={'circle.grey'}>{profileData?.username}</Text>
                <Text color={'white'}>{profileData?.bio}</Text>
            </Flex>
            <Flex justifyContent={'start'} width={'90%'} gap={'0.33rem'} marginX={'auto'} color={'white'} fontSize={'small'}>
                <Text fontWeight={'bold'}>{profileData?.follower}</Text>
                <Text me={'0.33rem'} color={'circle.grey'}>Following</Text>
                <Text fontWeight={'bold'}>{profileData?.following}</Text>
                <Text color={'circle.grey'}>Followers</Text>
            </Flex>
        <Divider orientation='horizontal' borderColor={'rgb(110, 110, 110, 0.333)'} mt={'1rem'}/>
        </Flex>
    )
}