"use client";

import dynamic from "next/dynamic";
import { Dispatch, SetStateAction } from "react";
import "react-quill/dist/quill.snow.css";

// ✅ Dynamically import ReactQuill (no SSR)
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface BlogEditorProps {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
}

export default function BlogEditor({ value, onChange }: BlogEditorProps) {
  return (
    <div className="w-full">
      <ReactQuill theme="snow" value={value} onChange={onChange} />
    </div>
  );
}
