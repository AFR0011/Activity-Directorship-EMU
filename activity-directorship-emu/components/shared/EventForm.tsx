"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { eventFormSchema } from "@/lib/validator"
import { eventDefaultValues } from "@/constants"
import CategoryDropDown from "./CategoryDropdown"
import { Textarea } from "../ui/textarea"
import FileUploader from "./FileUploader"
import { useState } from "react"
import Image from "next/image"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "@/components/ui/checkbox"
import { useUploadThing } from '@/lib/uploadthing'
import { useRouter } from "next/navigation"
import { createEvent, updateEvent } from "@/lib/actions/event.actions"
import ClubDropDown from "./ClubDropDown"
import { IEvent } from "@/lib/database/models/event.model"


type EventFormProps = {
  userId: string
  type: "Create" | "Update"
  event?: IEvent,
  eventId?: string
}

const EventForm = ({ userId, type, event, eventId }: EventFormProps) => {

  const [files, setFiles] = useState<File[]>([]) // Didn't we have startDateTime and endDateTime?? (Line Below)
  const initialValues = event && type === 'Update' ? {...event, startDateTime: new Date(event.startDateTime), endDateTime: new Date(event.endDateTime)} : eventDefaultValues; 
  const { startUpload } = useUploadThing('imageUploader')
  const router = useRouter()


  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues
  })

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    const eventData = values;
    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files)

      if (!uploadedImages) {
        return
      }

      uploadedImageUrl = uploadedImages[0].url
    }

    if (type === 'Create') {
      try {
        const newEvent = await createEvent({ ...values })

        if (newEvent) {
          form.reset();
          router.push(`/events/${newEvent._id}`)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  if (type === 'Update') {
    if(!eventId) {
      router.back();
      return;
    }

    try {
      const updatedEvent = await updateEvent({ ...values, imageUrl: uploadedImageUrl, _id: eventId path: `/events/${eventId}`})

      if (updatedEvent) { // "updateEvent" is not the same as "updatedEvent"; BE CAREFUL IF MODIFYING THIS
        form.reset();
        router.push(`/events/${updatedEvent._id}`)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Event Title" {...field} className="input-field" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <CategoryDropDown onChangeHandler={field.onChange} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="clubId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <ClubDropDown onChangeHandler={field.onChange} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea placeholder="Description" {...field} className="text-area rounded-2xl" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <FileUploader onFieldChange={field.onChange} imageUrl={field.value} setFiles={setFiles} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                    <Image src="/assets/icons/location-grey.svg" alt="Calendar" width={24} height={24} />
                    <Input placeholder="Event Location (or Online)" {...field} className="input-field" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                    <Image src="/assets/icons/calendar.svg" alt="Calendar" width={24} height={24} className="filter-grey " />
                    <p className="ml-3 whitespace-nowrap text-gray-500">Start Date:</p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date | null) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat="dd/MM/yyyy h:mm aa"
                      wrapperClassName="datePicker"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                    <Image src="/assets/icons/calendar.svg" alt="Calendar" width={24} height={24} className="filter-grey " />
                    <p className="ml-3 whitespace-nowrap text-gray-500">End Date:</p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date | null) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat="dd/MM/yyyy h:mm aa"
                      wrapperClassName="datePicker"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                    <Image src="/assets/icons/dollar.svg" alt="Dollar Sign" width={24} height={24} className="filter-grey " />
                    <Input type="number" placeholder="Price" {...field} className="p-regular-16 border-0 bg-gray-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
                    <FormField
                      control={form.control}
                      name="isFree"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex items-center">
                              <label htmlFor="isFree" className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Free Ticket</label>
                              <Checkbox onCheckedChange={field.onChange} checked={field.value} id="isFree" className="mr-2 h-5 w-5 border-2 border-primary-500" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="resources"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                    <Image src="/assets/icons/link.svg" alt="Calendar" width={24} height={24} />
                    <Input placeholder="URL" {...field} className="input-field" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" size="lg" disabled={form.formState.isSubmitting} className="button col-span-2 w-full">{form.formState.isSubmitting ? ('Submitting') : `${type} Event `}</Button>
      </form>
    </Form>
  )
}

export default EventForm

//TODO: CHECK ALL THE VALUES IN FORM SCHEMA TO MAKE SURE ALL THE NAMES FOR INPUT FIELDS MATCH THEM
//Also after addressing every matter of importance here, check if it updates DB