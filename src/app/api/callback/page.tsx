// "use client";
// import React, { useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import FetchTwitter from "@/services/fetchTwitter"
// const discord = () => {
//   const router = useRouter();
//   const urlParams = useSearchParams();
//   const code = urlParams.get("code");
//   const state =urlParams.get("state")
//   // Discord Data Load
//   useEffect(() => {
//     if (code) {
//       FetchTwitter(code)
//         .then((user) => {
//             .then((res) => {

//             })
//             .catch((err) => {
//               throw err;
//             });

//           console.log("User data:", user);
//           router.push("/settings");
//         })
//         .catch((error) => {

//           router.push("/");
//           console.error("Error fetching Discord data:", error);
//         });
//     }
//   }, [code, router]);

//   return <div>discord</div>;
// };

// export default discord;
