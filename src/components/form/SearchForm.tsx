"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  Forsmescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";

const searchFormSchema = z.object({
  location: z.string({
    required_error: "Location is required",
  }),
  startDate: z.string({
    required_error: "End date is required",
  }),
  endDate: z.string({
    required_error: "End date is required",
  }),
  numAdults: z.string({
    required_error: "Number of adults is required",
  }),
  numChildren: z.string(),
});

export default function SearchForm() {
  const form = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
  });

  function onSubmit(values: z.infer<typeof searchFormSchema>) {
    alert(
      `You have entered the following details: \n\n ${JSON.stringify(
        values
      )} \n\n redirecting you now to airbnb to double check available places to book!`
    );

    window.open("https://www.airbnb.com/", "_blank");
  }

  return (
    <Card className="w-full h-fit z-10 mx-4 mt-[60px] px-4 py-6 sm:w-[442px] sm:m-0 sm:ml-[24px] sm:p-8 md:ml-[10%]">
      <CardContent className="p-0">
        <Image
          src="/assets/homeglobe_logo.svg"
          width={177}
          height={28}
          className="mb-6"
          alt="HomeGlobe Logo"
        />
        <h2 className="font-bold text-xl sm:text-2xl mb-3">
          Find places to stay anywhere
        </h2>
        <p className="mb-3 text-[#4B5563] text-sm">
          Discover entire homes and rooms perfect for any trip or special
          occasion.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      className="text-sm hover:bg-red"
                      placeholder="Anywhere"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>From</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"secondary"}
                            className={cn(
                              "block w-full pl-3 text-sm text-left text-[#4B5563] font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span className="text-[#4B5563]">Add date</span>
                            )}
                            {/* <CalendarIcon className="ml-auto h-4 w-4 opacity-50" /> */}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={new Date(field.value)}
                          onSelect={(e) => field.onChange(e!.toString())}
                          disabled={(date) =>
                            date < new Date() ||
                            date > new Date(form.getValues("endDate"))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>To</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"secondary"}
                            className={cn(
                              "block w-full pl-3 text-sm text-left text-[#4B5563] font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span className="text-[#4B5563]">Add date</span>
                            )}
                            {/* <CalendarIcon className="ml-auto h-4 w-4 opacity-50" /> */}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={new Date(field.value)}
                          onSelect={(e) => field.onChange(e!.toString())}
                          disabled={(date) =>
                            date < new Date(form.getValues("startDate"))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="numAdults"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adults</FormLabel>
                    <FormControl>
                      <Input
                        className="text-sm"
                        type="number"
                        placeholder="1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="numChildren"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Children</FormLabel>
                    <FormControl>
                      <Input
                        className="text-sm"
                        type="number"
                        placeholder="0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="w-full h-[48px] bg-violet-500 hover:bg-[#5C27E5] active:bg-[#5C27E5] focus:outline-none focus:ring focus:ring-[#AF72FF]"
            >
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
