"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ModeToggle } from "@/components/ui/ModeToggle";

export default function profile() {
  const router = useRouter();
  const Logout = async () => {
    const response = axios.get("/api/logout");
    toast.success("LogOut ");
    console.log(response);
    router.push("/login");
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <ModeToggle />
      <h1 className="text-2xl">Profile</h1>
      <hr />
      <h1 className="text-2xl">Profile Page</h1>
      <button
        onClick={Logout}
        className="m-2 rounded-lg bg-slate-100 p-2 text-black font-semibold text-1xl"
      >
        Log-Out
      </button>

      <AlertDialog>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
