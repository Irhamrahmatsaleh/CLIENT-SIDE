import React from 'react';
import Threads from './threads'
import Sidebar from './sidebar'
import Profile from './profile';

// 1. import `ChakraProvider` component
import { ChakraProvider, Flex } from '@chakra-ui/react'

export default function App() {
  // 2. Wrap ChakraProvider at the root of your app

  const bgColor = '#1D1D1D'
  return (
    <ChakraProvider>
      <Flex justifyContent={'start'} bg={bgColor} maxHeight={'733px'}>
            <Sidebar />
            <Threads />
            <Profile />
      </Flex>
    </ChakraProvider>
  )
}