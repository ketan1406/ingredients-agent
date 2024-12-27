import React, { useState } from "react"
import { Button } from "./ui/button"

export function NavBar() {
  // Simple dark mode toggle by toggling a class on <html> or <body>
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  )

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev)
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark")
    } else {
      document.documentElement.classList.add("dark")
    }
  }

  const handleRefresh = () => {
    window.location.reload()
  }

  const handlePrint = () => {
    window.print()
  }

  const handleAbout = () => {
    alert("Ingredient Analyzer v1.0\nCreated by YourName.")
  }

  return (
    <nav className="w-full flex items-center justify-between px-4 py-2 border-b border-border bg-primary/5">
      {/* Title or Logo */}
      <div className="font-bold text-xl">Ingredient Analyzer</div>

      {/* Right-side actions */}
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={toggleDarkMode}>
          {darkMode ? "Light" : "Dark"}
        </Button>
        <Button variant="outline" size="sm" onClick={handleRefresh}>
          Refresh
        </Button>
        <Button variant="outline" size="sm" onClick={handlePrint}>
          Print
        </Button>
        <Button variant="outline" size="sm" onClick={handleAbout}>
          About
        </Button>
      </div>
    </nav>
  )
}
