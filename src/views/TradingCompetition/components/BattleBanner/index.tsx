import { Flex, Text, Heading } from '@pancakeswap/uikit'
import Image from 'next/image'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import AllBunniesImage from '../../pngs/MoD-hero-bunnies.png'
import { Heading1Text, Heading2Text } from '../CompetitionHeadingText'
import { MoDLogo } from '../../svgs'
import meshImg from '../../pngs/mod-mesh.png'
import textBgLightImg from '../../pngs/mod-text-light.png'
import bgShineImg from '../../pngs/MoD-bg-shine.png'

const TextStyles = (theme) => `
  text-align: center;
  ${theme.mediaQueries.md} {
    text-align: left;
  }
`

const Mesh = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 242px;
  background-image: url('${meshImg.src}');
  z-index: -1;
`
const TextBgLight = styled.div`
  position: absolute;
  top: -25px;
  left: -150px;
  width: 599px;
  height: 184px;
  background-image: url('${textBgLightImg.src}');
  z-index: -1;
`
const BgShine = styled.div`
  position: absolute;
  bottom: 50px;
  left: 10%;
  width: 1257px;
  height: 205px;
  background-image: url('${bgShineImg.src}');
  background-size: cover;
  z-index: 0;
`

const StarImage = styled.div`
  display: none;
  position: absolute;
  z-index: -1;
  bottom: 0;
  background-size: 150%;
  background-position: top center;
  background-repeat: no-repeat;
  background-image: url('/images/competition/banner-star.png');
  opacity: 0.4;
  ${({ theme }) => theme.mediaQueries.md} {
    display: block;
    height: 70%;
    width: 50%;
    right: 0px;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    width: 40%;
    height: 80%;
    right: 25px;
  }
  @media screen and (min-width: 1440px) {
    height: 100%;
    right: 12%;
  }
  @media screen and (min-width: 1680px) {
    right: 20%;
  }
`

const ImageWrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 75%;
  margin: 0 auto;
  ${({ theme }) => theme.mediaQueries.md} {
    position: absolute;
    width: auto;
    bottom: -5%;
    z-index: 1;
    right: 10px;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    right: 25px;
  }
  @media screen and (min-width: 1440px) {
    right: 15%;
  }
  @media screen and (min-width: 1680px) {
    right: 23%;
  }
`

const StyledText = styled(Text)`
  ${({ theme }) => TextStyles(theme)}
`

const StyledHeading1Wrapper = styled(Heading1Text)`
  width: 100%;
  position: relative;
  white-space: normal;
  ${({ theme }) => TextStyles(theme)}

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 780px;
  }
`
const StyledHeading1Text = styled.div`
  position: relative;
  top: -10px;
  font-family: 'Kanit';
  font-style: normal;
  font-weight: 700;
  font-size: 46px;
  line-height: 110%;
  /* identical to box height, or 51px */

  display: flex;
  align-items: center;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-feature-settings: 'liga' off;
  color: #ffffff;
  text-shadow: 0px 5px 0px #13101d;
`

const StyledHeading2Text = styled(Heading2Text)`
  width: 100%;
  white-space: initial;
  /* -webkit-text-stroke-width: 1.2px;
  -webkit-text-stroke-color: #462091; */
  text-shadow: 0px 0px 10px rgba(0, 255, 209, 0.22), 0px 0px 8px rgba(0, 56, 255, 0.25),
    0px 0px 18px rgba(0, 255, 71, 0.52);
  ${({ theme }) => TextStyles(theme)};

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 410px;
  }
`

const StyledHeading = styled(Heading)`
  ${({ theme }) => TextStyles(theme)}
  text-shadow: 0px 0px 8px rgba(255, 255, 255, 0.25), 0px 0px 18px rgba(161, 101, 194, 0.88), 0px 0px 49px rgba(161, 0, 255, 0.55);
`

const BattleBanner = () => {
  const {
    t,
    currentLanguage: { locale },
  } = useTranslation()
  const { theme } = useTheme()

  return (
    <Flex flexDirection="column">
      <Mesh />
      <BgShine />
      <StarImage />
      <ImageWrapper>
        <Image src={AllBunniesImage} alt="all the bunnies" width={523} height={395} />
      </ImageWrapper>
      <StyledText
        mb="16px"
        color="#FFD585"
        bold
        style={{
          textShadow:
            '0px 0px 10px rgba(255, 175, 0, 0.22), 0px 0px 8px rgba(255, 61, 0, 0.25), 0px 0px 18px rgba(255, 135, 0, 0.55)',
        }}
      >
        {new Date(2022, 4).toLocaleString(locale, {
          month: 'short',
        })}{' '}
        17-24, 2022
      </StyledText>

      <StyledHeading1Wrapper>
        <MoDLogo />
        <StyledHeading1Text>{t('Trading Competition')}</StyledHeading1Text>
        <TextBgLight />
      </StyledHeading1Wrapper>
      <StyledHeading2Text background="#BDF9DA" $fill>
        {t('$120,000 in Prizes with Tokens and NFTs!')}
      </StyledHeading2Text>
      <StyledHeading scale="md" color={theme.isDark ? 'card' : 'inputSecondary'} mt="16px">
        {t('Compete with other teams for the highest trading volume!')}
      </StyledHeading>
      <Flex height="100px" />
    </Flex>
  )
}

export default BattleBanner
