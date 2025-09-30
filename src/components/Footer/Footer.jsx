import React from 'react'

export const Footer = () => {
  return (
    <div className="footer-container text-gray-600 bg-footer-light border-t border-gray-300 flex flex-col items-center justify-center py-4">
      <div className="text-sm">
        <a href="#api-doc" className="hover:underline text-marine-blue">
          Api Documentation
        </a>{" "}
        |{" "}
        <a href="#contacts" className="hover:underline text-marine-blue">
          Contacts
        </a>
      </div>
      <div className="text-xs mt-1">2025 DeepSea Drive</div>
    </div>
  )
}