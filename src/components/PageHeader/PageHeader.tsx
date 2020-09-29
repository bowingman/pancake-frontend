import React from 'react'
import styled from 'styled-components'

import Container from '../Container'

interface PageHeaderProps {
  icon: React.ReactNode
  subtitle?: string
  title?: string
}

const PageHeader: React.FC<PageHeaderProps> = ({ icon, subtitle, title }) => {
  return (
    <Container size="sm">
      <StyledPageHeader>
        <StyledIcon>{icon}</StyledIcon>
        <StyledTitle>{title}</StyledTitle>
        <StyledSubtitle>{subtitle}</StyledSubtitle>
      </StyledPageHeader>
    </Container>
  )
}

const StyledPageHeader = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
  padding-top: ${(props) => props.theme.spacing[6]}px;
`

const StyledIcon = styled.div`
  font-size: 180px;
  line-height: 180px;
  text-align: center;
  img {
    width: 100%;
    height: 100%;
  }
`

const StyledTitle = styled.h1`
  font-family: 'monospace', sans-serif;
  line-height: 80px;
  color: ${(props) => props.theme.colors.blue[100]};
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  margin-top: 10px;
  padding: 0;
  @media (max-width: 850px) {
    font-size: 22px;
  }
`

const StyledSubtitle = styled.h3`
  color: ${(props) => props.theme.colors.grey[400]};
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`

export default PageHeader
