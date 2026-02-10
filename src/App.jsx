import './App.css'
import Pages from "@/pages/index.jsx"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/contexts/AuthContext"

function App() {
  return (
    <>
      <AuthProvider>
        <Pages />
      </AuthProvider>
      <Toaster />
    </>
  )
}

export default App 