"use client";
import React, { useEffect, useRef, useCallback } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Color from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import FontSize from "@tiptap/extension-font-size";
import { TextStyle } from "@tiptap/extension-text-style";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import CodeBlock from "@tiptap/extension-code-block";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";

const fontFamilies = [
  { label: "Arial", value: "Arial" },
  { label: "Times New Roman", value: "Times New Roman" },
  { label: "Courier New", value: "Courier New" },
  { label: "Tahoma", value: "Tahoma" },
];
const fontSizes = ["12px", "14px", "16px", "18px", "24px", "32px"];

export default function TipTapEditor({
  value,
  onChange,
  placeholder = "Start writing...",
  dir = "ltr",
  imageUploadHandler,
}) {
  // ✅ Track whether the last HTML change came from the editor itself
  const isInternalChange = useRef(false);

  const handleUpdate = useCallback(
    ({ editor }) => {
      isInternalChange.current = true; // mark as internal before calling onChange
      onChange(editor.getHTML());
    },
    [onChange],
  );

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Strike,
      Color,
      TextStyle,
      FontFamily,
      FontSize,
      Link.configure({ openOnClick: false }),
      Image.configure({ inline: false, allowBase64: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      CodeBlock,
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class: `min-h-[200px] bg-white/5 border border-white/10 rounded-xl text-white px-4 py-3 focus:outline-none transition-all prose prose-invert ${
          dir === "rtl" ? "text-right" : ""
        }`,
        dir,
        placeholder,
      },
    },
    onUpdate: handleUpdate,
    immediatelyRender: false,
  });

  // ✅ Only sync external value changes into the editor (e.g. loading a different article)
  // Skip if the change was triggered by the editor itself to prevent cursor jumping
  useEffect(() => {
    if (!editor) return;

    if (isInternalChange.current) {
      // This update came from the editor — don't re-set content
      isInternalChange.current = false;
      return;
    }

    // External change (e.g. parent loaded a different article)
    const currentHTML = editor.getHTML();
    if (value !== currentHTML) {
      // Preserve cursor position where possible
      editor.commands.setContent(value || "", false);
    }
  }, [value, editor]);

  if (!editor)
    return (
      <div className="min-h-[200px] bg-white/5 border border-white/10 rounded-xl text-white px-4 py-3">
        Loading editor...
      </div>
    );

  const setFontFamily = (family) =>
    editor.chain().focus().setFontFamily(family).run();
  const setFontSize = (size) => editor.chain().focus().setFontSize(size).run();

  const insertImage = async () => {
    if (!imageUploadHandler) return;
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        const url = await imageUploadHandler(file);
        if (url) editor.chain().focus().setImage({ src: url }).run();
      }
    };
    fileInput.click();
  };

  return (
    <div className="w-full">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 mb-2 bg-[#0a0f1e] border border-white/10 rounded-xl px-3 py-2">
        <select
          className="bg-transparent text-white/80 border border-white/20 rounded px-2 py-1"
          onChange={(e) => setFontFamily(e.target.value)}
          defaultValue=""
        >
          <option value="">Font Family</option>
          {fontFamilies.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
        <select
          className="bg-transparent text-white/80 border border-white/20 rounded px-2 py-1"
          onChange={(e) => setFontSize(e.target.value)}
          defaultValue=""
        >
          <option value="">Font Size</option>
          {fontSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="text-sky-400 font-bold px-2"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="text-sky-400 italic px-2"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className="text-sky-400 underline px-2"
        >
          U
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className="text-sky-400 line-through px-2"
        >
          S
        </button>
        <input
          type="color"
          className="w-6 h-6 cursor-pointer"
          onChange={(e) =>
            editor.chain().focus().setColor(e.target.value).run()
          }
        />
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className="px-2 text-white/70 hover:text-white"
        >
          H1
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className="px-2 text-white/70 hover:text-white"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className="px-2 text-white/70 hover:text-white"
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="px-2"
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className="px-2"
        >
          1. List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className="px-2"
        >
          ❝
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className="px-2"
        >
          {"</>"}
        </button>
        <button
          type="button"
          onClick={() => {
            const url = prompt("Enter URL");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          className="px-2"
        >
          🔗
        </button>
        <button type="button" onClick={insertImage} className="px-2">
          🖼️
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className="px-2"
        >
          ⬅️
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className="px-2"
        >
          ⬆️
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className="px-2"
        >
          ➡️
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className="px-2"
        >
          ⏹️
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="px-2"
        >
          ↺
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="px-2"
        >
          ↻
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
