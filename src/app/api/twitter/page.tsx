"use client";
import React, { useEffect } from "react";
import fetchTwitter from "@/src/services/twitterfetch";
import { useSearchParams } from "next/navigation";
const Twitter = () => {
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
        })
        .catch((error) => {
          console.error("Error fetching Discord data:", error);
        });
    }
  }, [code]);

  return <div>discord</div>;
};

export default Twitter;
