"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import CompanyDetails from './CompanyDetails';
import DetailsTable from './DetailsTable';  
import { Button } from "@nextui-org/react";
import { Search } from "lucide-react";

const CompanyPage = () => {
  const pathname = usePathname(); // Get the current path
  const company = pathname.split('/')[1]; // Extract the company name from the path

  return (
    <main className='min-h-screen[90vh]'>
      {/* Main Content Section */}
      <div className="flex p-8 gap-3">
        {/* Sidebar Section */}
        <div className="basis-4/12">
          <CompanyDetails companyName={company}/>
        </div>

        {/* Main Content Section */}
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
              {/* Evaluate esg score and add devices */}
                
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CompanyPage;
