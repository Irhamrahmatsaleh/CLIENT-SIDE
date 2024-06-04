import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createStandaloneToast } from '@chakra-ui/toast'
import { BrowserRouter } from 'react-router-dom'

const { ToastContainer, toast } = createStandaloneToast()

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement!).render(
    <React.StrictMode>
        <BrowserRouter>
          <App />
          <ToastContainer />
        </BrowserRouter>
    </React.StrictMode>
)

toast({ title: 'Chakra UI' })

