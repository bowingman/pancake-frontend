import { Skeleton, Text, Flex, Button, CalculateIcon, useModal, useMatchBreakpoints } from '@pancakeswap/uikit'
import styled from 'styled-components'
import Balance from 'components/Balance'
import { FlexGap } from 'components/Layout/Flex'
import { useTranslation } from 'contexts/Localization'
import { useVaultApy } from 'hooks/useVaultApy'
import { useVaultMaxDuration } from 'hooks/useVaultMaxDuration'
import { useVaultPoolByKey } from 'state/pools/hooks'
import { DeserializedPool } from 'state/types'
import { getVaultPosition, VaultPosition } from 'utils/cakePool'
import { VaultRoiCalculatorModal } from '../../Vault/VaultRoiCalculatorModal'
import BaseCell, { CellContent } from './BaseCell'

const AprLabelContainer = styled(Flex)`
  &:hover {
    opacity: 0.5;
  }
`

interface AprCellProps {
  pool: DeserializedPool
}

const AutoAprCell: React.FC<AprCellProps> = ({ pool }) => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()

  const { userData } = useVaultPoolByKey(pool.vaultKey)

  const maxLockDuration = useVaultMaxDuration()
  const vaultPosition = getVaultPosition(userData)

  const { flexibleApy, lockedApy } = useVaultApy({
    duration:
      vaultPosition > VaultPosition.Flexible
        ? +userData.lockEndTime - +userData.lockStartTime
        : maxLockDuration?.toNumber(),
  })

  const [onPresentFlexibleApyModal] = useModal(<VaultRoiCalculatorModal pool={pool} />)
  const [onPresentLockedApyModal] = useModal(<VaultRoiCalculatorModal pool={pool} initialView={1} />)

  if (vaultPosition === VaultPosition.None) {
    return (
      <>
        <BaseCell role="cell" flex={['1 0 50px', '4.5', '1 0 120px', null, '2 0 100px']}>
          <CellContent>
            <Text fontSize="12px" color="textSubtle" textAlign="left">
              {t('Flexible APY')}
            </Text>
            {flexibleApy ? (
              <AprLabelContainer alignItems="center" justifyContent="flex-start">
                <Balance
                  fontSize={['14px', '14px', '16px']}
                  value={parseFloat(flexibleApy)}
                  decimals={2}
                  unit="%"
                  fontWeight={[600, 400]}
                />
                {!isMobile && (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      onPresentFlexibleApyModal()
                    }}
                    variant="text"
                    width="20px"
                    height="20px"
                    padding="0px"
                    marginLeft="4px"
                  >
                    <CalculateIcon color="textSubtle" width="20px" />
                  </Button>
                )}
              </AprLabelContainer>
            ) : (
              <Skeleton width="80px" height="16px" />
            )}
          </CellContent>
        </BaseCell>
        <BaseCell role="cell" flex={['1 0 50px', '1 0 50px', '2 0 100px', null, '1 0 120px']}>
          <CellContent>
            <Text fontSize="12px" color="textSubtle" textAlign="left">
              {t('Locked APY')}
            </Text>
            {lockedApy && maxLockDuration ? (
              <AprLabelContainer alignItems="center" justifyContent="flex-start">
                <FlexGap gap="4px" flexWrap="wrap">
                  <Text fontSize={['14px', '14px', '16px']} style={{ whiteSpace: 'nowrap' }} fontWeight={[500, 400]}>
                    {maxLockDuration.gt(0) ? t('Up to') : '-'}
                  </Text>
                  {maxLockDuration.gt(0) && (
                    <>
                      <Balance
                        fontSize={['14px', '14px', '16px']}
                        value={parseFloat(lockedApy)}
                        decimals={2}
                        unit="%"
                        fontWeight={[600, 400]}
                      />
                      {!isMobile && (
                        <Button
                          onClick={(e) => {
                            e.stopPropagation()
                            onPresentLockedApyModal()
                          }}
                          variant="text"
                          width="20px"
                          height="20px"
                          padding="0px"
                          marginLeft="4px"
                        >
                          <CalculateIcon color="textSubtle" width="20px" />
                        </Button>
                      )}
                    </>
                  )}
                </FlexGap>
              </AprLabelContainer>
            ) : (
              <Skeleton width="80px" height="16px" />
            )}
          </CellContent>
        </BaseCell>
      </>
    )
  }

  return (
    <BaseCell role="cell" flex={['1 0 50px', '1 0 50px', '2 0 100px', '2 0 100px', '1 0 120px']}>
      <CellContent>
        <Text fontSize="12px" color="textSubtle" textAlign="left">
          {t('APY')}
        </Text>
        {flexibleApy ? (
          <AprLabelContainer alignItems="center" justifyContent="flex-start">
            <Balance
              fontSize="16px"
              value={vaultPosition > VaultPosition.Flexible ? parseFloat(lockedApy) : parseFloat(flexibleApy)}
              decimals={2}
              unit="%"
            />
            <Button
              onClick={(e) => {
                e.stopPropagation()
                return vaultPosition > VaultPosition.Flexible ? onPresentLockedApyModal() : onPresentFlexibleApyModal()
              }}
              variant="text"
              width="20px"
              height="20px"
              padding="0px"
              marginLeft="4px"
            >
              <CalculateIcon color="textSubtle" width="20px" />
            </Button>
          </AprLabelContainer>
        ) : (
          <Skeleton width="80px" height="16px" />
        )}
      </CellContent>
    </BaseCell>
  )
}

export default AutoAprCell
