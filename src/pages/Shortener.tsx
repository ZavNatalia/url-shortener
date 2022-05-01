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
import {CheckIcon, CopyIcon} from "@chakra-ui/icons";
import {Link as RouterLink} from "react-router-dom";
import axios from "axios";

const Shortener = () => {
    const [inputValue, setInputValue] = useState('');
    const [longURL, setLongURL] = useState('');

    const [statURL, setStatURL] = useState('');
    const [shortURL, setShortURL] = useState('');

    const {hasCopied: hasStatURLCopied, onCopy: onStatURLCopy} = useClipboard(statURL);
    const {hasCopied: hasShortURLCopied, onCopy: onShortURLCopy} = useClipboard(shortURL);

    const [error, setError] = useState('');


    const shortenURL = async () => {
        if (inputValue) {
            try {
                setError('');
                // const response = await axios.get('');
                setLongURL(inputValue);
                setShortURL('shorturl.at/acvL5');
                setStatURL('shorturl.at/cdavL5/stat');
                setInputValue('');
            } catch (e: any) {
                setError(e.message ?? 'No data received')
            }
        }

    };
    const onChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    return (
        <>
            <Box mt='60px'>
                <InputGroup size='lg'>
                    <Input
                        variant='flushed'
                        focusBorderColor='purple.500'
                        pr='8.5rem'
                        placeholder='Enter the URL to be shortened'
                        value={inputValue}
                        onChange={onChangeInputValue}
                    />
                    <InputRightElement width='8rem'>
                        <Button
                            h='2.3rem'
                            size='sm'
                            colorScheme='purple'
                            onClick={shortenURL}>
                            Shorten URL
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </Box>

            {error && <Text mt='20px' color='darkred'>{error}</Text>}

           {shortURL && statURL && <Box
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
                                  color='purple.500'>the total of clicks</Link>
                        </RouterLink>
                        &nbsp;in real-time from your shortened URL.</Text>
                </HStack>
                <HStack spacing={2} mb={2}>
                    <Text fontSize='xs'>Destination:</Text>

                    <Link fontSize='xs' color='gray' overflowWrap='anywhere' href={longURL}
                          isExternal>{longURL}</Link>
                </HStack>
            </Box>}
        </>

    );
};

export default Shortener;
