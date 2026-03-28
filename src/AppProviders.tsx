import AppContextProvider from "./AppContext";
// import { NuqsAdapter } from "nuqs/adapters/react";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <NuqsAdapter> */}
              <AppContextProvider>
                  {children}
              </AppContextProvider>
      {/* </NuqsAdapter> */}
    </>
  );
}
