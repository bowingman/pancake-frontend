import React from 'react'
import { Box, CardBody, CardProps, Flex, Text } from '@pancakeswap/uikit'
import minBy from 'lodash/minBy'
import { useTranslation } from 'contexts/Localization'
import { NFT } from 'state/nftMarket/types'
import { useBNBBusdPrice } from 'hooks/useBUSDPrice'
import PreviewImage from './PreviewImage'
import { CostLabel, MetaRow, StyledCollectibleCard } from './styles'

export interface CollectibleCardProps extends CardProps {
  collectionName?: string
  nft: NFT
}

const CollectibleCard: React.FC<CollectibleCardProps> = ({ collectionName, nft, ...props }) => {
  const { t } = useTranslation()
  const { name, image, tokens } = nft
  const bnbBusdPrice = useBNBBusdPrice()

  const lowestPriceToken = minBy(Object.values(tokens), 'currentAskPrice')
  const lowestPriceNum = lowestPriceToken ? parseFloat(lowestPriceToken.currentAskPrice) : 0

  return (
    <StyledCollectibleCard {...props}>
      <CardBody p="8px">
        <PreviewImage src={image.thumbnail} height={320} width={320} mb="8px" />
        <Flex alignItems="center" justifyContent="space-between">
          {collectionName && (
            <Text fontSize="12px" color="textSubtle" mb="8px">
              {collectionName}
            </Text>
          )}
        </Flex>
        <Text as="h4" fontWeight="600" mb="8px">
          {name}
        </Text>
        <Box borderTop="1px solid" borderTopColor="cardBorder" pt="8px">
          {lowestPriceToken && (
            <MetaRow title={t('Lowest price')}>
              <CostLabel cost={lowestPriceNum} bnbBusdPrice={bnbBusdPrice} />
            </MetaRow>
          )}
        </Box>
      </CardBody>
    </StyledCollectibleCard>
  )
}

export default CollectibleCard
