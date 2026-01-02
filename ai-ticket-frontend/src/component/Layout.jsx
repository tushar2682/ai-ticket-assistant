import React from "react";
import Navbar from "./Navbar";

/**
 * Page shell that renders a persistent Navbar and wraps provided content in a responsive main container.
 *
 * @param {Object} props
 * @param {import('react').ReactNode} props.children - Content to render inside the layout's main area.
 * @returns {JSX.Element} The layout element containing the Navbar and the centered, padded main region.
 */
function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}

export default Layout;
