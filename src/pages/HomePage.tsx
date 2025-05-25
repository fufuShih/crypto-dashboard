import ChartContainer from "../components/ChartContainer";
import Portfolio from "../components/Portfolio";
import Search from "../components/Search";

export function HomePage() {
  return (
    <div className="max-w-7xl mx-auto p-2">
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
  );
}
