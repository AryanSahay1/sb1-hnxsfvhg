import React, { useState } from 'react';
import { TrendingUp, Users, PlayCircle, Award, BarChart3, Bell, Calculator, Menu, X, Star, ThumbsUp, MessageCircle, Share2, Zap, Info } from 'lucide-react';

const NAVIGATION_ITEMS = [
  { id: 'home', label: 'Home', icon: TrendingUp },
  { id: 'tools', label: 'Tools', icon: Calculator },
  { id: 'ideas', label: 'Ideas', icon: Users },
  { id: 'reels', label: 'Reels', icon: PlayCircle },
  { id: 'xp', label: 'XP Store', icon: Award },
];

interface TradeIdea {
  id: string;
  author: string;
  avatar: string;
  pair: string;
  direction: 'BUY' | 'SELL';
  entry: string;
  sl: string;
  tp: string;
  reasoning: string;
  likes: number;
  comments: number;
  timeAgo: string;
  xpEarned: number;
}

interface XPItem {
  id: string;
  title: string;
  description: string;
  cost: number;
  icon: React.ElementType;
  category: 'premium' | 'boost' | 'cosmetic';
}

interface EconomicEvent {
  id: string;
  time: string;
  currency: string;
  event: string;
  impact: 'low' | 'medium' | 'high';
  forecast: string;
  previous: string;
}

