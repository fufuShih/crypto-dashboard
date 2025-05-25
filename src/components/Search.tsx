import { useState } from 'react';

interface CryptoItem {
  name: string;
  symbol: string;
  price: number;
  change: number;
  image: string;
}

const mockCryptoList: CryptoItem[] = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 42850,
    change: 2.45,
    image: 'https://images.unsplash.com/photo-1605792657660-596af9009e82?w=40&h=40&fit=crop&crop=center'
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    price: 2642,
    change: -1.23,
    image: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=40&h=40&fit=crop&crop=center'
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    price: 98.45,
    change: 4.12,
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=40&h=40&fit=crop&crop=center'
  },
  {
    name: 'Cardano',
    symbol: 'ADA',
    price: 0.52,
    change: 0.87,
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=40&h=40&fit=crop&crop=center'
  }
];

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null);

  const filteredCryptoList = mockCryptoList.filter(crypto =>
    crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-80 bg-white rounded-2xl shadow-lg p-6">
      {/* Search Input */}
      <div className="relative mb-6">
        <svg
          className="absolute left-3 top-3 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search cryptocurrencies..."
          className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border-none outline-none text-black"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Crypto List */}
      <div className="space-y-3">
        {filteredCryptoList.map((crypto) => (
          <div
            key={crypto.symbol}
            className={`p-4 rounded-xl cursor-pointer transition-all ${
              selectedCrypto === crypto.symbol
                ? 'bg-blue-50 border-2 border-blue-200'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
            onClick={() => setSelectedCrypto(crypto.symbol)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={crypto.image}
                  alt={crypto.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-bold text-black">{crypto.name}</p>
                  <p className="text-black opacity-60 text-sm">{crypto.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-black">${crypto.price.toLocaleString()}</p>
                <p className={`text-sm ${crypto.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {crypto.change >= 0 ? '+' : ''}{crypto.change}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Market Summary */}
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
        <h3 className="font-bold text-black mb-3">Market Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-black opacity-60">Total Market Cap</span>
            <span className="font-bold text-black">$1.64T</span>
          </div>
          <div className="flex justify-between">
            <span className="text-black opacity-60">24h Volume</span>
            <span className="font-bold text-black">$89.2B</span>
          </div>
          <div className="flex justify-between">
            <span className="text-black opacity-60">BTC Dominance</span>
            <span className="font-bold text-black">52.4%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;