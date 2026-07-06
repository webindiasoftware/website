import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

// Heuristic: legacy posts stored plain text with blank-line paragraph breaks
// (no HTML tags). Wrap those in <p> so they load into the editor correctly
// instead of collapsing into one run-on paragraph.
function toEditableHtml(content) {
  if (!content) return ''
  if (/<[a-z][\s\S]*>/i.test(content)) return content
  return content.split('\n\n').filter(Boolean).map((p) => `<p>${p}</p>`).join('')
}

function ToolbarButton({ onClick, active, disabled, label, children }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      disabled={disabled}
      title={label}
      className={`w-8 h-8 flex items-center justify-center rounded text-sm font-bold transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
        active ? 'bg-[#1b1c1c] text-white' : 'text-gray-600 hover:bg-gray-200'
      }`}
    >
      {children}
    </button>
  )
}

export function RichTextEditor({ label, value, onChange }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: toEditableHtml(value),
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: 'rich-content min-h-[300px] px-4 py-3 focus:outline-none',
      },
    },
  })

  return (
    <div>
      {label && <span className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-1.5">{label}</span>}
      <div className="border border-gray-200">
        <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-gray-50 p-1.5">
          <ToolbarButton label="Bold" active={editor?.isActive('bold')} disabled={!editor} onClick={() => editor.chain().focus().toggleBold().run()}>B</ToolbarButton>
          <ToolbarButton label="Italic" active={editor?.isActive('italic')} disabled={!editor} onClick={() => editor.chain().focus().toggleItalic().run()}><em>I</em></ToolbarButton>
          <ToolbarButton label="Strikethrough" active={editor?.isActive('strike')} disabled={!editor} onClick={() => editor.chain().focus().toggleStrike().run()}><span style={{ textDecoration: 'line-through' }}>S</span></ToolbarButton>
          <div className="w-px h-5 bg-gray-300 mx-1" />
          <ToolbarButton label="Heading 1" active={editor?.isActive('heading', { level: 1 })} disabled={!editor} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</ToolbarButton>
          <ToolbarButton label="Heading 2" active={editor?.isActive('heading', { level: 2 })} disabled={!editor} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</ToolbarButton>
          <ToolbarButton label="Heading 3" active={editor?.isActive('heading', { level: 3 })} disabled={!editor} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</ToolbarButton>
          <ToolbarButton label="Paragraph" active={editor?.isActive('paragraph')} disabled={!editor} onClick={() => editor.chain().focus().setParagraph().run()}>P</ToolbarButton>
          <div className="w-px h-5 bg-gray-300 mx-1" />
          <ToolbarButton label="Bullet List" active={editor?.isActive('bulletList')} disabled={!editor} onClick={() => editor.chain().focus().toggleBulletList().run()}>
            <span className="material-symbols-outlined text-lg">format_list_bulleted</span>
          </ToolbarButton>
          <ToolbarButton label="Numbered List" active={editor?.isActive('orderedList')} disabled={!editor} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
            <span className="material-symbols-outlined text-lg">format_list_numbered</span>
          </ToolbarButton>
          <ToolbarButton label="Quote" active={editor?.isActive('blockquote')} disabled={!editor} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
            <span className="material-symbols-outlined text-lg">format_quote</span>
          </ToolbarButton>
          <div className="w-px h-5 bg-gray-300 mx-1" />
          <ToolbarButton label="Undo" disabled={!editor} onClick={() => editor.chain().focus().undo().run()}>
            <span className="material-symbols-outlined text-lg">undo</span>
          </ToolbarButton>
          <ToolbarButton label="Redo" disabled={!editor} onClick={() => editor.chain().focus().redo().run()}>
            <span className="material-symbols-outlined text-lg">redo</span>
          </ToolbarButton>
        </div>
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
