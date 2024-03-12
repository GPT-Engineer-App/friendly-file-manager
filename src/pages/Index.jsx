import React, { useState } from "react";
import { ChakraProvider, Box, VStack, Heading, FormControl, FormLabel, Input, Button, useToast } from "@chakra-ui/react";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const toast = useToast();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleAuthAction = async (e) => {
    e.preventDefault();
    const endpoint = isLoggingIn ? "/login" : "/signup";
    const response = await fetch(`https://backengine-2j47.fly.dev${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      if (isLoggingIn) {
        toast({
          title: "Logged in successfully",
          description: `Access Token: ${data.accessToken}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Signed up successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setIsLoggingIn(true); // Switch to login after successful signup
      }
    } else {
      const errorData = await response.json();
      toast({
        title: "An error occurred",
        description: errorData.error,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const toggleAuthMode = () => setIsLoggingIn(!isLoggingIn);

  return (
    <ChakraProvider>
      <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg" margin="auto" mt={16}>
        <VStack spacing={8}>
          <Heading>{isLoggingIn ? "Login" : "Sign Up"}</Heading>
          <form onSubmit={handleAuthAction}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" value={email} onChange={handleEmailChange} />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} onChange={handlePasswordChange} />
            </FormControl>
            <Button width="full" mt={4} type="submit">
              {isLoggingIn ? "Login" : "Sign Up"}
            </Button>
          </form>
          <Button variant="link" onClick={toggleAuthMode}>
            {isLoggingIn ? "Need an account? Sign Up" : "Already have an account? Login"}
          </Button>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Index;
