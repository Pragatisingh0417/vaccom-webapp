import { ClassicEditor as ClassicEditorBase } from "@ckeditor/ckeditor5-editor-classic";

import { Autoformat } from "@ckeditor/ckeditor5-autoformat";
import { Bold, Italic, Underline } from "@ckeditor/ckeditor5-basic-styles";
import { Link } from "@ckeditor/ckeditor5-link";
import { Heading } from "@ckeditor/ckeditor5-heading";
import { List } from "@ckeditor/ckeditor5-list";
import { BlockQuote } from "@ckeditor/ckeditor5-block-quote";
import { Table } from "@ckeditor/ckeditor5-table";
import { Image, ImageUpload } from "@ckeditor/ckeditor5-image";

export default class ClassicEditor extends ClassicEditorBase {}

(ClassicEditor as any).builtinPlugins = [
  Autoformat,
  Bold,
  Italic,
  Underline,
  Link,
  Heading,
  List,
  BlockQuote,
  Table,
  Image,
  ImageUpload,
];

(ClassicEditor as any).defaultConfig = {
  toolbar: {
    items: [
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
  },
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
};
