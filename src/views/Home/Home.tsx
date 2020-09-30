import React from 'react'
import styled from 'styled-components'
import Button from '../../components/Button'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Balances from './components/Balances'

const Home: React.FC = () => {
  return (
    <Page>
      <Image src={require(`../../assets/img/BG1.png`)}/>
      <Blank/>
      <Container>
        <Balances />
      </Container>
      <Spacer size="lg" />
      <div
        style={{
          margin: '0 auto',
        }}
      >
        <Button text="👩‍🍳 See the Kitchen" to="/farms" variant="secondary" />
      </div>
    </Page>
  )
}

const Image = styled.img`
  position: absolute;
  z-index: -3;
  top: 10%;
  @media (max-width: 500px) {
    width: 100vw;
  }
`

const Blank = styled.div`
  height: 200px;
  @media (max-width: 500px) {
    height: 60px;
  }
`


const StyledInfo = styled.h3`
  color: ${(props) => props.theme.colors.primary};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;

  > b {
    color: ${(props) => props.theme.colors.primary};
  }
`

export default Home
