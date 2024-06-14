import { Box, Button, Flex, FormControl, FormLabel, HStack, Heading, Input, Link, Text } from "@chakra-ui/react";
import { useResetForm } from "../features/hooks/authReset";

export default function resetPassword()
{
    const { handleSubmit, onSubmit, register, errors } = useResetForm();
   
    return (
        <Box width={"100%"} height={"733px"} bg="circle.greyBg" position={"absolute"}>
        <Flex flexDirection={'column'} bg="circle.greyCard" maxWidth={'720px'} borderRadius={'12px'} px={'2rem'} py={'1.5rem'} mt={'6rem'} mx={"auto"}>
        <Heading as={'h2'} size={'xl'} marginBottom={'0.33rem'} color={'lime'}>Circle</Heading>
        <Text fontWeight={'bold'} fontSize={'1.5rem'} color={'white'}>Reset Your Password</Text>

        <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl display={'flex'} flexDirection={'column'} alignItems={'center'} color={'white'}>
            <Box my={'1rem'} width={'100%'}>
            <FormLabel color={'white'}>Password</FormLabel>
            <Input type='password' isRequired {...register("password", {required: true})}/>
            <Text color={"error.primary"}>{errors.password?.message}</Text>
            </Box>
            <Box mb={'1rem'} width={'100%'}>
            <FormLabel color={'white'}>Confirm Password</FormLabel>
            <Input type='password' isRequired {...register("c_password", {required: true})}/>
            <Text color={"error.primary"}>{errors.password?.message}</Text>
            </Box>
            <Button isDisabled={!!(errors.password?.message)} colorScheme='green' variant='solid' width={'100%'} borderRadius={'20px'} marginTop={'1rem'} type="submit">Send Email</Button>
            <HStack alignSelf={'start'} mt={'0.5rem'}>
            <Text color={'white'} me={'0.33rem'}>Already Remembered?</Text>
            <Link href="/login" color={'teal'}>Login</Link>
            </HStack>
        </FormControl>
        </form>
        </Flex>
        </Box>
    )
}