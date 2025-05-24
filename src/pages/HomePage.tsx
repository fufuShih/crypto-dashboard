import ChartContainer from "../components/ChartContainer";

export function HomePage() {
    return (
        <div className="w-full h-full min-h-[calc(100vh-8rem)] py-8">
            <div className="container mx-auto px-4">
                <ChartContainer />
            </div>
        </div>
    );
}
