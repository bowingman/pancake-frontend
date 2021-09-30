import React from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { Price } from '@pancakeswap/sdk'
import {
  Button,
  Grid,
  Text,
  Flex,
  Box,
  BinanceIcon,
  useModal,
  Skeleton,
  BunnyPlaceholderIcon,
} from '@pancakeswap/uikit'
import truncateHash from 'utils/truncateHash'
import { formatNumber } from 'utils/formatBalance'
import { ContextApi } from 'contexts/Localization/types'
import { useTranslation } from 'contexts/Localization'
import { useBNBBusdPrice } from 'hooks/useBUSDPrice'
import { multiplyPriceByAmount } from 'utils/prices'
import { NftToken } from 'state/nftMarket/types'
import BuyModal from 'views/Nft/market/components/BuySellModals/BuyModal'
import { useGetProfileAvatar } from 'state/profile/hooks'
import SellModal from 'views/Nft/market/components/BuySellModals/SellModal'
import { ProfileAvatarFetchStatus } from 'state/types'

const Avatar = styled.img`
  margin-right: 12px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
`

const OwnersTableRow = styled(Grid)`
  grid-template-columns: 2fr 2fr 1fr;
  grid-row-gap: 16px;
  margin-top: 16px;
  align-itmes: center;
  & > div {
    padding-bottom: 16px;
    border-bottom: ${({ theme }) => `1px solid ${theme.colors.cardBorder}`};
  }
`

const ButtonContainer = styled(Box)`
  text-align: right;
  padding-right: 24px;
`

interface RowProps {
  t: ContextApi['t']
  nft: NftToken
  bnbBusdPrice: Price
  account: string
}

const Row: React.FC<RowProps> = ({ t, nft, bnbBusdPrice, account }) => {
  const priceInUsd = multiplyPriceByAmount(bnbBusdPrice, parseFloat(nft.marketData.currentAskPrice))

  const ownNft = account ? nft.marketData.currentSeller === account.toLowerCase() : false
  const [onPresentBuyModal] = useModal(<BuyModal nftToBuy={nft} />)
  const [onPresentAdjustPriceModal] = useModal(<SellModal variant="edit" nftToSell={nft} />)
  const {
    username,
    nft: profileNft,
    usernameFetchStatus,
    avatarFetchStatus,
  } = useGetProfileAvatar(nft.marketData.currentSeller)
  const profileName = username || '-'

  let sellerProfilePicComponent = <Skeleton width="32px" height="32px" mr="12px" />
  if (avatarFetchStatus === ProfileAvatarFetchStatus.FETCHED) {
    if (profileNft?.images?.sm) {
      sellerProfilePicComponent = <Avatar src={`/images/nfts/${profileNft?.images?.sm}`} />
    } else {
      sellerProfilePicComponent = <BunnyPlaceholderIcon width="32px" height="32px" mr="12px" />
    }
  }
  return (
    <>
      <Box pl="24px">
        <Flex justifySelf="flex-start" alignItems="center" width="max-content">
          <BinanceIcon width="24px" height="24px" mr="8px" />
          <Text bold>{formatNumber(parseFloat(nft.marketData.currentAskPrice), 0, 3)}</Text>
        </Flex>
        {bnbBusdPrice ? (
          <Text fontSize="12px" color="textSubtle">
            {`(~${formatNumber(priceInUsd, 2, 2)} USD)`}
          </Text>
        ) : (
          <Skeleton width="86px" height="12px" mt="4px" />
        )}
      </Box>
      <Box>
        <Flex width="max-content" alignItems="center">
          {sellerProfilePicComponent}
          <Box display="inline">
            <Text lineHeight="1.25">{truncateHash(nft.marketData.currentSeller)}</Text>
            {usernameFetchStatus !== ProfileAvatarFetchStatus.FETCHED ? (
              <Skeleton />
            ) : (
              <Text lineHeight="1.25">{profileName}</Text>
            )}
          </Box>
        </Flex>
      </Box>
      <ButtonContainer>
        {ownNft ? (
          <Button scale="sm" variant="danger" maxWidth="128px" onClick={onPresentAdjustPriceModal}>
            {t('Edit')}
          </Button>
        ) : (
          <Button scale="sm" variant="secondary" maxWidth="128px" onClick={onPresentBuyModal}>
            {t('Buy')}
          </Button>
        )}
      </ButtonContainer>
    </>
  )
}

interface ForSaleTableRowsProps {
  nftsForSale: NftToken[]
}

const ForSaleTableRow: React.FC<ForSaleTableRowsProps> = ({ nftsForSale }) => {
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const bnbBusdPrice = useBNBBusdPrice()
  return (
    <OwnersTableRow>
      {nftsForSale.map((nft) => (
        <Row key={nft.tokenId} t={t} nft={nft} bnbBusdPrice={bnbBusdPrice} account={account} />
      ))}
    </OwnersTableRow>
  )
}

export default ForSaleTableRow
