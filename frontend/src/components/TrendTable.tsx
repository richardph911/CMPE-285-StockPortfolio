import { useState } from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import type { PortfolioResult } from '../type/type'

type Props = {
  result: PortfolioResult
}

type ChangeMode = 'dollar' | 'percent'

function formatChange(diff: number, prev: number | null, mode: ChangeMode) {
  if (mode === 'dollar') {
    return diff >= 0 ? `+$${diff.toFixed(2)}` : `-$${Math.abs(diff).toFixed(2)}`
  }

  const percent = prev ? (diff / prev) * 100 : 0

  return percent >= 0 ? `+${percent.toFixed(2)}%` : `${percent.toFixed(2)}%`
}

export default function TrendTable({ result }: Props) {
  const [mode, setMode] = useState<ChangeMode>('dollar')

  if (result.trend_values.length === 0) return null

  return (
    <>
      <Box
        component="h3"
        sx={{
          fontSize: 22,
          fontWeight: 700,
          textAlign: 'center',
          mt: 4,
          mb: 2,
        }}
      >
        5-Day Portfolio Trend
      </Box>

      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Day</TableCell>
              <TableCell>Portfolio Value</TableCell>

              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  Change
                  <ButtonGroup size="small" variant="outlined">
                    <Button
                      variant={mode === 'dollar' ? 'contained' : 'outlined'}
                      onClick={() => setMode('dollar')}
                    >
                      $
                    </Button>

                    <Button
                      variant={mode === 'percent' ? 'contained' : 'outlined'}
                      onClick={() => setMode('percent')}
                    >
                      %
                    </Button>
                  </ButtonGroup>
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {result.trend_values.map((val, i) => {
              const prev = i > 0 ? result.trend_values[i - 1] : null
              const diff = prev !== null ? val - prev : null

              return (
                <TableRow key={i}>
                  <TableCell>
                    {result.trend_labels[i] ?? `Day ${i + 1}`}
                  </TableCell>

                  <TableCell>${val.toLocaleString()}</TableCell>

                  <TableCell>
                    {diff === null ? (
                      '—'
                    ) : (
                      <Box
                        component="span"
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 0.75,
                          color: diff >= 0 ? 'success.main' : 'error.main',
                          fontWeight: 700,
                        }}
                      >
                        <Box
                          component="span"
                          sx={{ fontSize: 18, lineHeight: 1 }}
                        >
                          {diff >= 0 ? '▲' : '▼'}
                        </Box>

                        {formatChange(diff, prev, mode)}
                      </Box>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
