import CompanyTable from "./CompanyTable";
import CompanyDetails from "./CompanyDetails";
import { Button } from "@nextui-org/react";
import { Search } from "lucide-react";

const Explore = () => {
  return (
    <main>
      <div className="flex p-8 gap-3">
        <div className="basis-4/12">
          <CompanyDetails />
        </div>

        <div className="basis-8/12">
          <div className="flex flex-col justify-start">
            <div>
              <div className="flex mb-3 justify-end">
                <Button
                  size="md"
                  radius="full"
                  startContent={<Search size={16} color="gray" />} 
                  endContent={<span className="text-gray-400 ms-8">Ctrl K</span>}
                  className="text-gray-400 bg-gray-100"
                >
                  <span className="font-medium">Search...</span>
                </Button>
              </div>
              <CompanyTable />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Explore;
