import {
  Box,
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

export default function HoldingsTable({ result }: Props) {
  return (
    <>
      <Box component="h3" sx={{ fontSize: 20, fontWeight: 700, mb: 2 }}>
        Holdings
      </Box>

      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ticker</TableCell>
              <TableCell>Allocation</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Shares</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {result.portfolio.map((h) => (
              <TableRow key={h.ticker}>
                <TableCell>
                  <strong>{h.ticker}</strong>
                </TableCell>
                <TableCell>${h.allocation.toLocaleString()}</TableCell>
                <TableCell>${h.current_price.toFixed(2)}</TableCell>
                <TableCell>{h.shares.toFixed(4)}</TableCell>
                <TableCell>${h.current_value.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
