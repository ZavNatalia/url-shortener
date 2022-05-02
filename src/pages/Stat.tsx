import {Button, Flex, Heading, Spinner, Text} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {RepeatIcon} from '@chakra-ui/icons';

const Stat = () => {
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchStat();
    }, []);

    const fetchStat = async () => {
        try {
            setIsLoading(true);
            setError('');
            // const response = await axios.get('');
            setCount(100);
        } catch (e: any) {
            setError(e.message ?? 'No data received');
        } finally {
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
        }
    };

    if (error) {
        return (
            <Flex alignItems='center' justifyContent='center' mt='50px' flexDirection='column'>
                <Text color='darkred'>{error}</Text>
                <Button
                    mt='30px'
                    colorScheme='purple'
                    variant='ghost'
                    leftIcon={<RepeatIcon/>}
                    onClick={fetchStat}
                >
                    Retry
                </Button>
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
                        borderRadius='lg'
                        backgroundColor='purple.100'
                        alignItems='center'
                        justifyContent='center'
                        flexDirection='column'
                    >
                        <Heading size='md'>Total URL Clicks</Heading>
                        <Text fontSize='55px' fontWeight='bold'>{count}</Text>
                    </Flex>
                    <Link to='/'>
                        <Button size='sm' mt='30px' colorScheme='purple' variant='outline'>Create other shortened
                            URL</Button>
                    </Link>
                </Flex>
            }
        </>
    );
};

export default Stat;
