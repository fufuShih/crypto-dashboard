interface PortfolioProps {
}

const Portfolio = (props: PortfolioProps) => {

  return (
    <div className="flex space-x-6">
      {/* Portfolio Overview */}
      <div className="flex-1">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-black mb-4">Total Balance</h2>
          <div className="text-center">
            <p className="text-4xl font-bold text-black mb-2">$15,847.32</p>
            <p className="text-green-500 font-medium">+$1,234.56 (+8.45%)</p>
          </div>

          {/* Portfolio Distribution */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <span className="font-medium text-black">Bitcoin (65%)</span>
              </div>
              <span className="font-bold text-black">$10,300.76</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                <span className="font-medium text-black">Ethereum (25%)</span>
              </div>
              <span className="font-bold text-black">$3,961.83</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="font-medium text-black">Others (10%)</span>
              </div>
              <span className="font-bold text-black">$1,584.73</span>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-black mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
              <div>
                <p className="font-medium text-black">Buy Bitcoin</p>
                <p className="text-black opacity-60 text-sm">2 hours ago</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-black">+0.025 BTC</p>
                <p className="text-green-500 text-sm">$1,071.25</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border-l-4 border-red-500 bg-red-50 rounded-r-lg">
              <div>
                <p className="font-medium text-black">Sell Ethereum</p>
                <p className="text-black opacity-60 text-sm">1 day ago</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-black">-1.5 ETH</p>
                <p className="text-red-500 text-sm">$3,963.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;