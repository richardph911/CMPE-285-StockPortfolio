import { Alert, Box, Button, CircularProgress, TextField } from '@mui/material'
import StrategySelector from './StrategySelector'
import type { StrategyKey } from '../type/type'

type Props = {
  amount: number
  setAmount: (v: number) => void
  strategies: StrategyKey[]
  toggleStrategy: (k: StrategyKey) => void
  loading: boolean
  error: string
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export default function PortfolioForm({
  amount,
  setAmount,
  strategies,
  toggleStrategy,
  loading,
  error,
  onSubmit,
}: Props) {
  return (
    <Box component="form" onSubmit={onSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Investment Amount (USD)"
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          slotProps={{
            input: {
              inputProps: { min: 5000, step: 500 },
            },
          }}
          helperText="Minimum $5,000"
          fullWidth
        />

        <StrategySelector
          strategies={strategies}
          toggleStrategy={toggleStrategy}
        />

        {error && <Alert severity="error">{error}</Alert>}

        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={20} /> : 'Generate Portfolio'}
        </Button>
      </Box>
    </Box>
  )
}
