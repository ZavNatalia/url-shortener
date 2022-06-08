import React, {ChangeEvent, FC, useState} from 'react';
import {
    Box,
    Button,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Text
} from "@chakra-ui/react";
import {CloseIcon} from "@chakra-ui/icons";
import axios from "axios";
import Result from "../components/Result";
import {LinksProps} from "../models/LinksProps";
import {linkUrl} from '../constants/urls';
import {isValidURL} from "../utils/is-valid-url";

const Shortener: FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [originalURL, setOriginalURL] = useState('');
    const [links, setLinks] = useState<LinksProps | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const shortenURL = async () => {
        if (inputValue.length === 0) {
            setError('The URL is required.');
            setLinks(null);
            return;
        }
        if (isValidURL(inputValue)) {
            try {
                setIsLoading(true);
                const {data} = await axios({
                    method: 'post',
                    url: linkUrl,
                    data: {
                        full_url: inputValue
                    }
                });
                clearInput();
                setOriginalURL(inputValue);
                setLinks({shortURL: data.short_url, fullURL: data.full_url, linkID: data.id});
            } catch (e: any) {
                setError(e.message ?? 'Server error. No data received.')
            } finally {
                setIsLoading(false)
            }
        } else {
            setLinks(null);
            setError('The URL is not valid, make sure the URL you tried to shorten is correct.');
        }
    };
    const clearInput = () => {
        setInputValue('');
        setError('');
    };

    const onChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) {
            setError('')
        }
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
                            isLoading={isLoading}
                            onClick={shortenURL}>
                            Shorten URL
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </Box>
            {error && <Text mt='20px' color='darkred'>{error}</Text>}
            {!isLoading && links && <Result links={links} originalURL={originalURL}/>}
        </>
    );
};

export default Shortener;
