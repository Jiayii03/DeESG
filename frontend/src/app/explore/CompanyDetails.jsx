import DetailsTable from "./DetailsTable";
import { Avatar } from "@nextui-org/avatar";
import { Chip } from "@nextui-org/react";
import { Info } from "lucide-react";
import { Progress } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { MoveUpRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CompanyDetails({ selectedCompany }) {
  if (!selectedCompany) {
    return <p>Select a company to view its details.</p>;
  }

  const router = useRouter();

  return (
    <div className="flex flex-col border-e-2 p-3">
      <div className="flex justify-start items-center gap-3">
        <div>
          <Avatar src={selectedCompany.avatarUrl} size="lg" radius="sm" />
        </div>
        <div className="flex gap-2 items-center">
          <div className="text-lg font-semibold">
            <span>{selectedCompany.company_name}</span>
          </div>
          <div className="text-sm font-light text-gray-400">
            <span>ESG Score</span>
          </div>
        </div>
        <div>
          <Chip radius="sm" size="sm" startContent={<span>#</span>}>
            {selectedCompany.gtk}
          </Chip>
        </div>
      </div>

      <div className="flex mt-3 items-center p-3">
        <span className="text-4xl me-3 font-semibold">
          {selectedCompany.esg_score}
        </span>
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
          }}
          label="Low Risk"
          value={parseFloat(selectedCompany.esg_score)}
        />
      </div>

      <div className="p-3">
        <DetailsTable />
      </div>

      <div className="flex justify-start gap-3 p-3">
        <Button
          endContent={<MoveUpRight size={15} />}
          onPress={() => router.push("/company")}
        >
          Company
        </Button>
        <Button
          endContent={<MoveUpRight size={15} />}
          onPress={() => router.push("/company/devices")}
        >
          Device
        </Button>
        <Button
          endContent={<MoveUpRight size={15} />}
          onPress={() => router.push("/company/forum")}
        >
          Forum
        </Button>
      </div>

      <div className="flex justify-start gap-3 p-3">
        <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
          <Image
            src="/Logo/twitterLogo.png"
            alt="Twitter"
            width={20}
            height={20}
          />
          <span>Twitter</span>
        </button>
        <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
          <Image
            src="/Logo/websiteLogo.svg"
            alt="Website"
            width={20}
            height={20}
          />
          <span>Website</span>
        </button>
        <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
          <Image
            src="/Logo/GoogleLogo.svg"
            alt="Google"
            width={20}
            height={20}
          />
          <span>Google</span>
        </button>
      </div>
    </div>
  );
}
