
import Sidebar from './component/sidebar';
import ProfileCard from './component/profileCard';
import Login from './pages/login';
import Register from './pages/register';
import Forgot from './component/forgot';
import Search from './pages/search';
import Follow from './pages/follow';
import Home from './pages/home';
import Profile from './pages/profile';
import Status from './pages/status'

import { ChakraProvider, Flex, Heading } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import status from './pages/status';
import React from 'react';
import theme from './libs/chakra-theme'

export default function App() {

  return (
    <ChakraProvider theme={theme}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/follow" element={<Follow />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/threads" element={<Status/>} />
        </Routes>
    </ChakraProvider>
  )
}