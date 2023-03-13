import React from 'react'

export default function NavBtn({Icon, Text}) {
  return (
    <button className="flex items-center gap-1 text-gray-100">
        <Icon className="text-xl text-gray-50" />
        <p className="text-lg font-medium">{Text}</p>
      </button>
  )
}
