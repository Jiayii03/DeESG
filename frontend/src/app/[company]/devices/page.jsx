"use client"

import { useState } from 'react'
import { Leaf, Battery, Coins } from 'lucide-react'
import { useParams } from 'next/navigation'

const Home = () => {

    const params = useParams()
    const company = params?.company

  // Mock data - replace with real data from your API/backend
  const [devices] = useState([
    { id: 'DEV001', status: 'active', tokens: 150, lastUpdated: 2000 },
    { id: 'DEV002', status: 'active', tokens: 75, lastUpdated: 2500 },
    { id: 'DEV003', status: 'pending', tokens: 200, lastUpdated: 12000 },
    { id: 'DEV004', status: 'inactive', tokens: 90, lastUpdated: 12300 },
    { id: 'DEV005', status: 'active', tokens: 180, lastUpdated: 9000 },
    { id: 'DEV006', status: 'inactive', tokens: 12, lastUpdated: 122000 },
  ])

  // Function to determine status color
  const getHealthColor = (status) => {
    if (status == 'active') return 'text-green-500'
    if (status == 'pending') return 'text-yellow-500'
    return 'text-red-500'
  }

  return (
<>
      <main className="flex flex-col py-5 gap-6 mx-12">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-black">Device Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Total Devices: {devices.length}</span>
            <span className="text-sm text-gray-600">
              Total Tokens Distributed: {devices.reduce((sum, device) => sum + device.tokens, 0)}
            </span>
          </div>
        </div>

        {/* Devices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {devices.map((device) => (
            <div 
              key={device.id} 
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200"
            >
              {/* Card Header */}
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="h-5 w-5 text-green-600" />
                <h2 className="text-lg font-semibold">Device {device.id}</h2>
              </div>

              {/* Card Content */}
              <div className="space-y-4">
                {/* Health Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Battery className="h-5 w-5" />
                    <span className="text-sm text-gray-600">Status</span>
                  </div>
                  <span className={`font-semibold uppercase ${getHealthColor(device.status)}`}>
                    {device.status}
                  </span>
                </div>

                {/* Tokens */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Coins className="h-5 w-5" />
                    <span className="text-sm text-gray-600">Tokens</span>
                  </div>
                  <span className="font-semibold text-blue-600">
                    {device.tokens}
                  </span>
                </div>

                <div className="flex items-center justify-end">
                  <div className="flex items-center">
                    <span className="text-xs text-gray-400">Last Updated {device.lastUpdated/100}s ago</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      </>
  )
}

export default Home