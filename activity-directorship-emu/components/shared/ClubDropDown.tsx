import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { IClub } from "@/lib/database/models/club.model"
import { startTransition, useEffect, useState } from "react"
import { Input } from "../ui/input"
import { getClubs } from "@/lib/actions/club.actions"




type DropdownProps = {
    value?: string,
    onChangeHandler?: () => void
}

const ClubDropDown = ({ value, onChangeHandler }: DropdownProps) => {

    const [clubs, setClubs] = useState<IClub[]>([])

    useEffect(() => {
        const getClub = async () => {
            const clubList = await getClubs();

            clubList && setClubs(clubList as IClub[])
        }

        getClub();
    }, [])

    return (
        <Select onValueChange={onChangeHandler} defaultValue={value}>
            <SelectTrigger className="select-field">
                <SelectValue placeholder="Club" />
            </SelectTrigger>
            <SelectContent>
                {clubs.length > 0 && clubs.map((club) => (
                    <SelectItem key={club._id} value={club._id} className="select-item p-regular-14">
                        {club.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>

    )
}

export default ClubDropDown
