import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Box, Flex, Text } from '@pancakeswap/uikit'
import { useAppDispatch } from 'state'
import { fetchCollection } from 'state/nftMarket/reducer'
import { useGetCollection } from 'state/nftMarket/hooks'
import { useTranslation } from 'contexts/Localization'
import Select, { OptionProps } from 'components/Select/Select'
import Page from 'components/Layout/Page'
import CollectionNfts from './CollectionNfts'
import Header from '../Header'

const Items = () => {
  const { collectionAddress } = useParams<{ collectionAddress: string }>()
  const [sortBy, setSortBy] = useState('updatedAt')
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const collection = useGetCollection(collectionAddress)
  const { address } = collection || {}

  const sortByItems = [
    { label: t('Recently listed'), value: 'updatedAt' },
    { label: t('Lowest price'), value: 'currentAskPrice' },
  ]

  const handleChange = (newOption: OptionProps) => {
    setSortBy(newOption.value)
  }

  useEffect(() => {
    if (address) {
      dispatch(fetchCollection(address))
    }
  }, [address, dispatch])

  return (
    <>
      <Header collection={collection} />
      <Page>
        <Flex alignItems="center" justifyContent={['flex-start', null, null, 'flex-end']} mb="24px">
          <Box minWidth="165px">
            <Text fontSize="12px" textTransform="uppercase" color="textSubtle" fontWeight={600} mb="4px">
              {t('Sort By')}
            </Text>
            <Select options={sortByItems} onOptionChange={handleChange} />
          </Box>
        </Flex>
        <CollectionNfts collection={collection} sortBy={sortBy} />
      </Page>
    </>
  )
}

export default Items
