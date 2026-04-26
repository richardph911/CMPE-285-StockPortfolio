import { Box, Paper } from '@mui/material'
import type { PortfolioResult } from '../type/type'

type Props = {
  result: PortfolioResult
}

export default function SummaryCards({ result }: Props) {
  const gainLoss = result.total_current_value - result.investment
  const gainLossPct = ((gainLoss / result.investment) * 100).toFixed(2)

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
          ${result.investment.toLocaleString()}
        </Box>
      </Paper>

      <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
        <Box sx={{ color: 'text.secondary' }}>Current Value</Box>
        <Box sx={{ fontSize: 20, fontWeight: 700 }}>
          ${result.total_current_value.toLocaleString()}
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
          {gainLoss >= 0 ? '+' : ''}${gainLoss.toFixed(2)} ({gainLossPct}%)
        </Box>
      </Paper>
    </Box>
  )
}
