import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Box, ChakraProvider, Container, Flex, Heading} from '@chakra-ui/react';
import Statistics from './pages/Statistics';
import Shortener from "./pages/Shortener";

function App() {
    return (
        <ChakraProvider>
            <Box height='100vh'>
                <Flex
                    alignItems='center'
                    justifyContent='center'
                    height='100px'
                    backgroundColor='purple.800'>
                    <Heading color='white' letterSpacing={2}>URL Shortener</Heading>
                </Flex>
                <Container maxW='50%' minW='600px' mt='40px' p='20px'>
                    <Routes>
                        <Route path="/" element={<Shortener/>}/>
                        <Route path="/stat/:id" element={<Statistics/>}/>
                        <Route path="*" element={<Navigate to="/" replace/>}/>
                    </Routes>
                </Container>
            </Box>
        </ChakraProvider>
    );
}

export default App;
