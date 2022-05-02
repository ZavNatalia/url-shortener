import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {Box, ChakraProvider, Container, Flex, Heading} from '@chakra-ui/react';
import Stat from './pages/Stat';
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
            <Container maxW='50%' minW='600px' mt='40px'>
                <Routes>
                    <Route path="/" element={<Shortener />} />
                    <Route path="/stat" element={<Stat />} />
                </Routes>
            </Container>
        </Box>
    </ChakraProvider>
  );
}

export default App;
