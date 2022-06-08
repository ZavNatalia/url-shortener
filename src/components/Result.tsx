import React, {FC} from 'react';
import {Flex, HStack, IconButton, Link, Text, useClipboard} from "@chakra-ui/react";
import {CheckIcon, CopyIcon} from "@chakra-ui/icons";
import {Link as ReachLink} from "react-router-dom";
import {LinksProps} from "../models/LinksProps";

interface ResultProps {
    originalURL: string,
    links: LinksProps
}

const Result: FC<ResultProps> = ({originalURL, links}) => {
    const {fullURL, shortURL, linkID} = links;
    const {hasCopied: hasStatURLCopied, onCopy: onStatURLCopy} = useClipboard(fullURL);
    const {hasCopied: hasShortURLCopied, onCopy: onShortURLCopy} = useClipboard(shortURL);

    return (
        <Flex
            gap={3}
            flexDirection='column'
            w='100%'
            m='30px auto'
            p='20px'
            borderWidth='1px'
            borderRadius='md'
            overflow='hidden'>
            <HStack spacing={2}>
                <Text width='50px'>Short:</Text>
                <Text color='coral'>{shortURL}</Text>
                <IconButton
                    aria-label='Copy link'
                    size='sm'
                    icon={hasShortURLCopied ? <CheckIcon color='green'/> : <CopyIcon/>}
                    onClick={onShortURLCopy}
                />
            </HStack>
            <HStack spacing={2}>
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
            <HStack spacing={2}>
                <Flex>Track&nbsp;
                    <Link as={ReachLink} to={`stat/${linkID}`} color='purple.500' fontWeight='bold'>the total of
                        clicks</Link>
                    &nbsp;in real-time from your shortened URL.</Flex>
            </HStack>
            <HStack spacing={2} mt={3} alignItems='flex-start'>
                <Text fontSize='sm'>Destination:&nbsp;
                    <Link fontSize='sm' color='gray' wordBreak='break-all' overflowWrap='anywhere' href={originalURL}
                          isExternal>{originalURL}</Link>
                </Text>
            </HStack>
        </Flex>
    );
};

export default Result;
