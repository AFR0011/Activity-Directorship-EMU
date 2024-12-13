import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ICategory } from "@/lib/database/models/category.model"
import { startTransition, useEffect, useState } from "react"
import { Input } from "../ui/input"
import { getEventCategories } from "@/lib/actions/category.actions"




type DropdownProps = {
    value?: string,
    onChangeHandler?: () => void
}

const CategoryDropDown = ({ value, onChangeHandler }: DropdownProps) => {

    const [categories, setCategories] = useState<ICategory[]>([])

    useEffect(() => {
        const getCategories = async () => {
            const categoryList = await getEventCategories();

            categoryList && setCategories(categoryList as ICategory[])
        }

        getCategories();
    }, [])

    return (
        <Select onValueChange={onChangeHandler} defaultValue={value}>
            <SelectTrigger className="select-field">
                <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
                {categories.length > 0 && categories.map((category) => (
                    <SelectItem key={category._id} value={category._id} className="select-item p-regular-14">
                        {category.title}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>

    )
}

export default CategoryDropDown
