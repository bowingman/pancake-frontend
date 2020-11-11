import React from 'react'
import { useTotalClaim } from 'hooks/useTickets'
import { getBalanceNumber } from 'utils/formatBalance'
import CardValue from 'components/Card/CardValue'

const CakeWinnings = () => {
  const { claimAmount } = useTotalClaim()
  return <CardValue value={getBalanceNumber(claimAmount)} />
}

export default CakeWinnings
