import ChartContainer from "../components/ChartContainer";
import Portfolio from "../components/Portfolio";
import Search from "../components/Search";

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#667eea] to-[#764ba2] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-6">
          {/* Left side - Chart */}
          <div className="flex-1">
            <ChartContainer />
          </div>

          {/* Right side - Search and Portfolio */}
          <div className="w-80 space-y-6">
            <Search />
            <Portfolio />
          </div>
        </div>
      </div>
    </div>
  );
}
