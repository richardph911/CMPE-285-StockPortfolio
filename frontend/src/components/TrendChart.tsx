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

export default function TrendChart({ result }: Props) {
  const values = result.trend_values

  if (values.length === 0) return null

  const width = 700
  const height = 320
  const padding = 50

  // Raw data range
  const rawMin = Math.min(...values, result.investment)
  const rawMax = Math.max(...values, result.investment)
  const rawRange = rawMax - rawMin || 1

  // Add vertical breathing room
  const min = rawMin - rawRange * 0.25
  const max = rawMax + rawRange * 0.25
  const range = max - min

  const getY = (value: number) =>
    height - padding - ((value - min) / range) * (height - padding * 2)

  const investmentY = getY(result.investment)

  const points = values.map((value, index) => {
    const x =
      padding + (index / Math.max(values.length - 1, 1)) * (width - padding * 2)

    const y = getY(value)

    return {
      x,
      y,
      value,
      label: result.trend_labels[index] ?? `Day ${index + 1}`,
    }
  })

  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ')

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 4,
      }}
    >
      <Box
        sx={{
          fontSize: 24,
          fontWeight: 700,
          textAlign: 'center',
          mb: 3,
        }}
      >
        Portfolio Value Chart
      </Box>

      <Box sx={{ width: '100%', overflowX: 'auto' }}>
        <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="340">
          {/* Y Axis */}
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={height - padding}
            stroke="#ccc"
            strokeWidth="1"
          />

          {/* X Axis */}
          <line
            x1={padding}
            y1={height - padding}
            x2={width - padding}
            y2={height - padding}
            stroke="#ccc"
            strokeWidth="1"
          />

          {/* Investment baseline */}
          <line
            x1={padding}
            y1={investmentY}
            x2={width - padding}
            y2={investmentY}
            stroke="#999"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />

          {/* Investment label */}
          <text
            x={width - padding}
            y={investmentY - 10}
            textAnchor="end"
            fontSize="12"
            fontWeight="600"
            fill="currentColor"
          ></text>

          {/* Trend line */}
          <path
            d={linePath}
            fill="none"
            stroke="#1976d2"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {points.map((p) => (
            <g key={p.label}>
              {/* Point */}
              <circle cx={p.x} cy={p.y} r="8" fill="#1976d2" />

              {/* Value label */}
              <text
                x={p.x + 13}
                y={p.y + 30}
                textAnchor="middle"
                fontSize="14"
                fontWeight="600"
                fill="currentColor"
              >
                {formatMoney(p.value)}
              </text>

              {/* Date label */}
              <text
                x={p.x}
                y={height - 18}
                textAnchor="middle"
                fontSize="13"
                fill="currentColor"
              >
                {p.label}
              </text>
            </g>
          ))}
        </svg>
      </Box>
    </Paper>
  )
}
