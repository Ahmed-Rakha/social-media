import { Button, HeroUIProvider } from "@heroui/react";
import { RouterProvider } from "react-router";
import { routes } from "./routes/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider>
        <RouterProvider router={routes} />
        <ReactQueryDevtools initialIsOpen={false} />
      </HeroUIProvider>
    </QueryClientProvider>
  );
}

export default App;
