import { Container, Flex, Text } from '@chakra-ui/react';
import SidebarWithHeader from '../../components/sidebar/sidebar';

export function Settings() {
  return (
    <SidebarWithHeader>
      <Container maxW="container.lg">
        <Flex>
          <Text fontSize="3xl" as="b" mb="5">
            Settings
          </Text>
        </Flex>
      </Container>
    </SidebarWithHeader>
  );
}

export default Settings;
