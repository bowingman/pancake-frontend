import React from 'react'
import { Table, Th, Td, Card, ProfileAvatar, Flex, BnbUsdtPairTokenIcon, Heading } from '@pancakeswap/uikit'
import { Link } from 'react-router-dom'
import { useGetCollections } from 'state/nftMarket/hooks'
import { useTranslation } from 'contexts/Localization'
import Page from 'components/Layout/Page'
import PageHeader from 'components/PageHeader'
import { nftsBaseUrl } from 'views/Nft/market/constants'

const Collectible = () => {
  const { t } = useTranslation()
  const collections = useGetCollections()

  return (
    <>
      <PageHeader>
        <Heading as="h1" scale="xxl" color="secondary">
          {t('Collections')}
        </Heading>
      </PageHeader>
      <Page>
        <Card>
          <Table>
            <thead>
              <tr>
                <Th textAlign="left">{t('Collection')}</Th>
                <Th textAlign="left">{t('Volume')}</Th>
                <Th textAlign="left">{t('Items')}</Th>
                <Th textAlign="left">{t('Supply')}</Th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(collections).map((key) => {
                const collection = collections[key]
                const volume = collection.totalVolumeBNB
                  ? parseFloat(collection.totalVolumeBNB).toLocaleString(undefined, {
                      minimumFractionDigits: 3,
                      maximumFractionDigits: 3,
                    })
                  : '0'
                return (
                  <tr>
                    <Td>
                      <Link to={`${nftsBaseUrl}/collections/${collection.address}`}>
                        <Flex alignItems="center">
                          <ProfileAvatar src={collection.avatar} width={48} height={48} mr="16px" />
                          {collection.name}
                        </Flex>
                      </Link>
                    </Td>
                    <Td>
                      <Flex alignItems="center">
                        {volume}
                        <BnbUsdtPairTokenIcon ml="8px" />
                      </Flex>
                    </Td>
                    <Td>{collection.numberTokensListed}</Td>
                    <Td>{collection.totalSupply}</Td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Card>
      </Page>
    </>
  )
}

export default Collectible
