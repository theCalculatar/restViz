// import React from 'react'

import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Section,
} from '@radix-ui/themes'
import SandBox from '../../components/SandBox'
import RouteDescrption from '../../components/RouteDescrption'
import { Copy } from 'lucide-react'

function Preview() {
  return (
    <Section p={'3'} height={'100%'} width={'100%'} overflow={'auto'}>
      <Container size={{ md: '3', xl: '4', sm: '3', initial: '1' }}>
        <Flex
          direction={{ initial: 'column', sm: 'row', xs: 'column', md: 'row' }}
          width={'100%'}
          gap={'4'}
        >
          <RouteDescrption />
          <SandBox />
        </Flex>
      </Container>
    </Section>
  )
}

export default Preview
