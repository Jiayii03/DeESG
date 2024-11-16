import { Button } from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex flex-col justify-start gap-10 p-10">
      <div className="flex justify-between">
        <h1 className="text-2xl">ESG Score</h1>
        <Button>Evaluate</Button>
      </div>
    </div>
  );
}
