import ChartContainer from "../components/ChartContainer";
import Portfolio from "../components/Portfolio";
import Search from "../components/Search";

export function HomePage() {
  return (
    <section className="w-full p-2 flex flex-col gap-2">
      {/* First row - Chart and Search */}
      <div className="flex gap-2">
        <div className="flex-3">
          <ChartContainer />
        </div>
        <div className="flex-1">
          <Search />
        </div>
      </div>

      {/* Second row - Portfolio */}
      <div className="px-2">
        <Portfolio />
      </div>
    </section>
  );
}
