// src/components/shared/ThemeToggle.jsx
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Moon, Sun } from 'lucide-react'

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  )

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="rounded-full">
          {isDark ? <Moon size={18} /> : <Sun size={18} />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 flex flex-col gap-2">
        <Button
          variant="ghost"
          onClick={() => setIsDark(false)}
        >
          ☀️ Light
        </Button>
        <Button
          variant="ghost"
          onClick={() => setIsDark(true)}
        >
          🌙 Dark
        </Button>
      </PopoverContent>
    </Popover>
  )
}

export default ThemeToggle
