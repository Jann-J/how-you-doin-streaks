import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState("query");
  return (
    <Tabs defaultValue="query" onValueChange={setActiveTab} className="w-full">
      {/* Tab Buttons */}
      <TabsList className="flex justify-start space-x-4">
        <TabsTrigger value="query">SQL Editor</TabsTrigger>
        <TabsTrigger value="executionPlan">Execution Plan</TabsTrigger>
        <TabsTrigger value="performance">Performance</TabsTrigger>
      </TabsList>

      {/* Tab Content */}
      <TabsContent value="query">
        <div>📝 SQL Editor (Monaco)</div>
      </TabsContent>
      <TabsContent value="executionPlan">
        <div>📊 Execution Plan Visualization</div>
      </TabsContent>
      <TabsContent value="performance">
        <div>⚡ Performance Insights</div>
      </TabsContent>
    </Tabs>
  )
}

export default App
