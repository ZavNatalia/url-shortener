import React, {ChangeEvent, FC, useState} from 'react';
import {
    Box,
    Button,
    Flex,
    HStack,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    Spinner,
    Text,
    useClipboard
} from "@chakra-ui/react";
import {CheckIcon, CloseIcon, CopyIcon} from "@chakra-ui/icons";
import {Link as ReachLink} from "react-router-dom";
import axios from "axios";
import {emailValidator} from "../utils/email-validator";
import {mainUrl} from "../utils/main-url";

const Shortener: FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [originalURL, setOriginalURL] = useState('');

    const [linkID, setLinkID] = useState(null);
    const [fullURL, setFullURL] = useState('');
    const [shortURL, setShortURL] = useState('');

    const {hasCopied: hasStatURLCopied, onCopy: onStatURLCopy} = useClipboard(fullURL);
    const {hasCopied: hasShortURLCopied, onCopy: onShortURLCopy} = useClipboard(shortURL);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const isValidHttpURL = (string: string) => {
        let res = string.match(emailValidator);
        return (res !== null);
    };

    const shortenURL = async () => {
        if (isValidHttpURL(inputValue)) {
            try {
                setIsLoading(true);
                const {data} = await axios({
                    method: 'post',
                    url: `${mainUrl}/linkUrl`,
                    data: {
                        full_url: inputValue
                    }
                });
                clearInput();
                setLinkID(data.id);
                setOriginalURL(inputValue);
                setFullURL(data.full_url);
                setShortURL(data.short_url);
            } catch (e: any) {
                setError(e.message ?? 'No data received')
            } finally {
                setIsLoading(false)
            }
        } else {
            setError('The URL is not valid, make sure the URL you tried to shorten is correct.');
            setShortURL('');
            setFullURL('');
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
                <HStack spacing={2} mb={3}>
                    <Text width='50px'>Short:</Text>
                    <Text color='coral'>{shortURL}</Text>
                    <IconButton
                        aria-label='Copy link'
                        size='sm'
                        icon={hasShortURLCopied ? <CheckIcon color='green'/> : <CopyIcon/>}
                        onClick={onShortURLCopy}
                    />
                </HStack>
                <HStack spacing={2} mb={3}>
                    <Text width='50px'>Stat:</Text>
                    <Text whiteSpace='nowrap'
                          overflow='hidden'
                          textOverflow='ellipsis'
                          maxWidth='480px'
                          color='coral'
                    >
                        {fullURL}
                    </Text>
                    <IconButton
                        aria-label='Copy link'
                        size='sm'
                        icon={hasStatURLCopied ? <CheckIcon color='green'/> : <CopyIcon/>}
                        onClick={onStatURLCopy}
                    />
                </HStack>
                <HStack spacing={2} mb={6}>
                    <Flex>Track&nbsp;
                        <Link as={ReachLink} to={`stat/${linkID}`} color='purple.500' fontWeight='bold'>the total of
                            clicks</Link>
                        &nbsp;in real-time from your shortened URL.</Flex>
                </HStack>
                <HStack spacing={2} mb={2} alignItems='flex-start'>
                    <Text fontSize='sm'>Destination:</Text>
                    <Link fontSize='sm' color='gray' overflowWrap='anywhere' href={originalURL}
                          isExternal>{originalURL}</Link>
                </HStack>
            </Box>}
        </>

    );
};

export default Shortener;
