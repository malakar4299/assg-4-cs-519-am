
import {
    ChakraProvider,
    Box,
    Text,
    Link,
    VStack,
    Code,
    Grid,
    theme,
  } from "@chakra-ui/react"
import { Fragment } from "react"

import { ColorModeSwitcher } from "../../ColorModeSwitcher"
import { Logo } from "../../Logo"
const Main = () => {
    return ( 
        <Fragment>
            <Box textAlign="center" fontSize="xl">
            
            <Grid minH="100vh" p={3}>
                <ColorModeSwitcher justifySelf="flex-end" />
                <VStack spacing={8}>
                <Logo h="40vmin" pointerEvents="none" />
                <Text>
                    Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.
                </Text>
                <Link
                    color="teal.500"
                    href="https://chakra-ui.com"
                    fontSize="2xl"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn Chakra
                </Link>
                </VStack>
            </Grid>
            
        </Box>
      </Fragment>
     );
}
 
export default Main;