import { Box, Checkbox, FormControlLabel, Paper } from '@mui/material'
import type { StrategyKey } from '../type/type'

const STRATEGIES: { key: StrategyKey; label: string }[] = [
  { key: 'ethical', label: 'Ethical Investing' },
  { key: 'growth', label: 'Growth Investing' },
  { key: 'index', label: 'Index Investing' },
  { key: 'quality', label: 'Quality Investing' },
  { key: 'value', label: 'Value Investing' },
]

export default function StrategySelector({
  strategies,
  toggleStrategy,
}: {
  strategies: StrategyKey[]
  toggleStrategy: (k: StrategyKey) => void
}) {
  return (
    <Box>
      <Box sx={{ fontWeight: 700, mb: 1 }}>Investment Strategy</Box>

      <Box sx={{ fontSize: 14, color: 'text.secondary', mb: 1 }}>
        Pick 1 or 2 strategies
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 1,
        }}
      >
        {STRATEGIES.map((s) => (
          <Paper key={s.key} variant="outlined" sx={{ px: 2, py: 1 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={strategies.includes(s.key)}
                  onChange={() => toggleStrategy(s.key)}
                  disabled={
                    !strategies.includes(s.key) && strategies.length >= 2
                  }
                />
              }
              label={s.label}
            />
          </Paper>
        ))}
      </Box>
    </Box>
  )
}
