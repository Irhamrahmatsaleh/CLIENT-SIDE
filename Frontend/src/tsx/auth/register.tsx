import { Box, Button, Flex, FormControl, FormHelperText, FormLabel, HStack, Heading, Input, Link, Text } from "@chakra-ui/react";
import React from "react";
import { useForm, SubmitHandler, Form } from "react-hook-form"
import Axios from "axios"


const color = {
    grey: '#909090',
    greyCard: '#262626',
    greyBg: '#444444'
}

export default function register()
{
    type registerForm = {
        full_name : string,
        email : string,
        password : string
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<registerForm>()

      async function submit(data) {
            try {
            console.log("data " + objectToFormData(data));
            const response = await Axios({
                method: "post",
                url: "http://localhost:5000/api/v1/user",
                data: objectToFormData(data),
                headers: { "Content-Type": "multipart/form-data" },
              })
            // handle success
            console.log(response);
            } catch (error) {
            // handle error
            console.log(error);
            }
        };
        const onSubmit: SubmitHandler<registerForm> = (data) => {
            console.log(JSON.stringify(data));
            submit(data);
        }

        console.log(watch("full_name")) // watch input value by passing the name of it

        function objectToFormData(obj : Object){
            const formData = new FormData();
            for (const key in obj) {
                formData.append(key, obj[key]);
            }
            return formData;
          }

    return (
        <Box width={"100%"} height={"733px"} bgColor={color.greyBg} position={"absolute"}>
        <Flex flexDirection={'column'} bgColor={color.greyCard} maxWidth={'720px'} borderRadius={'12px'} px={'2rem'} py={'1.5rem'} mt={'6rem'} mx={"auto"}>
        <Heading as={'h2'} size={'xl'} marginBottom={'0.33rem'} color={'lime'}>Circle</Heading>
        <Text fontWeight={'bold'} fontSize={'1.5rem'} color={'white'}>Create account Circle</Text>

        <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl display={'flex'} flexDirection={'column'} alignItems={'center'} color={'white'}>
            <Box my={'1rem'} width={'100%'}>
            <FormLabel color={'white'}>Full Name</FormLabel>
            <Input type='text' placeholder="John Doe" isRequired {...register("full_name", {required: true})}/>
            </Box>
            <Box mb={'1rem'} width={'100%'}>
            <FormLabel color={'white'}>Email address</FormLabel>
            <Input type='email' placeholder="example@example.com" isRequired {...register("email", {required: true})}/>
            {errors.password && <span>This field is required</span>}
            </Box>
            <Box mb={'1rem'} width={'100%'}>
            <FormLabel color={'white'}>Password</FormLabel>
            <Input type='password' isRequired {...register("password", {required: true})}/>
            {errors.password && <span>This field is required</span>}
            </Box>
            <Button colorScheme='green' variant='solid' width={'100%'} borderRadius={'20px'} marginTop={'1rem'} type="submit">Create Account</Button>
            <HStack alignSelf={'start'} mt={'0.5rem'}>
            <Text color={'white'} me={'0.33rem'}>Already have account?</Text>
            <Link color={'teal'}>Login</Link>
            </HStack>
        </FormControl>
        </form>
        </Flex>
        </Box>
    )
}