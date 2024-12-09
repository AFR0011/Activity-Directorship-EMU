import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"



type DropdownProps = {
    value?: string,
    onChangeHandler?: () => void
}

const DropDown = ({ value, onChangeHandler }: DropdownProps) => {
    
    const [] = useState<ICategory[]>([]) //Why don't we have categories??
    return (
        <Select onValueChange={onChangeHandler} defaultValue={value}>
            <SelectTrigger className="select-field">
                <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
            </SelectContent>
        </Select>

    )
}

export default DropDown
