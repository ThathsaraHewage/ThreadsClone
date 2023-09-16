"use client";

import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import { z } from "zod";

import { userValidation } from "@/lib/validations/user";
import { UserProfileProps } from "@/utils/interfaces";
import { isBase64Image, useUploadThing } from "@/utils/service";

const UserProfile = ({ user, btnTitle }: UserProfileProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("media");

  const form = useForm<z.infer<typeof userValidation>>({
    resolver: zodResolver(userValidation),
    defaultValues: {
      profilepic: user?.image ? user.image : "",
      name: user?.name ? user.name : "",
      username: user?.username ? user.username : "",
      bio: user?.bio ? user.bio : "",
    },
  });

  // handle upload image
  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) {
        return;
      }

      fileReader.onload = async (e) => {
        const imageData = e.target?.result?.toString() || "";
        fieldChange(imageData);
      };
      fileReader.readAsDataURL(file);
    }
  };

  // on submit handle
  const onSubmit = async (values: z.infer<typeof userValidation>) => {
    const blob = values.profilepic;

    const hasImagedChanged = isBase64Image(blob);

    if (hasImagedChanged) {
      const imageResult = await startUpload(files);

      // ! check here
      if (imageResult && imageResult[0].url) {
        values.profilepic = imageResult[0].url;
      }
    }

    // update user data

    // routes
    if (pathname === "/profile/edit") {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="profilepic"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="account-form_image-label">
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="profile_icon"
                    width={96}
                    height={96}
                    priority
                    className="rounded-full object-contain"
                  />
                ) : (
                  <Image
                    src="/assets/profile.svg"
                    alt="profile_icon"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                )}
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Add profile photo"
                  className="account-form_image-input"
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Name
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Username
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Bio
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={10}
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-primary-500">
          {btnTitle}
        </Button>
      </form>
    </Form>
  );
};

export default UserProfile;
