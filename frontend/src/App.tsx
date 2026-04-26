import { useState } from 'react'
import { Box, Card, CardContent, Container } from '@mui/material'
import PortfolioForm from './components/PortfolioForm'
import PortfolioResultView from './components/PortfolioResult'
import type { StrategyKey, PortfolioResult } from './type/type'

export default function App() {
  const [amount, setAmount] = useState(10000)
  const [strategies, setStrategies] = useState<StrategyKey[]>([])
  const [result, setResult] = useState<PortfolioResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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

    try {
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, strategies }),
      })

      const data = await res.json()
      setResult(data)
    } catch {
      setError('Failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="md">
        <Card>
          <CardContent>
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
  )
}
