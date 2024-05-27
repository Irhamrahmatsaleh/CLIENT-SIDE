import { Box, Button, Flex, FormControl, FormHelperText, FormLabel, HStack, Heading, Input, Link, Text } from "@chakra-ui/react";

export default function login()
{
    const color = {
        grey: '#909090',
        greyCard: '#262626'
    }

    return (
        <>
        <Flex flexDirection={'column'} bgColor={color.greyCard} maxWidth={'720px'} borderRadius={'12px'} px={'2rem'} py={'1.5rem'} mt={'2rem'}>
        <Heading as={'h2'} size={'xl'} marginBottom={'0.33rem'} color={'lime'}>Circle</Heading>
        <Text fontWeight={'bold'} fontSize={'1.5rem'} color={'white'}>Login to circle</Text>
        <FormControl display={'flex'} flexDirection={'column'} alignItems={'center'}>
            <Box my={'1rem'} width={'100%'}>
            <FormLabel color={'white'}>Email address</FormLabel>
            <Input type='email' placeholder="example@example.com" isRequired/>
            </Box>
            <Box mb={'1rem'} width={'100%'}>
            <FormLabel color={'white'}>Password</FormLabel>
            <Input type='password' isRequired/>
            </Box>
            <Link color={'white'} alignSelf={'end'}>Forgot Password?</Link>

            <Button colorScheme='green' variant='solid' width={'100%'} borderRadius={'20px'} marginTop={'1rem'}>Login</Button>
            <HStack alignSelf={'start'} mt={'0.5rem'}>
            <Text color={'white'} me={'0.33rem'}>Don't have an account yet?</Text>
            <Link color={'teal'}>Create Account</Link>
            </HStack>

        </FormControl>
        </Flex>
        </>
    )
}