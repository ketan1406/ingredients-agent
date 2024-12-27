import React from "react"
import { Button } from "./ui/button"

// Each <Tab> is just a child with an id + title
export function Tabs({ children, activeTab, onTabChange }) {
  return (
    <div>
      {/* Render tab buttons */}
      <div className="flex space-x-2 mb-4">
        {React.Children.map(children, (child) => {
          const isActive = child.props.id === activeTab
          return (
            <Button
              variant={isActive ? "default" : "outline"}
              onClick={() => onTabChange(child.props.id)}
            >
              {child.props.title}
            </Button>
          )
        })}
      </div>

      {/* Render active tab’s content */}
      {React.Children.map(children, (child) => {
        if (child.props.id === activeTab) {
          return <div>{child.props.children}</div>
        }
        return null
      })}
    </div>
  )
}

export function Tab({ id, title, children }) {
  // Just a container that <Tabs> uses
  return <>{children}</>
}
