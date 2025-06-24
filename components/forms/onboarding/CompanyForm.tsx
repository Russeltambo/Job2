import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { companySchema } from "@/app/utils/ZodSchemas";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countryList } from "@/app/utils/CountriesList";
import { Textarea } from "@/components/ui/textarea";
import { UploadDropzone } from "@/components/general/UploadThingReexported";
import { create } from "domain";
import { createCompany } from "@/app/actions";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";


export function CompanyForm() {

    const form = useForm<z.infer<typeof companySchema>>({
        resolver: zodResolver(companySchema),
        defaultValues: {
            about: "",
            location: "",
            logo: "",
            name: "",
            website: "",
            xAccount: "",
        },
    });

    const [pending, setPending] = useState(false);

    async function onSubmit(data: z.infer<typeof companySchema>) {
      try {
        setPending(true);
        await createCompany(data);
      } catch (error) {
        if(error instanceof Error && error.message !== "NEXT_REDIRECT") {
          console.log("something went wrong");
        }
      } finally {
        setPending(false);
      }
    }

    return (
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Company Name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Location</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>WorldWide</SelectLabel>
                        <SelectItem value="worldwide">
                          <span>🌍</span> <span>WorldWide / Remote</span>
                        </SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Location</SelectLabel>
                        {countryList.map((country) => (
                          <SelectItem key={country.code} value={country.name}>
                            <span>{country.flagEmoji}</span>
                            <span className="pl-2">{country.name}</span>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder="https://your-company.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="xAccount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>X (Twitter) Account</FormLabel>
                  <FormControl>
                    <Input placeholder="@yourcompany" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your company..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Logo</FormLabel>
                <FormControl>
                  <div>
                    {field.value ? (
                      <div className="relative w-fit">
                        <Image 
                          src={field.value}
                          alt="Company Logo"
                          width={100}
                          height={100}
                          className="rounded-lg"/>
                      </div>
                    ) : (
                      <UploadDropzone
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          field.onChange(res[0].url);
                        }}
                        onUploadError={() => {
                          console.log("something went wrong");
                        }}
                        className="ut-button:bg-primary ut-button:text-white
                   ut-button:hover:bg-primary/90 ut-label:text-muted-foreground
                   ut-allowed-content:text-muted-foreground border-primary"
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Submitting..." : "Continue"}
          </Button>
        </form>
      </Form>
    );
}