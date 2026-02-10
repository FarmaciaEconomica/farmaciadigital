import './App.css'
import Pages from "@/pages/index.jsx"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/contexts/AuthContext"
import ThemeProvider from "@/components/pharmacy/ThemeProvider"

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Pages />
      </AuthProvider>
      <Toaster />
    </ThemeProvider>
  )
}

export default App
