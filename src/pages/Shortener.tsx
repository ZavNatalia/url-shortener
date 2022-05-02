import React, {ChangeEvent, useState} from 'react';
import {
    Box,
    Button, Flex,
    HStack, IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Link, Spinner,
    Text,
    useClipboard
} from "@chakra-ui/react";
import {CheckIcon, CloseIcon, CopyIcon, PhoneIcon} from "@chakra-ui/icons";
import {Link as RouterLink} from "react-router-dom";
import axios from "axios";

const Shortener = () => {
    const [inputValue, setInputValue] = useState('');
    const [longURL, setLongURL] = useState('');

    const [statURL, setStatURL] = useState('');
    const [shortURL, setShortURL] = useState('');

    const {hasCopied: hasStatURLCopied, onCopy: onStatURLCopy} = useClipboard(statURL);
    const {hasCopied: hasShortURLCopied, onCopy: onShortURLCopy} = useClipboard(shortURL);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const isValidHttpUrl = (string: string) => {
        let res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        return (res !== null)
    };

    const shortenURL = async () => {
        if (isValidHttpUrl(inputValue)) {
            try {
                setIsLoading(true);
                // const response = await axios.get('');
                setLongURL(inputValue);
                clearInput();
                setShortURL('shorturl.at/pxCD2');
                setStatURL('shorturl.at/pxCD2/stat');
            } catch (e: any) {
                setError(e.message ?? 'No data received')
            } finally {
                setTimeout(() => {
                    setIsLoading(false)
                }, 500)
            }
        } else {
            setError('The URL is not valid, make sure the URL you tried to shorten is correct.');
            setShortURL('');
            setStatURL('');
        }

    };
    const clearInput = () => {
        setInputValue('');
        setError('');
    };

    const onChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setError('');
        setInputValue(e.target.value);
    };

    return (
        <>
            <Box mt='60px'>
                <InputGroup size='lg'>
                    <Input
                        variant='flushed'
                        focusBorderColor='purple.500'
                        pr='155px'
                        placeholder='Enter the URL to be shortened'
                        value={inputValue}
                        onChange={onChangeInputValue}
                    />
                    <InputRightElement width='155px' justifyContent='flex-end'>
                        {inputValue && <IconButton
                            backgroundColor='transparent'
                            color='gray.500'
                            aria-label='Delete link'
                            size='xs'
                            mr='10px'
                            icon={<CloseIcon/>}
                            onClick={clearInput}
                        />}

                        <Button
                            h='39px'
                            size='sm'
                            colorScheme='purple'
                            onClick={shortenURL}>
                            Shorten URL
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </Box>

            {error && <Text mt='20px' color='darkred'>{error}</Text>}

            {isLoading && <Flex w='100%' alignItems='center' justifyContent='center' height='150px'>
                <Spinner thickness='5px'
                         speed='0.85s'
                         emptyColor='gray.200'
                         color='purple.500'
                         size='xl'/>
            </Flex>}

            {!isLoading && shortURL && <Box
                w='100%'
                m='30px auto'
                p='20px'
                borderWidth='1px'
                borderRadius='md'
                overflow='hidden'>
                <HStack spacing={2} mb={2}>
                    <Text width='50px'>Short:</Text>
                    <Link color='coral'>{shortURL}</Link>
                    <IconButton
                        aria-label='Copy link'
                        size='sm'
                        icon={hasShortURLCopied ? <CheckIcon color='green'/> : <CopyIcon/>}
                        onClick={onShortURLCopy}
                    />
                </HStack>
                <HStack spacing={2} mb={2}>
                    <Text width='50px'>Stat:</Text>
                    <Link whiteSpace='nowrap'
                          overflow='hidden'
                          textOverflow='ellipsis'
                          maxWidth='480px'
                          color='coral'
                          isExternal
                    >
                        {statURL}
                    </Link>

                    <IconButton
                        aria-label='Copy link'
                        size='sm'
                        icon={hasStatURLCopied ? <CheckIcon color='green'/> : <CopyIcon/>}
                        onClick={onStatURLCopy}
                    />
                </HStack>
                <HStack spacing={2} mb={6}>
                    <Text>Track&nbsp;
                        <RouterLink to="stat">
                            <Link whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis' maxWidth='480px'
                                  color='purple.500' fontWeight='bold'>the total of clicks</Link>
                        </RouterLink>
                        &nbsp;in real-time from your shortened URL.</Text>
                </HStack>
                <HStack spacing={2} mb={2} alignItems='flex-start'>
                    <Text fontSize='xs'>Destination:</Text>

                    <Link fontSize='xs' color='gray' overflowWrap='anywhere' href={longURL}
                          isExternal>{longURL}</Link>
                </HStack>
            </Box>}
        </>

    );
};

export default Shortener;
