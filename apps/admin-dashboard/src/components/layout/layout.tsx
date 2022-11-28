import {
  Avatar,
  Box,
  BoxProps,
  Button,
  CloseButton,
  Container,
  Divider,
  Drawer,
  DrawerContent,
  Flex,
  FlexProps,
  HStack,
  Icon,
  IconButton,
  Link,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { IconType } from 'react-icons';
import { CgDarkMode } from 'react-icons/cg';
import { FaCity } from 'react-icons/fa';
import { FiLogOut, FiMenu, FiSettings } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { auth, logout } from '../../app/firebase';

interface LinkItemProps {
  name: string;
  path: string;
  icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Cities', path: '/dashboard/cities', icon: FaCity },
  { name: 'Settings', path: '/dashboard/settings', icon: FiSettings },
];

interface LayoutProps {
  children: React.ReactNode;
}

function Layout(props: LayoutProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} py="4">
        <Container maxW="container.lg" px={{ base: 0, md: 4 }}>
          {props.children}
        </Container>
      </Box>
    </Box>
  );
}

export default Layout;

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  const navigateToLink = React.useCallback(
    (link: string) => {
      onClose();
      navigate(link);
    },
    [navigate, onClose]
  );

  const colorModeText = useColorModeValue('Dark', 'Light');

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Event App
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((item) => (
        <NavItem
          key={item.name}
          icon={item.icon}
          onClick={navigateToLink.bind(null, item.path)}
        >
          {item.name}
        </NavItem>
      ))}
      <Divider marginY="1" />

      <Flex
        align="center"
        p="4"
        mx="4"
        cursor="pointer"
        onClick={toggleColorMode}
        {...rest}
      >
        <Icon mr="4" fontSize="16" as={CgDarkMode} />
        {colorModeText} Mode
      </Flex>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactNode;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  const iconColor = useColorModeValue('black', 'white');
  return (
    <Link style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{ bg: 'blackAlpha.100', color: iconColor }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{ color: iconColor }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const [user] = useAuthState(auth);

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Event App
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <Flex alignItems={'center'}>
          {user && (
            <HStack>
              <Avatar size={'sm'} src={user.photoURL || ''} />
              <VStack
                display={{ base: 'none', md: 'flex' }}
                alignItems="flex-start"
                spacing="1px"
                ml="2"
              >
                <Text fontSize="sm">{user.displayName}</Text>
                <Text fontSize="xs" color="gray.600">
                  Admin
                </Text>
              </VStack>
              <Button padding={3} variant="ghost" onClick={logout}>
                <FiLogOut />
              </Button>
            </HStack>
          )}
        </Flex>
      </HStack>
    </Flex>
  );
};
