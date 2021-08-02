import React from 'react'
import styled from 'styled-components'
import { Button, Heading, Text, Flex, Link, Breadcrumbs } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import PageHeader from 'components/PageHeader'
import PageSection from 'components/PageSection'
import useTheme from 'hooks/useTheme'
import FAQs from './components/FAQs'
import AuctionDetails from './components/AuctionDetailsCard'
import AuctionLeaderboard from './components/AuctionLeaderboard'
import { FORM_ADDRESS } from './helpers'
import { useCurrentFarmAuction } from './hooks/useCurrentFarmAuction'
import AuctionTimer from './components/AuctionTimer'
import ReclaimBidCard from './components/ReclaimBidCard'
import NotWhitelistedNotice from './components/NotWhitelistedNotice'
import CongratulationsCard from './components/CongratulationsCard'

const StyledHeader = styled(PageHeader)`
  max-height: max-content;
  margin-bottom: -40px;
  padding-bottom: 40px;
  overflow: hidden;
  ${({ theme }) => theme.mediaQueries.md} {
    max-height: 600px;
  }
`

const Left = styled(Flex)`
  flex-direction: column;
  flex: 1;
`

const Right = styled(Flex)`
  align-items: center;
  justify-content: center;
  flex: 0.5;
  & img {
    height: 50%;
    width: 50%;
    max-height: 330px;
    margin-top: 24px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & img {
      height: auto;
      width: auto;
    }
  }
`

const AuctionContainer = styled(Flex)`
  width: 100%;
  align-items: flex-start;

  ${({ theme }) => theme.mediaQueries.md} {
    gap: 24px;
  }
`

const FarmAuction = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const { account } = useWeb3React()

  const { currentAuction, bidders, conncetedBidder, refreshBidders } = useCurrentFarmAuction(account)
  const FAQS_BG = 'linear-gradient(180deg, #CBD7EF 0%, #9A9FD0 100%)'

  return (
    <>
      <StyledHeader>
        <Breadcrumbs>
          <Link href="/" color="primary" style={{ fontWeight: 400 }}>
            {t('Home')}
          </Link>
          <Link href="/farms" color="primary" style={{ fontWeight: 400 }}>
            {t('Farms')}
          </Link>
          <Text>{t('Community Farm Auction')}</Text>
        </Breadcrumbs>
        <Flex flexDirection={['column-reverse', null, 'row']}>
          <Left>
            <Heading as="h1" scale="xxl" my="24px">
              {t('Community Farm Auction')}
            </Heading>
            <Text color="textSubtle" mb="24px">
              {t('Each week, qualifying projects can bid CAKE for the right to host a 7-day Farm on PancakeSwap.')}
            </Text>
            <Text color="textSubtle">{t('This page is for projects to bid for farms.')}</Text>
            <Text color="textSubtle" mb="24px">
              {t(
                'If you’re not a whitelisted project, you won’t be able to participate, but you can still view what’s going on!',
              )}
            </Text>
            <Link external href={FORM_ADDRESS}>
              <Button>
                <Text color="white" bold fontSize="16px" mr="4px">
                  {t('Apply for a Farm/Pool')}
                </Text>
              </Button>
            </Link>
          </Left>
          <Right>
            <img src="/images/decorations/auction-bunny.png" alt={t('auction bunny')} />
          </Right>
        </Flex>
      </StyledHeader>
      <>
        <PageSection
          innerProps={{ style: { margin: '0', width: '100%' } }}
          background={theme.colors.background}
          p="24px 0"
          index={2}
          concaveDivider
          dividerPosition="top"
        >
          <NotWhitelistedNotice conncetedBidder={conncetedBidder} auction={currentAuction} />
          <AuctionTimer auction={currentAuction} />
          <AuctionContainer flexDirection={['column', null, null, 'row']}>
            <Flex flex="1" flexDirection="column" width="100%" minWidth="288px">
              <AuctionDetails
                auction={currentAuction}
                conncetedBidder={conncetedBidder}
                refreshBidders={refreshBidders}
              />
              {conncetedBidder?.isWhitelisted && bidders && currentAuction && (
                <CongratulationsCard currentAuction={currentAuction} bidders={bidders} />
              )}
              {conncetedBidder?.isWhitelisted && <ReclaimBidCard />}
            </Flex>
            <AuctionLeaderboard auction={currentAuction} bidders={bidders} />
          </AuctionContainer>
        </PageSection>
        <PageSection p="24px 0" background={FAQS_BG} index={3} hasCurvedDivider={false}>
          <FAQs />
        </PageSection>
      </>
    </>
  )
}

export default FarmAuction
