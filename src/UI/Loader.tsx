import React from 'react';
import {Spinner} from "@chakra-ui/react";

const Loader = () => {
    return (
        <Spinner thickness='5px'
                 speed='0.85s'
                 emptyColor='gray.200'
                 color='purple.500'
                 size='xl'/>
    );
};

export default Loader;
