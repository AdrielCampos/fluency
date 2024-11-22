export function Loading() {
  return (
    <div className="fixed w-screen h-screen top-0 left-0 flex justify-center items-center z-[10000000]">
      <div className="bg-secondary-light opacity-80 w-full h-full" />
      <div className="absolute w-1/3 flex justify-center items-center gap-3">
        <div className="h-8 w-8 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
        <div className="h-8 w-8 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
        <div className="h-8 w-8 bg-primary rounded-full animate-bounce" />
      </div>
    </div>
  );
}
