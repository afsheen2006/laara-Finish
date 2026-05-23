
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
const saveContent = async (...args) => { console.log("Stub called: saveContent", args); return {}; };
import { Loader2, FileText, Globe } from 'lucide-react';
import { toast } from 'sonner';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export function CMSEditor({ initialData }) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");

  const editor = useEditor({
    extensions: [
    StarterKit,
    Link,
    Image],

    content: initialData?.body || "<p>Start editing your content here...</p>"
  });

  const handleSave = async (status) => {
    if (!title || !slug) {
      toast.error("Title and Slug are required");
      return;
    }

    setLoading(true);
    try {
      await saveContent({
        title,
        slug,
        body: JSON.stringify(editor?.getJSON() || {})
      });
      toast.success(`Content saved as ${status}`);
    } catch (error) {
      toast.error(error.message || "Failed to save content");
    } finally {
      setLoading(false);
    }
  };

  if (!editor) return null;

  return (/*#__PURE__*/
    _jsxs("div", { className: "space-y-6 max-w-5xl mx-auto p-6 bg-card border border-border rounded-2xl shadow-xl", children: [/*#__PURE__*/
      _jsxs("div", { className: "flex items-center justify-between border-b border-border pb-6", children: [/*#__PURE__*/
        _jsxs("div", { className: "flex items-center gap-3", children: [/*#__PURE__*/
          _jsx("div", { className: "p-3 bg-primary/10 rounded-xl text-primary", children: /*#__PURE__*/
            _jsx(FileText, { className: "w-6 h-6" }) }
          ), /*#__PURE__*/
          _jsxs("div", { children: [/*#__PURE__*/
            _jsx("h1", { className: "text-2xl font-bold text-white", children: "No-Code Editor" }), /*#__PURE__*/
            _jsx("p", { className: "text-sm text-gray-400", children: "Build and publish content instantly" })] }
          )] }
        ), /*#__PURE__*/
        _jsxs("div", { className: "flex items-center gap-3", children: [/*#__PURE__*/
          _jsx(Button, {
            variant: "outline",
            onClick: () => handleSave("DRAFT"),
            disabled: loading,
            className: "border-white/10 text-white hover:bg-white/5", children:
            "Save Draft" }

          ), /*#__PURE__*/
          _jsxs(Button, {
            onClick: () => handleSave("PUBLISHED"),
            disabled: loading,
            className: "bg-primary text-primary-foreground hover:bg-primary/90 gap-2", children: [

            loading ? /*#__PURE__*/_jsx(Loader2, { className: "w-4 h-4 animate-spin" }) : /*#__PURE__*/_jsx(Globe, { className: "w-4 h-4" }), "Publish Live"] }

          )] }
        )] }
      ), /*#__PURE__*/

      _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [/*#__PURE__*/
        _jsxs("div", { className: "space-y-2", children: [/*#__PURE__*/
          _jsx("label", { className: "text-xs font-bold uppercase tracking-wider text-gray-500", children: "Page Title" }), /*#__PURE__*/
          _jsx("input", {
            type: "text",
            value: title,
            onChange: (e) => setTitle(e.target.value),
            placeholder: "e.g., Home Page Hero",
            className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50" }
          )] }
        ), /*#__PURE__*/
        _jsxs("div", { className: "space-y-2", children: [/*#__PURE__*/
          _jsx("label", { className: "text-xs font-bold uppercase tracking-wider text-gray-500", children: "URL Slug" }), /*#__PURE__*/
          _jsx("input", {
            type: "text",
            value: slug,
            onChange: (e) => setSlug(e.target.value),
            placeholder: "e.g., home-hero",
            className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50" }
          )] }
        )] }
      ), /*#__PURE__*/

      _jsxs("div", { className: "border border-white/10 rounded-2xl overflow-hidden bg-white/5", children: [/*#__PURE__*/
        _jsxs("div", { className: "bg-white/5 border-b border-white/10 p-2 flex gap-2 flex-wrap", children: [/*#__PURE__*/

          _jsx(Button, { size: "sm", variant: "ghost", onClick: () => editor.chain().focus().toggleBold().run(), className: editor.isActive('bold') ? 'bg-white/10' : '', children: "B" }), /*#__PURE__*/
          _jsx(Button, { size: "sm", variant: "ghost", onClick: () => editor.chain().focus().toggleItalic().run(), className: editor.isActive('italic') ? 'bg-white/10' : '', children: "I" }), /*#__PURE__*/
          _jsx(Button, { size: "sm", variant: "ghost", onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), className: editor.isActive('heading', { level: 2 }) ? 'bg-white/10' : '', children: "H2" }), /*#__PURE__*/
          _jsx(Button, { size: "sm", variant: "ghost", onClick: () => editor.chain().focus().toggleBulletList().run(), className: editor.isActive('bulletList') ? 'bg-white/10' : '', children: "List" })] }
        ), /*#__PURE__*/
        _jsx("div", { className: "p-6 min-h-[400px]", children: /*#__PURE__*/
          _jsx(EditorContent, { editor: editor, className: "prose prose-invert max-w-none focus:outline-none" }) }
        )] }
      )] }
    ));

}