import * as React from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

export function DrawerDialog({
  trigger,
  children,
  open,
  setOpen,
}: {
  trigger?: React.ReactNode;
  children: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
        <DialogContent className="w-[500px] max-w-[600px] max-h-[70%] h-auto items-center overflow-y-scroll">
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
      <DrawerContent className="p-4">{children}</DrawerContent>
    </Drawer>
  );
}
