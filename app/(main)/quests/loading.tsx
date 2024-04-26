import { Loader } from "lucide-react";

function Loading() {
  return (
    <div className="h-full w-full items-center justify-center flex ">
      <Loader className="h-6 w-6 text-muted-foreground animate-spin" />
    </div>
  );
}

export default Loading;
