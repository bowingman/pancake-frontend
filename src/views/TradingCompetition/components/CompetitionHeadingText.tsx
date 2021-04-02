import { Heading } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'

const H1SizeStyles = (theme) => `
  font-size: 48px;
  line-height: 110%;
  white-space: nowrap;

  ${theme.mediaQueries.sm} {
    font-size: 64px;
  }
`

const H2SizeStyles = (theme) => `
  font-size: 32px;
  line-height: 110%;
  white-space: nowrap;

  ${theme.mediaQueries.sm} {
    font-size: 40px
  }
`

const sharedStyles = (props) => `
  color: ${props.textColor ? props.textColor : '#ffffff'};
  background:  ${props.background ? props.background : 'linear-gradient(#7645d9 0%, #452a7a 100%)'};
  background-clip: text;
  -webkit-background-clip: text;
  ${
    props.fill
      ? `-webkit-text-fill-color: transparent;`
      : `-webkit-text-stroke: 4px transparent;
       text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);`
  }
`

const sharedVisiblyHiddenStyles = `
  visibility: hidden;
  height: 0px;
`

interface HeadingProps {
  textColor?: string
  background?: string
  fill?: boolean
}

export const Heading1Text = styled(Heading)<HeadingProps>`
  ${({ theme }) => H1SizeStyles(theme)}
  ${(props) => sharedStyles(props)}
`

export const Heading2Text = styled(Heading)<HeadingProps>`
  ${({ theme }) => H2SizeStyles(theme)}
  ${(props) => sharedStyles(props)}
`

export const VisuallyHiddenHeading1Text = styled(Heading)`
  ${({ theme }) => H1SizeStyles(theme)}
  ${sharedVisiblyHiddenStyles}
`

export const VisuallyHiddenHeading2Text = styled(Heading)`
  ${({ theme }) => H2SizeStyles(theme)}
  ${sharedVisiblyHiddenStyles}
`

export default Heading1Text
