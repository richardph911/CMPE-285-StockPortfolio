import { Box, Card, CardContent, Chip } from '@mui/material'
import type { PortfolioResult } from '../type/type'
import SummaryCards from './SummaryCards'
import HoldingsTable from './HoldingsTable'
import TrendTable from './TrendTable'

export default function PortfolioResultView({
  result,
}: {
  result: PortfolioResult
}) {
  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <Box sx={{ fontSize: 26, fontWeight: 700, mb: 2 }}>
          Portfolio Result
        </Box>

        <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
          {result.selected_strategy_labels.map((label) => (
            <Chip
              key={label}
              label={label}
              color="primary"
              variant="filled"
              sx={{
                fontWeight: 600,
                px: 1,
              }}
            />
          ))}
        </Box>

        <SummaryCards result={result} />

        <HoldingsTable result={result} />

        <TrendTable result={result} />
      </CardContent>
    </Card>
  )
}
