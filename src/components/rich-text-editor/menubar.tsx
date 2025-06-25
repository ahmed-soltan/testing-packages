import { cn } from "@/lib/utils";
import { type Editor } from "@tiptap/react";
import {
  AlignCenter,
  AlignLeft,
  Bold,
  Italic,
  ListOrdered,
} from "lucide-react";
import { Button } from "../ui/button";
import { Toggle } from "../ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface MenubarProps {
  editor: Editor | null;
}

export const Menubar = ({ editor }: MenubarProps) => {
  if (!editor) {
    return null;
  }
  return (
    <div className="border border-input border-t-lg p-2 bg-card flex flex-wrap gap-1 items-center">
      <TooltipProvider>
        <div className="flex items-center gap-1 flex-wrap">
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                pressed={editor.isActive("bold")}
                onPressedChange={() =>
                  editor.chain().focus().toggleBold().run()
                }
                size={"sm"}
                className={cn(editor.isActive("bold") && "bg-black text-white")}
              >
                <Bold />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Bold</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                pressed={editor.isActive("italic")}
                onPressedChange={() =>
                  editor.chain().focus().toggleItalic().run()
                }
                size={"sm"}
                className={cn(
                  editor.isActive("italic") && "bg-black text-white",
                )}
              >
                <Italic />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Italic</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                pressed={editor.isActive("bulletList")}
                onPressedChange={() =>
                  editor.chain().focus().toggleBulletList().run()
                }
                size={"sm"}
                className={cn(
                  editor.isActive("bulletList") && "bg-black text-white",
                )}
              >
                <ListOrdered />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Bullet List</TooltipContent>
          </Tooltip>
        </div>
        <div className="w-px h-6 bg-border px-2"></div>
        <div className="flex flex-wrap gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                pressed={editor.isActive("textAlign", { textAlign: "left" })}
                onPressedChange={() =>
                  editor.chain().focus().setTextAlign("left").run()
                }
                size={"sm"}
                className={cn(
                  editor.isActive("textAlign", { textAlign: "left" }) &&
                    "bg-black text-white",
                )}
              >
                <AlignLeft />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Left Align</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                pressed={editor.isActive("textAlign", { textAlign: "center" })}
                onPressedChange={() =>
                  editor.chain().focus().setTextAlign("center").run()
                }
                size={"sm"}
                className={cn(
                  editor.isActive("textAlign", { textAlign: "center" }) &&
                    "bg-black text-white",
                )}
              >
                <AlignCenter />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Center Align</TooltipContent>
          </Tooltip>
        </div>
        <div className="w-px h-6 bg-border px-2"></div>
        <div className="flex flex-wrap gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"ghost"}
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
              >
                undo
              </Button>
            </TooltipTrigger>
            <TooltipContent>Undo</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"ghost"}
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
              >
                redo
              </Button>
            </TooltipTrigger>
            <TooltipContent>redo</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
};
