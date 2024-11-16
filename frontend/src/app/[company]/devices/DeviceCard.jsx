import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { MoveLeft } from "lucide-react";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function App() {
  const router = useRouter();

  return (
    <div className="flex flex-col border-e-2 p-3 h-screen pe-6">
      <div className="flex flex-col mb-10 gap-2 justify-start">
        <div>
          <Button
            className="bg-transparent"
            startContent={<MoveLeft size={16} />}
            onPress={() => router.push("/company")}
          >
            <span>Back</span>
          </Button>
        </div>

        <div>
          <h1 className="text-4xl">Devices Dashboard</h1>
          <div className="flex justify-start items-center gap-20 mt-3">
            <span className="text-sm text-gray-400">Total devices:</span>
            <span className="text-sm text-gray-400">Total Token Rewarded:</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 justify-start items-start">
        <Card className="w-full p-2">
          <CardHeader>
            <div className="flex justify-start items-center gap-3">
              <Avatar name="device"></Avatar>
              <span className="text-semibold text-xl">DEV001</span>
            </div>
          </CardHeader>
          <CardBody>
            <div className="flex flex-col">
              <div className="flex justify-between">
                <span className="text-semibold">GTK Balance:</span>
                <span>--</span>
              </div>
              <div className="flex justify-between">
                <span className="text-semibold">Status:</span>
                <span>--</span>
              </div>
            </div>
          </CardBody>
          <CardFooter className="flex justify-end items-center">
            <span className="text-sm text-gray-400">
              Last updated few seconds ago
            </span>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
