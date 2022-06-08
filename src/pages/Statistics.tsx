import {Button, Flex, Heading, Spinner, Text} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {RepeatIcon} from '@chakra-ui/icons';
import axios from "axios";
import {statUrl} from "../constants/urls";

const Statistics = () => {
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    let {id} = useParams();

    useEffect(() => {
        fetchStat();
    }, []);

    const fetchStat = async () => {
        try {
            setIsLoading(true);
            setError('');
            const response = await axios.get(`${statUrl}/${id}`);
            setCount(response.data);
        } catch (e: any) {
            setError(e.message ?? 'No data received');
        } finally {
            setIsLoading(false);
        }
    };

    if (error) {
        return (
            <Flex alignItems='center' justifyContent='center' mt='80px' flexDirection='column'>
                <Text color='darkred'>{error}</Text>
                <Button
                    mt='30px'
                    colorScheme='purple'
                    leftIcon={<RepeatIcon/>}
                    onClick={fetchStat}
                >
                    Retry
                </Button>
                <Link to='/'>
                    <Button size='sm' mt='30px' colorScheme='purple' variant='ghost'>Create shortened URL</Button>
                </Link>
            </Flex>
        )
    }

    return (
        <>
            {isLoading
                ?
                <Flex w='100%' alignItems='center' justifyContent='center' height='150px' mt='50px'>
                    <Spinner thickness='5px'
                             speed='0.85s'
                             emptyColor='gray.200'
                             color='purple.500'
                             size='xl'/>
                </Flex>
                :
                <Flex alignItems='center'
                      justifyContent='center'
                      flexDirection='column'
                      w='100%'
                      mt='50px'>
                    <Flex
                        borderWidth='1px'
                        p={5}
                        mb={8}
                        borderRadius='lg'
                        backgroundColor='purple.100'
                        alignItems='center'
                        justifyContent='center'
                        flexDirection='column'
                    >
                        <Heading size='md' mb={2}>Total URL Clicks</Heading>
                        <Text fontSize='55px' fontWeight='bold'>{count}</Text>
                    </Flex>
                    <Link to='/'>
                        <Button size='sm' colorScheme='purple' variant='outline'>Create other shortened
                            URL</Button>
                    </Link>
                </Flex>
            }
        </>
    );
};

export default Statistics;
