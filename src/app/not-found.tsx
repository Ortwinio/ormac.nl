import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-background px-5 pt-24 text-center">
      <p className="text-[0.72rem] tracking-[0.22em] text-muted-foreground uppercase">
        404
      </p>
      <h1 className="font-heading mt-4 text-4xl tracking-tight">
        This page is not on the map.
      </h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        The address does not match a page on ormac.nl. Head home, or write to
        us if you were looking for something specific.
      </p>
      <Button
        nativeButton={false}
        render={<Link href="/" />}
        className="mt-8 h-10 rounded-full px-5 tracking-[0.12em] uppercase"
      >
        Back to home
      </Button>
    </div>
  );
}
