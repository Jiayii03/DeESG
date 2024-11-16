import LineChart from "../../components/Charts/LineChart";
import BarChart from "../../components/Charts/BarChart";
import EdataTable from "./EdataTable";

export default function App() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-start items-center gap-5">
        <LineChart />
        <BarChart />
      </div>
      <div>
        <EdataTable />
      </div>
    </div>
  );
}
