import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link as LinkNav, useNavigate } from 'react-router-dom';
import { logout } from '@/redux/action/authSlice';
import { AuthenticationService } from '@/service/AuthService';
import { useProfile } from '@/hooks/useProfile';

export default function Dashboard() {
  const { colorMode, toggleColorMode } = useColorMode();

  const logout = () => AuthenticationService.Logout();
  const { data } = useProfile();

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <>
      <Box>
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <Box>Logo</Box>
            <Flex alignItems={'center'}>
              <Stack direction={'row'} spacing={7}>
                <Button onClick={toggleColorMode}>
                  {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                </Button>
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minW={0}
                  >
                    <Avatar
                      size={'sm'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </MenuButton>
                  <MenuList alignItems={'center'}>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              </Stack>
            </Flex>
          </Flex>
        </Box>
        {data && (
          <Box px={4}>
            Hello,
            <b> {data?.data.data.name}</b> you are login
          </Box>
        )}
      </Box>
    </>
  );
}
