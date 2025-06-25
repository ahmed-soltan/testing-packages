"use client";

import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Menubar } from "./menubar";

export const Editor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }),
    ],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "border h-[200px] p-2 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent prose sm:prose lg:prose-lg prose-invert",
      },
    },
    content: "<p>Hello World! 🌎️</p>",
  });
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-2">
      <Menubar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
