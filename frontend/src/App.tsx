import { useMemo, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from '@mui/material'
import PortfolioForm from './components/PortfolioForm'
import PortfolioResultView from './components/PortfolioResult'
import type { StrategyKey, PortfolioResult } from './type/type'

export default function App() {
  const [amount, setAmount] = useState(10000)
  const [strategies, setStrategies] = useState<StrategyKey[]>([])
  const [result, setResult] = useState<PortfolioResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark',
  )

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode],
  )

  function toggleTheme() {
    const nextMode = !darkMode
    setDarkMode(nextMode)
    localStorage.setItem('theme', nextMode ? 'dark' : 'light')
  }

  function toggleStrategy(key: StrategyKey) {
    if (strategies.includes(key)) {
      setStrategies(strategies.filter((s) => s !== key))
    } else if (strategies.length < 2) {
      setStrategies([...strategies, key])
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)

    if (amount < 5000) {
      setError('Minimum investment is $5,000')
      setLoading(false)
      return
    }

    if (strategies.length === 0) {
      setError('Please select at least one strategy')
      setLoading(false)
      return
    }

    try {
      const BASE = import.meta.env.VITE_API_URL ?? ''

      const res = await fetch(`${BASE}/api/portfolio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, strategies }),
      })

      const text = await res.text()

      let data
      try {
        data = text ? JSON.parse(text) : null
      } catch {
        throw new Error(text || 'Server returned invalid JSON')
      }

      if (!res.ok) {
        throw new Error(data?.error || 'Server error')
      }

      if (!data) {
        throw new Error('Server returned empty response')
      }

      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
          color: 'text.primary',
          py: 6,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button variant="outlined" onClick={toggleTheme}>
              {darkMode ? '☀ Light' : '☾ Dark'}
            </Button>
          </Box>

          <Card sx={{ borderRadius: 4 }}>
            <CardContent sx={{ p: { xs: 3, md: 5 } }}>
              <PortfolioForm
                amount={amount}
                setAmount={setAmount}
                strategies={strategies}
                toggleStrategy={toggleStrategy}
                loading={loading}
                error={error}
                onSubmit={handleSubmit}
              />
            </CardContent>
          </Card>

          {result && <PortfolioResultView result={result} />}
        </Container>
      </Box>
    </ThemeProvider>
  )
}
