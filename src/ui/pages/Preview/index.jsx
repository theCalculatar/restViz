// import React from 'react'

import { Container, Flex, Section } from '@radix-ui/themes'
import SandBox from '../../components/SandBox'
import RouteDescrption from '../../components/RouteDescrption'
import { useContext, useEffect } from 'preact/hooks'
import { AppContext } from '../../context'
import { useLocation, useNavigate } from 'react-router-dom'
import { act_setCurrentRoute } from '../../context/actions'

function Preview() {
  const { routes, activeRoute, setCurrentRoute } = useContext(AppContext)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (routes.length > 0) {
      const route = routes.find((r) => r.path == pathname.replace('/test', ''))
      if (route) {
        setCurrentRoute({ type: act_setCurrentRoute, payload: route })
      } else {
        navigate('/404')
      }
    }
  }, [pathname])

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
