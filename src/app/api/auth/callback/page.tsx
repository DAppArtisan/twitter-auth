"use client";
import React, { useEffect } from "react";
import fetchTwitter from "@/services/fetchTwitter";
import { useRouter, useSearchParams } from "next/navigation";

const Twitter = () => {
  const router = useRouter();
  const urlParams = useSearchParams();
  const code = urlParams.get("code");
  const state = urlParams.get("state");

  console.log("code", code, state);
  // Discord Data Load
  useEffect(() => {
    if (code) {
      fetchTwitter(code)
        .then((user) => {
          console.log("User data:", user);
          router.push("/");
        })
        .catch((error) => {
          router.push("/");
          console.error("Error fetching Discord data:", error);
        });
    }
  }, [code, router]);

  return <div>Twitter callback URl</div>;
};

export default Twitter;
