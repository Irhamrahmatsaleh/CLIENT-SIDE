
import Sidebar from './sidebar';
import ProfileCard from './profileCard';
import Login from './auth/login';
import Register from './auth/register';
import Forgot from './auth/forgot';
import Search from './sidebarButton/search';
import Follow from './sidebarButton/follow';
import Home from './sidebarButton/home';
import Profile from './sidebarButton/profile';
import Status from './sidebarButton/status'

import { ChakraProvider, Flex, Heading } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import status from './sidebarButton/status';
import React from 'react';

export default function App() {

  const bgColor = '#1D1D1D'
  return (
    <ChakraProvider>
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