import { Avatar } from "@nextui-org/react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import { User } from "@nextui-org/user";

export default function App() {
  return (
    <div className="flex flex-col border-e-2 p-3 h-screen pe-6 gap-5">
      <div className="flex gap-5 items-center">
        <Avatar name="test" className="w-20 h-20"></Avatar>
        <span className="font-semibold text-2xl">Company Name</span>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-400">
        <span>Total Posts:</span>
        <span>Total Upvotes:</span>
        <span>Total Downvotes:</span>
      </div>

      <Divider />

      <div className="flex flex-col gap-3">
        <div className="flex justify-start items-center">
          <User
            name="..."
            description="..."
          />
        </div>

        <div className="flex items-center justify-center">
          <Textarea
            variant="bordered"
            placeholder="write something..."
            className="w-full"
          />
        </div>

        <div className="flex justify-end items-center">
          <Button size="sm">Post</Button>
        </div>
      </div>
    </div>
  );
}
