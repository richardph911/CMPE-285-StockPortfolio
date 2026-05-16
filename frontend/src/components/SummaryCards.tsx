import { Box, Paper } from '@mui/material'
import type { PortfolioResult } from '../type/type'

type Props = {
  result: PortfolioResult
}

function formatMoney(value: number) {
  return `$${value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

export default function SummaryCards({ result }: Props) {
  const latestValue =
    result.trend_values.length > 0
      ? result.trend_values[result.trend_values.length - 1]
      : result.total_current_value

  const gainLoss = latestValue - result.investment
  const gainLossPct = ((gainLoss / result.investment) * 100).toFixed(4)

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: '1fr 1fr 1fr',
        },
        gap: 2,
        mb: 4,
      }}
    >
      <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
        <Box sx={{ color: 'text.secondary' }}>Amount Invested</Box>
        <Box sx={{ fontSize: 20, fontWeight: 700 }}>
          {formatMoney(result.investment)}
        </Box>
      </Paper>

      <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
        <Box sx={{ color: 'text.secondary' }}>Current Value</Box>
        <Box sx={{ fontSize: 20, fontWeight: 700 }}>
          {formatMoney(latestValue)}{' '}
        </Box>
      </Paper>

      <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
        <Box sx={{ color: 'text.secondary' }}>Gain / Loss</Box>
        <Box
          sx={{
            fontSize: 20,
            fontWeight: 700,
            color: gainLoss >= 0 ? 'success.main' : 'error.main',
          }}
        >
          {gainLoss >= 0 ? '+' : '-'}
          {formatMoney(Math.abs(gainLoss))} ({gainLossPct}%)
        </Box>
      </Paper>
    </Box>
  )
}
