import DetailsTable from "./DetailsTable";
import { Avatar } from "@nextui-org/avatar";
import { Chip } from "@nextui-org/react";
import { Info } from "lucide-react";
import { Progress } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { MoveUpRight } from "lucide-react";
import { SquareArrowOutUpRight } from "lucide-react";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function App({companyName}) {

  const toTitleCase = (str) =>
    str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  return (
    <div className="flex flex-col border-e-2 p-3">
      <div className="flex justify-start items-center gap-3">
        <div>
          <Avatar size="lg" name="test"></Avatar>
        </div>
        <div className="flex gap-2 items-center">
          <div className="text-lg font-semibold">
            <span>{toTitleCase(companyName)}</span>
          </div>
          <div className="text-sm font-light text-gray-400">
            <span>ESG Score</span>
          </div>
        </div>
        <div>
          <Chip radius="sm" size="sm" startContent={<span>#</span>}>
            1
          </Chip>
        </div>
      </div>

      <div className="flex mt-3 items-center p-3">
        <span className="text-4xl me-3 font-semibold">5.0</span>
        <i
          className="bi bi-caret-up-fill text-green-300 me-1"
          style={{ fontSize: "1.5rem" }}
        ></i>
        <span className="text-lg text-green-300">0.2</span>
        <Info size={15} className="text-gray-300 ms-2" />
      </div>

      <div className="p-3">
        <Progress
          size="sm"
          radius="sm"
          classNames={{
            base: "max-w-md",
            track: "drop-shadow-md border border-default",
            indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
            label: "tracking-wider font-medium text-default-600",
            value: "text-foreground/60",
          }}
          label="Poor"
          value={65}
          showValueLabel={true}
        />
      </div>

      <div className="p-3">
        <DetailsTable />
      </div>

      <div className="flex justify-start gap-3 p-3">
        <Button endContent={<MoveUpRight size={15}/>}>Company</Button>
        <Button endContent={<MoveUpRight size={15}/>}>Device</Button>
        <Button endContent={<MoveUpRight size={15}/>}>Forum</Button>
      </div>

      <div className="flex justify-start gap-3 p-3">
        <Button size="sm" endContent={<SquareArrowOutUpRight size={15}/>}>Twitter</Button>
        <Button size="sm" endContent={<SquareArrowOutUpRight size={15}/>}>Website</Button>
        <Button size="sm" endContent={<SquareArrowOutUpRight size={15}/>}>Google</Button>
      </div>
    </div>
  );
}
