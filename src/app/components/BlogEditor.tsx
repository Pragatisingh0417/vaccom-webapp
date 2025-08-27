"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Blockquote from "@tiptap/extension-blockquote";
import CodeBlock from "@tiptap/extension-code-block";

// MUI Components
import { IconButton, Tooltip, Select, MenuItem } from "@mui/material";
import FormatBold from "@mui/icons-material/FormatBold";
import FormatItalic from "@mui/icons-material/FormatItalic";
import FormatUnderlined from "@mui/icons-material/FormatUnderlined";
import FormatListBulleted from "@mui/icons-material/FormatListBulleted";
import FormatListNumbered from "@mui/icons-material/FormatListNumbered";
import FormatQuote from "@mui/icons-material/FormatQuote";
import Code from "@mui/icons-material/Code";
import Undo from "@mui/icons-material/Undo";
import Redo from "@mui/icons-material/Redo";
import ImageIcon from "@mui/icons-material/Image";
import LinkIcon from "@mui/icons-material/Link";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface BlogEditorProps {
  value: string;
  onChange: (val: string) => void;
}

export default function BlogEditor({ value, onChange }: BlogEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit, // includes Paragraph, Heading, BulletList, OrderedList, ListItem
      Underline,
      Link,
      Image,
      Blockquote,
      CodeBlock,
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
      immediatelyRender: false, // ✅ prevents SSR hydration mismatch

    editorProps: {
      attributes: {
        class: "prose max-w-none min-h-[400px] p-2 focus:outline-none",
      },
    },
    autofocus: true,
  });

  if (!editor) return null;

  // ✅ Heading / Paragraph handler
  const handleHeadingChange = (level: HeadingLevel | "paragraph") => {
    if (!editor) return;

    if (level === "paragraph") {
      editor.chain().focus().setParagraph().run();
    } else {
      editor.chain().focus().toggleHeading({ level }).run();
    }
  };

  return (
    <div className="border rounded-lg p-3 space-y-3 bg-white shadow-md">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b pb-2">
        {/* Paragraph / H1-H6 dropdown */}
        <Select
          size="small"
          value={editor.isActive("heading") ? editor.getAttributes("heading").level : "paragraph"}
          onChange={(e) =>
            handleHeadingChange(
              e.target.value as HeadingLevel | "paragraph"
            )
          }
        >
          <MenuItem value="paragraph">Paragraph</MenuItem>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <MenuItem key={n} value={n as HeadingLevel}>
              H{n}
            </MenuItem>
          ))}
        </Select>

        {/* Text formatting */}
        <Tooltip title="Bold">
          <IconButton onClick={() => editor.chain().focus().toggleBold().run()} color={editor.isActive("bold") ? "primary" : "default"}>
            <FormatBold />
          </IconButton>
        </Tooltip>

        <Tooltip title="Italic">
          <IconButton onClick={() => editor.chain().focus().toggleItalic().run()} color={editor.isActive("italic") ? "primary" : "default"}>
            <FormatItalic />
          </IconButton>
        </Tooltip>

        <Tooltip title="Underline">
          <IconButton onClick={() => editor.chain().focus().toggleUnderline().run()} color={editor.isActive("underline") ? "primary" : "default"}>
            <FormatUnderlined />
          </IconButton>
        </Tooltip>

        {/* Lists */}
        <Tooltip title="Bullet List">
          <IconButton onClick={() => editor.chain().focus().toggleBulletList().run()} color={editor.isActive("bulletList") ? "primary" : "default"}>
            <FormatListBulleted />
          </IconButton>
        </Tooltip>

        <Tooltip title="Numbered List">
          <IconButton onClick={() => editor.chain().focus().toggleOrderedList().run()} color={editor.isActive("orderedList") ? "primary" : "default"}>
            <FormatListNumbered />
          </IconButton>
        </Tooltip>

        {/* Blockquote / Code */}
        <Tooltip title="Blockquote">
          <IconButton onClick={() => editor.chain().focus().toggleBlockquote().run()} color={editor.isActive("blockquote") ? "primary" : "default"}>
            <FormatQuote />
          </IconButton>
        </Tooltip>

        <Tooltip title="Code Block">
          <IconButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} color={editor.isActive("codeBlock") ? "primary" : "default"}>
            <Code />
          </IconButton>
        </Tooltip>

        {/* Undo / Redo */}
        <Tooltip title="Undo">
          <IconButton onClick={() => editor.chain().focus().undo().run()} color="default">
            <Undo />
          </IconButton>
        </Tooltip>

        <Tooltip title="Redo">
          <IconButton onClick={() => editor.chain().focus().redo().run()} color="default">
            <Redo />
          </IconButton>
        </Tooltip>

        {/* Image / Link */}
        <Tooltip title="Insert Image">
          <IconButton
            onClick={() => {
              const url = prompt("Enter image URL");
              if (url) editor.chain().focus().setImage({ src: url }).run();
            }}
            color="default"
          >
            <ImageIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Insert Link">
          <IconButton
            onClick={() => {
              const url = prompt("Enter URL");
              if (url)
                editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
            }}
            color={editor.isActive("link") ? "primary" : "default"}
          >
            <LinkIcon />
          </IconButton>
        </Tooltip>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}
