// components/Footer.tsx
import {Crown} from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">CareDuel</h3>
            <p className="text-gray-400 mt-2">Smart Healthcare Fair Pricing</p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-gray-400 flex items-center justify-center md:justify-end gap-2">
              <span>Part of the</span>
              <Crown className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 font-semibold">Crowbar Connected Network</span>
            </p>
            <p className="text-gray-500 text-sm mt-2">
              © 2024 CareDuel. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}