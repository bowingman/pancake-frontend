import React, { useCallback } from 'react'
import styled from 'styled-components'
import { Card, CardBody } from '@pancakeswap-libs/uikit'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalClaim } from 'hooks/useTickets'
import useLastUpdated from 'hooks/useLastUpdated'
import PrizesWonContent from './PrizesWonContent'
import NoPrizesContent from './NoPrizesContent'

const StyledCard = styled(Card)`
  margin-top: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: 32px;
  }

  ${(props) =>
    props.isDisabled
      ? `
        background-color: unset;
        box-shadow: unset;
        border: 1px solid ${props.theme.colors.textDisabled};
        `
      : ``}
`

const YourPrizesCard: React.FC = () => {
  const { claimAmount } = useTotalClaim()
  const { setLastUpdated } = useLastUpdated()

  const winnings = getBalanceNumber(claimAmount)
  const isAWin = winnings > 0

  const handleSuccess = useCallback(() => {
    setLastUpdated()
  }, [setLastUpdated])

  return (
    <StyledCard isDisabled={!isAWin} isActive={isAWin}>
      <CardBody>{isAWin ? <PrizesWonContent onSuccess={handleSuccess} /> : <NoPrizesContent />}</CardBody>
    </StyledCard>
  )
}

export default YourPrizesCard
