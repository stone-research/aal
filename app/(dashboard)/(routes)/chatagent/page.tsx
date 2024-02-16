"use client";

import React, { useState } from "react";
import axios from "axios";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Heading } from "@/components/heading";
import { BotIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormControl, FormItem } from "@/components/ui/form";
import { formSchema } from "./constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

// Define the type for ChatCompletionRequestMessage
type ChatCompletionRequestMessage = {
  role: string;
  content: string;
};

const ChatagentPage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

  // Define the form using react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  // Function to handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];

      // Make a POST request to the API
      const response = await axios.post("/api/chatagent", {
        messages: newMessages,
      });

      // Update messages state with the response data
      setMessages((current) => [...current, userMessage, response.data]);

      // Reset the form after submission
      form.reset(); 
    } catch (error: any) {
      console.log(error);
      // TODO: Handle error
    }
  };

  // Render the UI
  return (
    <div>
      <Heading
        title="AI Agent"
        description="Discover powerful tools enhanced by GPTs & other large language models."
        icon={BotIcon}
        iconColor="text-violet-500"
        bgColor="bg-black-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="
                        rounded-lg
                        border
                        w-full
                        p-4
                        px-3
                        md:px-6
                        focus-within:shadow-sm
                        grid
                        grid-cols-12
                        gap-2
                    "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none 
                                    focus-visible:ring-0
                                    focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="How many streets are on Planet Earth?"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                GENERATE
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message, index) => (
              <div key={index}>
                {message.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatagentPage;
