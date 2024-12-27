// cli/src/App.jsx
import React, { useState } from 'react'
import axios from 'axios'
import { Button } from './components/ui/button'
import { NavBar } from "./components/NavBar"
import { Tabs, Tab } from "./components/Tabs"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './components/ui/card'
import ReactMarkdown from "react-markdown"

function App() {
  const [activeTab, setActiveTab] = useState("upload")
  const [file, setFile] = useState(null)
  const [analysis, setAnalysis] = useState('')

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleAnalyze = async () => {
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await axios.post(
        'http://localhost:8000/analyze',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )
      setAnalysis(response.data.content)
    } catch (err) {
      console.error(err)
      setAnalysis('Error analyzing image')
    }
  }

  const handleCapture = () => {
    console.log("Camera capture logic goes here!")
  }


  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      {/* Top Navbar */}
      <NavBar />

      {/* Main Content - Tabs */}
      <div className="p-4 flex-1 flex flex-col">
        <Tabs activeTab={activeTab} onTabChange={setActiveTab}>
          <Tab id="upload" title="Upload Image">
            <div className="flex flex-col md:flex-row gap-6">
              {/* LEFT SIDE: Image + Upload + Analyze button */}
              <div className="md:w-1/2 flex flex-col items-center gap-4">
                {/* File Input */}
                <label className="block text-center">
                  <span className="text-sm font-medium mb-1">Choose file</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block mt-1"
                  />
                </label>

                {/* Show selected file name or preview */}
                {file && (
                  <p className="text-sm text-muted-foreground">
                    {file.name}
                  </p>
                )}

                {/* Analyze Button */}
                <Button onClick={handleAnalyze}>Analyze</Button>
              </div>

              {/* RIGHT SIDE: Analysis Result in a Card */}
              <div className="md:w-1/2">
                <Card className="p-4 h-full">
                  {analysis ? (
                    <ReactMarkdown>{analysis}</ReactMarkdown>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Upload an image of ingredients to analyze
                    </p>
                  )}
                </Card>
              </div>
            </div>
          </Tab>

          <Tab id="capture" title="Take Photo">
            <div className="flex flex-col md:flex-row gap-6">
              {/* LEFT SIDE: camera input + analyze button */}
              <div className="md:w-1/2 flex flex-col items-center gap-4">
                {/* Insert your camera capture logic here, e.g. 
                    if using a library or a <video> element */}
                <Button onClick={handleCapture}>Capture Photo</Button>
              </div>

              {/* RIGHT SIDE: Analysis */}
              <div className="md:w-1/2">
                <Card className="markdown-body">
                  {analysis ? (
                    <div>{analysis}</div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Capture a photo of ingredients to analyze
                    </p>
                  )}
                </Card>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}

export default App