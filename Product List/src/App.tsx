import { Input } from './components/ui/input'
import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card"
import {DropdownMenu,DropdownMenuCheckboxItem,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import "../app/globals.css"
import React from 'react';
import ProductPage from './Products/page'

const App: React.FC = () => {
    return (
    <div className='flex w-screen justify-center items-center'>
      <ProductPage/>
    </div>

  )
}

export default App
