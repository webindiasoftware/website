import { useState } from 'react'
import { useData } from '../context/DataContext'
import { Section, Field } from './shared'

const blank = { slug: '', category: '', title: '', excerpt: '', img: '', date: new Date().toISOString().split('T')[0], published: true, content: '' }

export default function AdminBlog() {
  const { data, dispatch } = useData()
  const [editing, setEditing] = useState(null) // null = list view, 'new' = new, id = edit existing
  const [form, setForm] = useState({ ...blank })
  const [saved, setSaved] = useState(false)

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  const openNew = () => { setForm({ ...blank }); setEditing('new') }
  const openEdit = (post) => { setForm({ ...post }); setEditing(post.id) }
  const cancelEdit = () => { setEditing(null); setSaved(false) }

  const save = () => {
    if (editing === 'new') {
      dispatch({ type: 'ADD_POST', payload: { ...form, id: Date.now() } })
    } else {
      dispatch({ type: 'UPDATE_POST', payload: form })
    }
    setSaved(true)
    setTimeout(() => { setSaved(false); setEditing(null) }, 1200)
  }

  const deletePost = (id) => {
    if (confirm('Delete this post?')) dispatch({ type: 'DELETE_POST', payload: id })
  }

  // Featured post editor
  const [featForm, setFeatForm] = useState({ ...data.blog.featured })
  const [featSaved, setFeatSaved] = useState(false)
  const saveFeatured = () => {
    dispatch({ type: 'SET_BLOG_FEATURED', payload: featForm })
    setFeatSaved(true)
    setTimeout(() => setFeatSaved(false), 2000)
  }

  if (editing !== null) {
    return (
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-[#1b1c1c]">
              {editing === 'new' ? 'New Blog Post' : 'Edit Post'}
            </h1>
            <p className="text-sm text-gray-500 mt-1">{editing === 'new' ? 'Create a new article' : `Editing: ${form.title}`}</p>
          </div>
          <div className="flex gap-3">
            <button onClick={cancelEdit} className="px-4 py-2 border border-gray-300 text-sm font-medium hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button onClick={save} className={`px-5 py-2 text-sm font-bold uppercase tracking-wider transition-colors flex items-center gap-2 ${saved ? 'bg-green-600 text-white' : 'bg-[#1b1c1c] text-white hover:bg-[#106F89]'}`}>
              <span className="material-symbols-outlined text-base">{saved ? 'check' : 'save'}</span>
              {saved ? 'Saved!' : 'Save Post'}
            </button>
          </div>
        </div>

        <Section title="Post Details">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Title" value={form.title} onChange={set('title')} />
            <Field label="Category" value={form.category} onChange={set('category')} placeholder="FITNESS SOFTWARE" />
            <Field label="Slug (URL)" value={form.slug} onChange={set('slug')} placeholder="my-post-slug" />
            <Field label="Date" value={form.date} onChange={set('date')} type="date" />
          </div>
          <Field label="Excerpt" value={form.excerpt} onChange={set('excerpt')} rows={2} />
          <Field label="Cover Image URL" value={form.img} onChange={set('img')} />
          {form.img && <img src={form.img} alt="preview" className="h-32 w-auto object-cover border border-gray-200" />}
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.published} onChange={set('published')} className="w-4 h-4 accent-[#106F89]" />
            <span className="text-sm font-medium">Published</span>
          </label>
        </Section>

        <Section title="Article Content">
          <p className="text-xs text-gray-400 mb-2">Write content as plain text. Separate paragraphs with a blank line.</p>
          <Field label="Content" value={form.content} onChange={set('content')} rows={16} placeholder="Write your article content here..." />
        </Section>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-[#1b1c1c]">Blog Management</h1>
          <p className="text-sm text-gray-500 mt-1">Create and manage blog posts</p>
        </div>
        <button onClick={openNew} className="bg-[#1b1c1c] text-white px-5 py-2.5 text-sm font-bold uppercase tracking-wider hover:bg-[#106F89] transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-base">add</span>
          New Post
        </button>
      </div>

      {/* Featured post */}
      <div className="bg-white border border-gray-200 mb-6">
        <div className="px-6 py-4 border-b border-gray-100 bg-yellow-50 flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500">Featured Article (Blog Hero)</h2>
          <button onClick={saveFeatured} className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${featSaved ? 'bg-green-600 text-white' : 'bg-[#1b1c1c] text-white hover:bg-[#106F89]'}`}>
            {featSaved ? 'Saved!' : 'Save Featured'}
          </button>
        </div>
        <div className="p-6 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Slug" value={featForm.slug} onChange={e => setFeatForm(f => ({ ...f, slug: e.target.value }))} />
            <Field label="Category" value={featForm.category} onChange={e => setFeatForm(f => ({ ...f, category: e.target.value }))} />
          </div>
          <Field label="Title" value={featForm.title} onChange={e => setFeatForm(f => ({ ...f, title: e.target.value }))} />
          <Field label="Excerpt" value={featForm.excerpt} onChange={e => setFeatForm(f => ({ ...f, excerpt: e.target.value }))} rows={2} />
          <Field label="Image URL" value={featForm.img} onChange={e => setFeatForm(f => ({ ...f, img: e.target.value }))} />
        </div>
      </div>

      {/* Posts list */}
      <div className="bg-white border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500">All Posts ({data.blog.posts.length})</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {data.blog.posts.length === 0 && (
            <p className="text-sm text-gray-400 py-8 text-center">No posts yet. Create your first post.</p>
          )}
          {data.blog.posts.map((post) => (
            <div key={post.id} className="flex items-start gap-4 p-5 hover:bg-gray-50 transition-colors">
              {post.img && <img src={post.img} alt={post.title} className="w-16 h-12 object-cover border border-gray-200 shrink-0" />}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs px-2 py-0.5 font-bold uppercase ${post.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                  <span className="text-xs text-gray-400 uppercase tracking-wider">{post.category}</span>
                </div>
                <h3 className="font-semibold text-sm text-[#1b1c1c] truncate">{post.title}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{post.date} · /blog/{post.slug}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => openEdit(post)} className="text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-[#1b1c1c] flex items-center gap-1 transition-colors">
                  <span className="material-symbols-outlined text-base">edit</span>
                  Edit
                </button>
                <button onClick={() => deletePost(post.id)} className="text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-[#106F89] flex items-center gap-1 transition-colors">
                  <span className="material-symbols-outlined text-base">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
