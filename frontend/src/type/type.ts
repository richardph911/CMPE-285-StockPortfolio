export interface Holding {
  ticker: string
  allocation: number
  current_price: number
  shares: number
  current_value: number
}

export interface PortfolioResult {
  investment: number
  selected_strategies: string[]
  selected_strategy_labels: string[]
  portfolio: Holding[]
  total_current_value: number
  trend_labels: string[]
  trend_values: number[]
}

export type StrategyKey = 'ethical' | 'growth' | 'index' | 'quality' | 'value'
