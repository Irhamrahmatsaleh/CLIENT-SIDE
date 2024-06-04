import { Box, Button, Flex, FormControl, FormHelperText, FormLabel, HStack, Heading, Input, Link, Text } from "@chakra-ui/react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Axios from 'axios';
import { loginForm } from "@/libs/type";

export default function login()
{
    let loginResponse;

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<loginForm>()

      async function submit(data : object) {
            try {
            const response = await Axios({
                method: "post",
                url: "http://localhost:5000/api/v1/login",
                data: objectToFormData(data),
                headers: { "Content-Type": "multipart/form-data" },
              })
            // handle success
            loginResponse = response;
            const token = response.data.user.token;
            
            if (token) {
              localStorage.setItem("token", response.data.user.token);
            }
            if(response.status === 200)
                {
                    window.location.href = '/';
                }
            } catch (error) {
            // handle error
            console.log(error);
            }
        };

        const onSubmit: SubmitHandler<loginForm> = (data) => {
            submit(data);
        }

        function objectToFormData(obj: Record<string, any>): FormData{
            const formData = new FormData();
            for (const key in obj) {
                formData.append(key, obj[key]);
            }
            return formData;
          }

    return (
        <Box width={"100%"} height={"733px"} bgColor="circle.greyBg" position={"absolute"}>
        <Flex flexDirection={'column'} bgColor="color.greyCard" maxWidth={'720px'} borderRadius={'12px'} px={'2rem'} py={'1.5rem'} mt={'6rem'} mx={'auto'}>
        <Heading as={'h2'} size={'xl'} marginBottom={'0.33rem'} color={'lime'}>Circle</Heading>
        <Text fontWeight={'bold'} fontSize={'1.5rem'} color={'white'}>Login to circle</Text>

        <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl display={'flex'} flexDirection={'column'} alignItems={'center'} color={'white'}>
            <Box my={'1rem'} width={'100%'}>
            <FormLabel color={'white'}>Email address</FormLabel>
            <Input type='email' placeholder="example@example.com" isRequired {...register("email", {required: true})}/>
            </Box>
            <Box mb={'1rem'} width={'100%'}>
            <FormLabel color={'white'}>Password</FormLabel>
            <Input type='password' isRequired {...register("password", {required: true})}/>
            </Box>
            <Link color={'white'} alignSelf={'end'}>Forgot Password?</Link>

            <Button colorScheme='green' variant='solid' width={'100%'} borderRadius={'20px'} marginTop={'1rem'} type="submit">Login</Button>
            <HStack alignSelf={'start'} mt={'0.5rem'}>
            <Text color={'white'} me={'0.33rem'}>Don't have an account yet?</Text>
            <Link color={'teal'}>Create Account</Link>
            </HStack>

        </FormControl>
        </form>
        </Flex>
        </Box>
    )
}