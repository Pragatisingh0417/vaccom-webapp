"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import type { EditorConfig } from "@ckeditor/ckeditor5-core";

// 👇 Type-only imports bring plugin typings (module augmentation) into scope.
// They do NOT add any runtime bundle weight.
import type {} from "@ckeditor/ckeditor5-heading";
import type {} from "@ckeditor/ckeditor5-link";
import type {} from "@ckeditor/ckeditor5-list";
import type {} from "@ckeditor/ckeditor5-table";
import type {} from "@ckeditor/ckeditor5-image";

interface BlogEditorProps {
  value: string;
  onChange: (val: string) => void;
}

const editorConfig: EditorConfig = {
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "underline",
    "link",
    "bulletedList",
    "numberedList",
    "blockQuote",
    "insertTable",
    "imageUpload",
    "|",
    "undo",
    "redo",
  ],
  heading: {
    options: [
      { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
      { model: "heading1", view: "h1", title: "Heading 1", class: "ck-heading_heading1" },
      { model: "heading2", view: "h2", title: "Heading 2", class: "ck-heading_heading2" },
      { model: "heading3", view: "h3", title: "Heading 3", class: "ck-heading_heading3" },
      { model: "heading4", view: "h4", title: "Heading 4", class: "ck-heading_heading4" },
      { model: "heading5", view: "h5", title: "Heading 5", class: "ck-heading_heading5" },
      { model: "heading6", view: "h6", title: "Heading 6", class: "ck-heading_heading6" },
    ],
  },
  table: {
    contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
  },
  image: {
    toolbar: ["imageTextAlternative", "imageStyle:full", "imageStyle:side"],
  },
};

export default function BlogEditor({ value, onChange }: BlogEditorProps) {
  return (
    <div className="border rounded-lg p-3 bg-white shadow-md">
      <CKEditor
        editor={ClassicEditor as any}
        data={value}
        config={editorConfig}
        onChange={(_, editor) => onChange(editor.getData())}
      />
    </div>
  );
}