interface MarketSentiment {
  pair: string;
  bullish: number;
  bearish: number;
}

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [userXP, setUserXP] = useState(1250);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [adFreeTimeRemaining, setAdFreeTimeRemaining] = useState(0);
  const [likedIdeas, setLikedIdeas] = useState<Set<string>>(new Set());
  const [xpNotifications, setXpNotifications] = useState<Array<{id: string, message: string, xp: number}>>([]);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [alertPair, setAlertPair] = useState('EUR/USD');
  const [alertType, setAlertType] = useState('above');
  const [alertPrice, setAlertPrice] = useState('');
  const [statArbPair1, setStatArbPair1] = useState('EUR/USD');
  const [statArbPair2, setStatArbPair2] = useState('GBP/USD');
  const [statArbPeriod, setStatArbPeriod] = useState('20');
  const [showStatArbInfo, setShowStatArbInfo] = useState(false);
  const [showToolInfo, setShowToolInfo] = useState<string | null>(null);
  const [showCorrelationInfo, setShowCorrelationInfo] = useState(false);

  // Sample data for tools
  const economicEvents = [
    {
      id: '1',
      time: '14:30',
      currency: 'USD',
      event: 'Non-Farm Payrolls',
      impact: 'high' as const,
      forecast: '180K',
      previous: '175K'
    },
    {
      id: '2',
      time: '16:00',
      currency: 'EUR',
      event: 'ECB Interest Rate Decision',
      impact: 'high' as const,
      forecast: '4.50%',
      previous: '4.50%'
    }
  ];

  const marketSentiment = [
    { pair: 'EUR/USD', bullish: 68, bearish: 32 },
    { pair: 'GBP/USD', bullish: 45, bearish: 55 },
    { pair: 'USD/JPY', bullish: 72, bearish: 28 }
  ];

  const currencyStrength = [
    { currency: 'USD', strength: 85, change: '+2.3%' },
    { currency: 'EUR', strength: 72, change: '-1.1%' },
    { currency: 'GBP', strength: 68, change: '+0.8%' }
  ];

  const correlationData = [
    { pair: 'EUR/USD vs GBP/USD', correlation: 0.78 },
    { pair: 'USD/JPY vs USD/CHF', correlation: -0.34 },
    { pair: 'AUD/USD vs NZD/USD', correlation: 0.72 }
  ];

  // Statistical Arbitrage sample data
  const generateZScoreData = () => {
    const data = [];
    for (let i = 0; i < 50; i++) {
      const spread = Math.random() * 0.02 - 0.01; // Random spread
      const mean = 0.005;
      const std = 0.003;
      const zScore = (spread - mean) / std;
      data.push({
        date: new Date(Date.now() - (49 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
        spread: spread,
        zScore: zScore,
        signal: zScore > 2 ? 'SELL' : zScore < -2 ? 'BUY' : 'HOLD'
      });
    }
    return data;
  };

  const generateGarchData = () => {
    const data = [];
    for (let i = 0; i < 30; i++) {
      data.push({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
        volatility: Math.random() * 0.02 + 0.005,
        forecast: Math.random() * 0.025 + 0.003
      });
    }
    return data;
  };

  const generatePercentageChart = () => {
    const data = [];
    let price1 = 1.0500;
    let price2 = 1.2800;
    for (let i = 0; i < 100; i++) {
      price1 += (Math.random() - 0.5) * 0.01;
      price2 += (Math.random() - 0.5) * 0.01;
      const percentage = ((price1 / price2) - 1) * 100;
      data.push({
        time: i,
        percentage: percentage,
        pair1: price1,
        pair2: price2
      });
    }
    return data;
  };

  const useToolXP = () => {
    setUserXP(prev => prev + 5);
    const notification = {
      id: Date.now().toString(),
      message: "Used trading tool",
      xp: 5
    };
    setXpNotifications(prev => [...prev, notification]);
    setTimeout(() => {
      setXpNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 3000);
  };

  const tools = [
    {
      id: 'pip-calculator',
      name: 'Pip Calculator',
      icon: Calculator,
      color: 'bg-blue-500',
      description: 'Calculate pip values'
    },
    {
      id: 'position-size',
      name: 'Position Size',
      icon: BarChart3,
      color: 'bg-green-500',
      description: 'Calculate position sizes'
    },
    {
      id: 'economic-calendar',
      name: 'Economic Calendar',
      icon: Bell,
      color: 'bg-purple-500',
      description: 'Track economic events'
    },
    {
      id: 'market-sentiment',
      name: 'Market Sentiment',
      icon: TrendingUp,
      color: 'bg-orange-500',
      description: 'View market sentiment'
    },
    {
      id: 'currency-strength',
      name: 'Currency Strength',
      icon: Award,
      color: 'bg-red-500',
      description: 'Monitor currency strength'
    },
    {
      id: 'correlation-matrix',
      name: 'Correlation Matrix',
      icon: BarChart3,
      color: 'bg-pink-500',
      description: 'View pair correlations'
    },
    {
      id: 'price-alerts',
      name: 'Price Alerts',
      icon: TrendingUp,
      color: 'bg-purple-500',
      description: 'Monitor price alerts'
    },
    {
      id: 'statistical-arbitrage',
      name: 'Statistical Arbitrage',
      icon: BarChart3,
      color: 'bg-indigo-500',
      description: 'Advanced pair trading tools'
    }
  ];

  const renderToolContent = () => {
    if (selectedTool === 'pip-calculator') {
      return (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Pip Calculator</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Account Currency (USD)"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
            />
            <input
              type="text"
              placeholder="Currency Pair (EUR/USD)"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
            />
            <input
              type="text"
              placeholder="Trade Size (100000)"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
            />
            <div className="bg-gray-700 p-3 rounded-lg">
              <span className="text-gray-300">Pip Value: </span>
              <span className="text-white font-bold">$10.00</span>
            </div>
            <button
              onClick={useToolXP}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              Calculate (+5 XP)
            </button>
          </div>
        </div>
      );
    }

    if (selectedTool === 'position-size') {
      return (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Position Size Calculator</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Account Balance ($10,000)"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
            />
            <input
              type="text"
              placeholder="Risk Percentage (2%)"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
            />
            <input
              type="text"
              placeholder="Entry Price (1.0850)"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
            />
            <input
              type="text"
              placeholder="Stop Loss (1.0800)"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
            />
            <div className="bg-gray-700 p-3 rounded-lg">
              <span className="text-gray-300">Position Size: </span>
              <span className="text-white font-bold">4,000 units</span>
            </div>
            <button
              onClick={useToolXP}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              Calculate (+5 XP)
            </button>
          </div>
        </div>
      );
    }

    if (selectedTool === 'economic-calendar') {
      return (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Economic Calendar</h3>
          <div className="space-y-3">
            {economicEvents.map((event) => (
              <div key={event.id} className="bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="text-white font-semibold">{event.event}</div>
                    <div className="text-gray-300 text-sm">{event.time} - {event.currency}</div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    event.impact === 'high' ? 'bg-red-500' : 
                    event.impact === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  } text-white`}>
                    {event.impact.toUpperCase()}
                  </span>
                </div>
                <div className="text-sm text-gray-400">
                  Forecast: {event.forecast} | Previous: {event.previous}
                </div>
              </div>
            ))}
            <button
              onClick={useToolXP}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              Set Notifications (+5 XP)
            </button>
          </div>
        </div>
      );
    }

    if (selectedTool === 'market-sentiment') {
      return (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Market Sentiment</h3>
          <div className="space-y-3">
            {marketSentiment.map((sentiment) => (
              <div key={sentiment.pair} className="bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-semibold">{sentiment.pair}</span>
                  <span className={`text-sm ${sentiment.bullish > sentiment.bearish ? 'text-green-400' : 'text-red-400'}`}>
                    {sentiment.bullish > sentiment.bearish ? 'Bullish' : 'Bearish'}
                  </span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${sentiment.bullish}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Bullish: {sentiment.bullish}%</span>
                  <span>Bearish: {sentiment.bearish}%</span>
                </div>
              </div>
            ))}
            <button
              onClick={useToolXP}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              Refresh Data (+5 XP)
            </button>
          </div>
        </div>
      );
    }

    if (selectedTool === 'currency-strength') {
      return (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Currency Strength</h3>
          <div className="space-y-3">
            {currencyStrength.map((currency) => (
              <div key={currency.currency} className="bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-bold text-lg">{currency.currency}</span>
                  <span className={`text-sm ${currency.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                    {currency.change}
                  </span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-3 mb-1">
                  <div
                    className={`h-3 rounded-full ${
                      currency.strength > 70 ? 'bg-green-500' :
                      currency.strength > 50 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${currency.strength}%` }}
                  ></div>
                </div>
                <div className="text-right text-white font-semibold">{currency.strength}</div>
              </div>
            ))}
            <button
              onClick={useToolXP}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              Update Strength (+5 XP)
            </button>
          </div>
        </div>
      );
    }

    if (selectedTool === 'correlation-matrix') {
      return (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Correlation Matrix</h3>
          <div className="space-y-3">
            {correlationData.map((correlation, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-white">{correlation.pair}</span>
                  <span className={`font-bold ${
                    correlation.correlation > 0.5 ? 'text-green-400' :
                    correlation.correlation < -0.5 ? 'text-red-400' : 'text-yellow-400'
                  }`}>
                    {correlation.correlation.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
            <button
              onClick={useToolXP}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              Update Correlations (+5 XP)
            </button>
          </div>
        </div>
      );
    }

    if (selectedTool === 'price-alerts') {
      return (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Price Alerts</h3>
          <div className="space-y-3">
            <select
              value={alertPair}
              onChange={(e) => setAlertPair(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
            >
              <option value="EUR/USD">EUR/USD</option>
              <option value="GBP/USD">GBP/USD</option>
              <option value="USD/JPY">USD/JPY</option>
            </select>
            <select
              value={alertType}
              onChange={(e) => setAlertType(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
            >
              <option value="above">Price Above</option>
              <option value="below">Price Below</option>
              <option value="crosses">Price Crosses</option>
            </select>
            <input
              type="text"
              placeholder="Target Price (e.g., 1.0850)"
              value={alertPrice}
              onChange={(e) => setAlertPrice(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
            />
            <button
              onClick={useToolXP}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              Set Alert (+5 XP)
            </button>
          </div>
        </div>
      );
    }

    if (selectedTool === 'statistical-arbitrage') {
      const zScoreData = generateZScoreData();
      const garchData = generateGarchData();
      const chartData = generatePercentageChart();
      const latestZScore = zScoreData[zScoreData.length - 1];
      
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">Statistical Arbitrage Tools</h3>
            <button
              onClick={() => setShowStatArbInfo(true)}
              className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors"
            >
              <Info className="w-5 h-5 text-blue-400" />
            </button>
          </div>

          {/* Pair Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Pair 1</label>
              <select
                value={statArbPair1}
                onChange={(e) => setStatArbPair1(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
              >
                <optgroup label="Major Pairs">
                  <option value="EUR/USD">EUR/USD</option>
                  <option value="GBP/USD">GBP/USD</option>
                  <option value="USD/JPY">USD/JPY</option>
                  <option value="AUD/USD">AUD/USD</option>
                </optgroup>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Pair 2</label>
              <select
                value={statArbPair2}
                onChange={(e) => setStatArbPair2(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
              >
                <optgroup label="Major Pairs">
                  <option value="GBP/USD">GBP/USD</option>
                  <option value="EUR/USD">EUR/USD</option>
                  <option value="USD/CHF">USD/CHF</option>
                  <option value="USD/CAD">USD/CAD</option>
                </optgroup>
              </select>
            </div>
          </div>

          {/* Z-Score Analysis */}
          <div className="bg-gray-700/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white">Z-Score Analysis</h4>
              <button
                onClick={() => setShowToolInfo('zscore')}
                className="p-1 bg-gray-600 rounded hover:bg-gray-500 transition-colors"
              >
                <Info className="w-4 h-4 text-gray-300" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-800 p-3 rounded">
                <div className="text-sm text-gray-400">Current Z-Score</div>
                <div className={`text-2xl font-bold ${
                  latestZScore.zScore > 2 ? 'text-red-400' : 
                  latestZScore.zScore < -2 ? 'text-green-400' : 'text-yellow-400'
                }`}>
                  {latestZScore.zScore.toFixed(2)}
                </div>
              </div>
              <div className="bg-gray-800 p-3 rounded">
                <div className="text-sm text-gray-400">Signal</div>
                <div className={`text-lg font-bold ${
                  latestZScore.signal === 'BUY' ? 'text-green-400' : 
                  latestZScore.signal === 'SELL' ? 'text-red-400' : 'text-yellow-400'
                }`}>
                  {latestZScore.signal}
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-3 rounded mb-4">
              <div className="text-sm text-gray-400 mb-2">Z-Score History (Last 10 days)</div>
              <div className="flex space-x-1">
                {zScoreData.slice(-10).map((item, index) => (
                  <div
                    key={index}
                    className={`flex-1 h-8 rounded ${
                      item.zScore > 2 ? 'bg-red-500' : 
                      item.zScore < -2 ? 'bg-green-500' : 'bg-yellow-500'
                    }`}
                    title={`${item.date}: ${item.zScore.toFixed(2)}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* GARCH Volatility Model */}
          <div className="bg-gray-700/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white">GARCH Volatility Model</h4>
              <button
                onClick={() => setShowToolInfo('garch')}
                className="p-1 bg-gray-600 rounded hover:bg-gray-500 transition-colors"
              >
                <Info className="w-4 h-4 text-gray-300" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-800 p-3 rounded">
                <div className="text-sm text-gray-400">Current Volatility</div>
                <div className="text-xl font-bold text-blue-400">
                  {(garchData[garchData.length - 1].volatility * 100).toFixed(2)}%
                </div>
              </div>
              <div className="bg-gray-800 p-3 rounded">
                <div className="text-sm text-gray-400">Forecast</div>
                <div className="text-xl font-bold text-purple-400">
                  {(garchData[garchData.length - 1].forecast * 100).toFixed(2)}%
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-3 rounded">
              <div className="text-sm text-gray-400 mb-2">Volatility Trend (30 days)</div>
              <div className="flex items-end space-x-1 h-16">
                {garchData.map((item, index) => (
                  <div
                    key={index}
                    className="flex-1 bg-blue-500 rounded-t"
                    style={{ height: `${(item.volatility / 0.025) * 100}%` }}
                    title={`${item.date}: ${(item.volatility * 100).toFixed(2)}%`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Percentage Chart */}
          <div className="bg-gray-700/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white">Percentage Spread Chart</h4>
              <button
                onClick={() => setShowToolInfo('percentage')}
                className="p-1 bg-gray-600 rounded hover:bg-gray-500 transition-colors"
              >
                <Info className="w-4 h-4 text-gray-300" />
              </button>
            </div>
            
            <div className="bg-gray-800 p-3 rounded mb-4">
              <div className="text-sm text-gray-400 mb-2">
                {statArbPair1} vs {statArbPair2} Percentage Difference
              </div>
              <div className="flex items-center space-x-2 h-32 overflow-x-auto">
                {chartData.slice(-50).map((item, index) => (
                  <div key={index} className="flex flex-col items-center min-w-[4px]">
                    <div
                      className={`w-1 ${item.percentage > 0 ? 'bg-green-500' : 'bg-red-500'} rounded`}
                      style={{ 
                        height: `${Math.abs(item.percentage) * 10 + 5}px`,
                        marginTop: item.percentage > 0 ? '0' : 'auto'
                      }}
                      title={`${item.percentage.toFixed(2)}%`}
                    />
                  </div>
                ))}
              </div>
              <div className="text-center text-xs text-gray-500 mt-2">
                Current Spread: {chartData[chartData.length - 1].percentage.toFixed(2)}%
              </div>
            </div>
          </div>

          <button
            onClick={useToolXP}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            Run Statistical Arbitrage Analysis (+5 XP)
          </button>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 gap-4">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setSelectedTool(tool.id)}
            className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg transition-colors text-left"
          >
            <div className={`w-10 h-10 ${tool.color} rounded-lg flex items-center justify-center mb-3`}>
              <tool.icon className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-white font-semibold text-sm mb-1">{tool.name}</h3>
            <p className="text-gray-400 text-xs">{tool.description}</p>
          </button>
        ))}
      </div>
    );
  };

  const tradeIdeas: TradeIdea[] = [
    {
      id: '1',
      author: 'Alex_Trader',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      pair: 'EUR/USD',
      direction: 'BUY',
      entry: '1.0850',
      sl: '1.0800',
      tp: '1.0920',
      reasoning: 'Strong support at 1.0840, bullish divergence on RSI, ECB dovish stance priced in',
      likes: 127,
      comments: 23,
      timeAgo: '2h',
      xpEarned: 45
    },
    {
      id: '2',
      author: 'MarketMaven',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      pair: 'GBP/JPY',
      direction: 'SELL',
      entry: '185.40',
      sl: '186.00',
      tp: '184.20',
      reasoning: 'Break of ascending trendline, bearish engulfing pattern, risk-off sentiment',
      likes: 89,
      comments: 18,
      timeAgo: '4h',
      xpEarned: 32
    }
  ];

  const xpItems: XPItem[] = [
    {
      id: '1',
      title: 'Ad-Free 24H',
      description: 'Remove all ads for 24 hours',
      cost: 500,
      icon: Zap,
      category: 'premium'
    },
    {
      id: '2',
      title: 'Boost Post',
      description: 'Move your trade idea to top of feed',
      cost: 300,
      icon: TrendingUp,
      category: 'boost'
    },
    {
      id: '3',
      title: 'Creator Badge',
      description: 'Show your expertise with a special badge',
      cost: 5000,
      icon: Star,
      category: 'cosmetic'
    }
  ];

  const purchaseXPItem = (item: XPItem) => {
    if (userXP >= item.cost) {
      setUserXP(prev => prev - item.cost);
      if (item.id === '1') {
        setAdFreeTimeRemaining(24);
      }
    }
  };

  const handleLike = (ideaId: string) => {
    if (!likedIdeas.has(ideaId)) {
      setUserXP(prev => prev + 2);
      setLikedIdeas(prev => new Set([...prev, ideaId]));
      
      const notification = {
        id: Date.now().toString(),
        message: "Liked a trade idea",
        xp: 2
      };
      setXpNotifications(prev => [...prev, notification]);
      
      setTimeout(() => {
        setXpNotifications(prev => prev.filter(n => n.id !== notification.id));
      }, 3000);
    }
  };

  const handleComment = (ideaId: string) => {
    setUserXP(prev => prev + 3);
    
    const notification = {
      id: Date.now().toString(),
      message: "Added a comment",
      xp: 3
    };
    setXpNotifications(prev => [...prev, notification]);
    
    setTimeout(() => {
      setXpNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 3000);
  };

  const renderHome = () => (
    <div className="space-y-8">
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-3xl p-8 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20 rounded-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">TraderVerse</h1>
              <p className="text-white/80">Trade smarter. Share louder. Learn faster.</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{userXP.toLocaleString()}</div>
              <div className="text-white/80 text-sm">XP Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">47</div>
              <div className="text-white/80 text-sm">Ideas Shared</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">12</div>
              <div className="text-white/80 text-sm">Reels Posted</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="font-semibold text-gray-900">Win Rate</div>
              <div className="text-2xl font-bold text-green-600">73%</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="font-semibold text-gray-900">Followers</div>
              <div className="text-2xl font-bold text-blue-600">324</div>
            </div>
          </div>
        </div>
      </div>

      {adFreeTimeRemaining > 0 && (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-4 text-white">
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5" />
            <div>
              <div className="font-semibold">Ad-Free Active</div>
              <div className="text-white/90 text-sm">{adFreeTimeRemaining} hours remaining</div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">App Features</h2>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Calculator className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Trading Tools</h3>
                <p className="text-gray-600 text-sm">Professional calculators, alerts, and analysis tools</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Trade Ideas Hub</h3>
                <p className="text-gray-600 text-sm">Share and discover profitable trading opportunities</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <PlayCircle className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Trading Reels</h3>
                <p className="text-gray-600 text-sm">Short-form educational and analysis content</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTools = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Trading Tools</h2>
            <p className="text-gray-300">Professional trading utilities</p>
          </div>
          <div className="bg-yellow-500/20 px-3 py-1 rounded-full">
            <span className="text-yellow-400 text-sm font-medium">+5 XP per use</span>
          </div>
        </div>

        {selectedTool ? (
          <div className="space-y-4">
            <button
              onClick={() => setSelectedTool(null)}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-4"
            >
              <X className="w-4 h-4" />
              Back to Tools
            </button>
            {renderToolContent()}
          </div>
        ) : (
          renderToolContent()
        )}
      </div>

      {/* Statistical Arbitrage Info Modal */}
      {showStatArbInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">What is Statistical Arbitrage?</h3>
                <button
                  onClick={() => setShowStatArbInfo(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <p className="text-lg font-medium text-blue-600">
                  Think of it like two friends walking together...
                </p>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p>
                    Imagine two friends who always walk together. Sometimes one walks a bit faster, 
                    sometimes the other does, but they always come back together. Statistical arbitrage 
                    is like betting that when one friend gets too far ahead, they'll slow down and wait 
                    for the other to catch up.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">How it works in 5 simple steps:</h4>
                  <div className="space-y-2">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      <p><strong>Find Related Pairs:</strong> Look for currency pairs that usually move together (like EUR/USD and GBP/USD)</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      <p><strong>Measure the Difference:</strong> Calculate how far apart their prices are right now</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      <p><strong>Check if it's Unusual:</strong> See if this difference is much bigger than normal</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                      <p><strong>Make the Trade:</strong> Buy the "cheap" one and sell the "expensive" one</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</div>
                      <p><strong>Wait for Normal:</strong> Close the trade when they come back to their normal relationship</p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <h4 className="font-semibold text-yellow-800">⚠️ Important Risks:</h4>
                  <ul className="mt-2 space-y-1 text-yellow-700">
                    <li>• Sometimes the "friends" stop walking together permanently</li>
                    <li>• You might have to wait a long time for them to come back together</li>
                    <li>• Always use proper risk management and stop losses</li>
                    <li>• Never risk more than you can afford to lose</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tool Info Modal */}
      {showToolInfo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">
                {showToolInfo === 'zscore' && 'Z-Score Analysis'}
                {showToolInfo === 'garch' && 'GARCH Volatility Model'}
                {showToolInfo === 'percentage' && 'Percentage Spread Chart'}
              </h3>
              <button
                onClick={() => setShowToolInfo(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4 text-gray-300">
              {showToolInfo === 'zscore' && (
                <>
                  <p>
                    <strong className="text-white">Z-Score</strong> tells you how "unusual" the current price difference is between two currency pairs.
                  </p>
                  <div className="bg-gray-700 p-3 rounded">
                    <h4 className="font-semibold text-white mb-2">How to read it:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• <span className="text-green-400">Z-Score below -2:</span> Pairs are unusually far apart → BUY signal</li>
                      <li>• <span className="text-yellow-400">Z-Score between -2 and +2:</span> Normal range → HOLD</li>
                      <li>• <span className="text-red-400">Z-Score above +2:</span> Pairs are unusually close → SELL signal</li>
                    </ul>
                  </div>
                  <p className="text-sm">
                    Think of it like a rubber band - when it's stretched too far, it wants to snap back to normal!
                  </p>
                </>
              )}
              {showToolInfo === 'garch' && (
                <>
                  <p>
                    <strong className="text-white">GARCH Model</strong> predicts how much the price difference between pairs will jump around (volatility).
                  </p>
                  <div className="bg-gray-700 p-3 rounded">
                    <h4 className="font-semibold text-white mb-2">Why it matters:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• <span className="text-blue-400">High volatility:</span> Prices change a lot → More risky but more profit potential</li>
                      <li>• <span className="text-green-400">Low volatility:</span> Prices are stable → Safer but smaller profits</li>
                      <li>• <span className="text-purple-400">Forecast:</span> Helps you prepare for what's coming next</li>
                    </ul>
                  </div>
                  <p className="text-sm">
                    It's like a weather forecast for price movements - helps you decide if you need an umbrella!
                  </p>
                </>
              )}
              {showToolInfo === 'percentage' && (
                <>
                  <p>
                    <strong className="text-white">Percentage Chart</strong> shows how much more expensive one currency pair is compared to another.
                  </p>
                  <div className="bg-gray-700 p-3 rounded">
                    <h4 className="font-semibold text-white mb-2">How to use it:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• <span className="text-green-400">Green bars:</span> First pair is more expensive than usual</li>
                      <li>• <span className="text-red-400">Red bars:</span> First pair is cheaper than usual</li>
                      <li>• <strong>Look for extremes:</strong> When bars are very tall, there might be a trading opportunity</li>
                    </ul>
                  </div>
                  <p className="text-sm">
                    It's like comparing prices at two different stores - when one is much more expensive, you might want to shop at the other!
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderIdeas = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Trade Ideas</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Share Idea (+10 XP)
        </button>
      </div>

      <div className="space-y-4">
        {tradeIdeas.map((idea) => (
          <div key={idea.id} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-start gap-4">
              <img src={idea.avatar} alt={idea.author} className="w-12 h-12 rounded-full object-cover" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-gray-900">{idea.author}</span>
                  <span className="text-gray-500 text-sm">•</span>
                  <span className="text-gray-500 text-sm">{idea.timeAgo}</span>
                  <div className="ml-auto bg-green-100 px-2 py-1 rounded-full">
                    <span className="text-green-600 text-xs font-medium">+{idea.xpEarned} XP</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="text-lg font-bold text-gray-900">{idea.pair}</div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      idea.direction === 'BUY' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {idea.direction}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Entry: </span>
                      <span className="font-medium">{idea.entry}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">SL: </span>
                      <span className="ml-1 font-medium">{idea.sl}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">TP: </span>
                      <span className="font-medium">{idea.tp}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{idea.reasoning}</p>

                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => handleLike(idea.id)}
                    className={`flex items-center gap-2 transition-colors ${
                      likedIdeas.has(idea.id) ? 'text-blue-500' : 'text-gray-600 hover:text-blue-500'
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm">{idea.likes}</span>
                    {!likedIdeas.has(idea.id) && (
                      <span className="text-xs text-green-600 font-medium">+2 XP</span>
                    )}
                  </button>
                  <button 
                    onClick={() => handleComment(idea.id)}
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">{idea.comments}</span>
                    <span className="text-xs text-green-600 font-medium">+3 XP</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span className="text-sm">Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderReels = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Trading Reels</h2>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">
          Upload Reel (+20 XP)
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((reel) => (
          <div key={reel} className="relative bg-gray-900 rounded-xl aspect-[9/16] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-white/20 rounded-full" />
                <span className="text-sm font-medium">@trader_pro</span>
              </div>
              <p className="text-sm">How I made 300 pips on EUR/USD today 📈</p>
              <div className="flex items-center gap-4 mt-2 text-sm">
                <span>2.1K likes</span>
                <span>34 comments</span>
              </div>
            </div>
            <div className="absolute top-4 right-4">
              <div className="bg-green-100 px-2 py-1 rounded-full">
                <span className="text-green-600 text-xs font-medium">+45 XP</span>
              </div>
            </div>
            <button className="absolute inset-0 flex items-center justify-center">
              <PlayCircle className="w-16 h-16 text-white/80" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderXPStore = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">XP Store</h2>
          <p className="text-gray-600">Spend your XP points on premium features</p>
        </div>
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 rounded-xl">
          <span className="text-white font-bold">{userXP.toLocaleString()} XP</span>
        </div>
      </div>

      <div className="space-y-4">
        {xpItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                item.category === 'premium' ? 'bg-yellow-100' :
                item.category === 'boost' ? 'bg-blue-100' : 'bg-purple-100'
              }`}>
                <item.icon className={`w-6 h-6 ${
                  item.category === 'premium' ? 'text-yellow-600' :
                  item.category === 'boost' ? 'text-blue-600' : 'text-purple-600'
                }`} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-bold text-lg">{item.cost.toLocaleString()} XP</span>
                  {userXP >= item.cost ? (
                    <span className="text-green-600 text-sm">✓ Affordable</span>
                  ) : (
                    <span className="text-red-600 text-sm">Need {(item.cost - userXP).toLocaleString()} more XP</span>
                  )}
                </div>
              </div>
              <button
                onClick={() => purchaseXPItem(item)}
                disabled={userXP < item.cost}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  userXP >= item.cost
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {userXP >= item.cost ? 'Purchase' : 'Not enough XP'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-xl p-6 text-white">
        <h3 className="font-bold text-lg mb-2">Earn More XP</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>• Daily login: +10 XP</div>
          <div>• Use tools: +5 XP each</div>
          <div>• Share trade idea: +10 XP</div>
          <div>• Upload reel: +20 XP</div>
          <div>• Like ideas: +2 XP each</div>
          <div>• Comment on ideas: +3 XP</div>
          <div>• Get likes: +3 XP each</div>
          <div>• Get comments: +5 XP each</div>
          <div>• Refer friend: +100 XP</div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return renderHome();
      case 'tools': return renderTools();
      case 'ideas': return renderIdeas();
      case 'reels': return renderReels();
      case 'xp': return renderXPStore();
      default: return renderHome();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-gray-900">TraderVerse</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-yellow-100 px-3 py-1 rounded-full">
                <span className="text-yellow-600 text-sm font-medium">{userXP.toLocaleString()} XP</span>
              </div>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto">
        {activeTab !== 'tools' && (
          <div className="p-4">
            {renderContent()}
          </div>
        )}
        {activeTab === 'tools' && renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-md mx-auto">
        <div className="grid grid-cols-5 gap-1">
          {NAVIGATION_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-1 py-3 px-2 transition-colors ${
                  isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Spacing for bottom nav */}
      <div className="h-20"></div>

      {/* XP Notifications */}
      <div className="fixed top-20 right-4 z-50 space-y-2 max-w-md">
        {xpNotifications.map((notification) => (
          <div
            key={notification.id}
            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-slide-in-right"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">{notification.message}</span>
              <span className="font-bold">+{notification.xp} XP</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;