"use client";

import { Heading } from "@/components/heading";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { BotIcon } from "lucide-react";
import { formSchema } from "./constants";
import { FormField } from "@/components/ui/form";
import { FormControl } from "@/components/ui/form";
import { FormItem } from "@/components/ui/form";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod"; 
import { Button } from "@/components/ui/button";

console.log()
interface FormValues {
  prompt: string;
}

const ChatagentPage = () => {
  const { handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  });

  const isLoading = formState.isSubmitting;

  const onSubmit = async (values: FormValues) => {
    console.log(values);
  };

  return (
    <div>
      <Heading 
        title="AI Agent"
        description="Our most advanced conversation model."
        icon={BotIcon}
        iconColor="text-violet-500"
        bgColor="bg-black-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg border w-full 
          p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
            <FormField name="prompt" render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-10">
                <FormControl className="m-0 p-0">
                  <Input {...field} className="border-0 outline-none focus-visible:ring-0 
                  focus-visible:ring-transparent" 
                  disabled={isLoading} 
                  placeholder="How do i calculate the radius of a circle?"
                  {...field}
                  />
                
                </FormControl>

              </FormItem>
            )} />
            <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
              Generate
            </Button>
          </form>
        </div>
        <div className="space-4 mt-4">
          Messages Content
        </div>
      </div>
    </div>
  );
};

export default ChatagentPage;
