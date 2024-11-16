import { Button } from "@nextui-org/react";
import { Search } from "lucide-react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function App() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center p-3">
        <div>
          <span className="font-semibold text-2xl">All posts</span>
        </div>
        <Button
          size="md"
          radius="full"
          startContent={<Search size={16} color="gray" />}
          endContent={
            <span className="text-gray-400 ms-8 text-sm">Ctrl K</span>
          }
          className="text-gray-400 bg-gray-200 px-7 py-2"
        >
          <span className="font-sm">Search...</span>
        </Button>
      </div>

      <div className="flex justify-between items-center gap-3">
        <Card className="border-r-4 border-b-4 rounded-2xl w-1/2 border-[#75bfc9]">
          <CardBody className="rounded-xl">
            <div className="flex gap-3">
              <div className="basis-1/12">
                <div className="flex flex-col items-center justify-center">
                  <Button isIconOnly className="bg-white">
                    <i
                      className="bi bi-caret-up-fill text-green-300 me-1"
                      style={{ fontSize: "1.5rem" }}
                    ></i>
                  </Button>
                  <span className="text-sm font-semibold text-green-300">100</span>
                  <span className="text-sm font-semibold text-red-300">100</span>
                  <Button isIconOnly className="bg-white">
                    <i
                      className="bi bi-caret-down-fill text-red-300 me-1"
                      style={{ fontSize: "1.5rem" }}
                    ></i>
                  </Button>
                </div>
              </div>
              <div className="basis-11/12">
                <span>this is fun</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
