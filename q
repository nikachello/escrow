[1mdiff --git a/src/app/(auth)/sign-up/page.tsx b/src/app/(auth)/sign-up/page.tsx[m
[1mnew file mode 100644[m
[1mindex 0000000..72b9cfb[m
[1m--- /dev/null[m
[1m+++ b/src/app/(auth)/sign-up/page.tsx[m
[36m@@ -0,0 +1,9 @@[m
[32m+[m[32mimport React from "react";[m
[32m+[m
[32m+[m[32mtype Props = {};[m
[32m+[m
[32m+[m[32mconst Page = (props: Props) => {[m
[32m+[m[32m  return <div>Page</div>;[m
[32m+[m[32m};[m
[32m+[m
[32m+[m[32mexport default Page;[m
[1mdiff --git a/src/middleware.ts b/src/middleware.ts[m
[1mdeleted file mode 100644[m
[1mindex 8155fe0..0000000[m
[1m--- a/src/middleware.ts[m
[1m+++ /dev/null[m
[36m@@ -1 +0,0 @@[m
[31m-export { auth as middleware } from "@/auth";[m
