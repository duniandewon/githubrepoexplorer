import { Button } from '@/components/ui/button'
import { ThemeProvider } from '@/components/theme-provider'

function App() {

  return (
    <ThemeProvider defaultTheme='dark'>
      <Button disabled>Hello babay</Button>
    </ThemeProvider>
  )
}

export default App
