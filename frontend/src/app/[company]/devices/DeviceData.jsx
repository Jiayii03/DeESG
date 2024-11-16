import LineChart from "../../components/Charts/LineChart";
import BarChart from "../../components/Charts/BarChart";

export default function App() {
    return(
        <div className="flex flex-col gap-20 justify-start items-center">
            <LineChart />
            <BarChart />
        </div>
    );
}