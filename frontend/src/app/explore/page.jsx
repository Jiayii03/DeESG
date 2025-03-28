"use client";

import CompanyTable from "./CompanyTable";
import CompanyDetails from "./CompanyDetails";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";

const Explore = () => {
  const router = useRouter();
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleAddCompanyClick = () => {
    if (isConnected) {
      router.push("/add-company");
    } else {
      openConnectModal();
    }
  };

  return (
    <main>
      <div className="flex p-8 gap-3">
        <div className="basis-4/12">
          <CompanyDetails selectedCompany={selectedCompany} />
        </div>

        <div className="basis-8/12">
          <div className="flex flex-col justify-start">
            <div>
              <div className="flex mb-3 justify-between items-center">
                <Button
                  size="sm"
                  onPress={handleAddCompanyClick}
                  className="py-4 px-6"
                >
                  <span>Add your company</span>
                </Button>
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
              <CompanyTable onRowClick={setSelectedCompany} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Explore;
