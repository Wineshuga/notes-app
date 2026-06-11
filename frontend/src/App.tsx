import React, { useEffect } from "react";
import { useState } from "react";
import { createNote, fetchNotes, deleteNote, updateNote } from "./api";

const NotesList = ({ notes, setReload }: { notes: { id: string; title: string; content: string }[]; setReload: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState<{ id: string; title: string; content: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const openEditModal = (note: { id: string; title: string; content: string }) => {
    setSelectedNote(note);
    setNewTitle(note.title);
    setNewContent(note.content);
};

  const editNoteHandler: (id: string) => Promise<void> = async (id: string) => {
    setLoading(true);
    if (newTitle && newContent) {
      await updateNote(id, newTitle, newContent).then(() => {
        alert("Note updated successfully!");
        setEditModal(false);
      });
    }
    await fetchNotes().then((data) => {
      if (data) {
        setNewTitle("");
        setNewContent("");
      }
    });
    setReload(true);
    setLoading(false);

  };

  const deleteNoteHandler = async (id: string) => {
    setLoading(true);
    if (window.confirm("Are you sure you want to delete this note?")) {
      await deleteNote(id).then(() => {
        alert("Note deleted successfully!");
      });
    }
    await fetchNotes().then((data) => {
      if (data) {
        setNewTitle("");
        setNewContent("");
      }
    });
    setReload(true);
    setLoading(false);
  };
  return (
    <section className="shadow-md border border-gray-300 p-3 mb-4 flex justify-between gap-3">
      {notes.map((n) => (
        <React.Fragment key={n.id}>
        <div>
          <h3 className="font-semibold">{n.title}</h3>
          <p>{n.content}</p>
        </div>
        <div className="flex items-center gap-2">
        <button disabled={loading} className="p-2 bg-blue-500 text-sm text-white hover:bg-blue-600" onClick={() => {
          openEditModal(n);
          setEditModal(prev => !prev)}
          }>
          Edit
        </button>
        <button disabled={loading} className="p-2 bg-red-500 text-sm text-white hover:bg-red-600" onClick={() => deleteNoteHandler(n.id)}>
          Delete
        </button>
      </div>
        </React.Fragment>
      ))}
      {editModal && (
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-4">
          <h2 className="text-xl font-bold">Edit Note</h2>

          <input
            type="text"
            placeholder="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-green-400"
          />

          <textarea
            placeholder="Content"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="w-full border p-2 rounded h-32 outline-none focus:ring-2 focus:ring-green-400"
          />
          <div className="flex justify-end gap-2 pt-2">
            <button
              className="px-3 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded"
              onClick={() => {
                setNewContent("");
                setNewTitle("");
                setEditModal(false)}
              }
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="px-3 py-2 bg-green-500 text-sm text-white hover:bg-green-600 rounded disabled:opacity-50"
              onClick={() => selectedNote && editNoteHandler(selectedNote.id)}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
      )}
    </section>
  );
};

const App = () => {
  const [loading, setLoading] = useState({
      fetch: false,
      create: false,
      page: false,
  });
  const [query, setQuery] = useState<string>("");
  const [reload, setReload] = useState(false);
  const [notes, setNotes] = useState<{ id: string; title: string; content: string }[] | null>(null);
  const [ openCreate, setOpenCreate ] = useState(false);
  const [ title, setTitle ] = useState("");
  const [ content, setContent ] = useState("");

  useEffect(() => {
    const fetchNotesData = async () => {
      const data = await fetchNotes();
      if (data) setNotes(data);
    };
    fetchNotesData();
  }, [reload]);

  const fetchNotesHandler = async (searchQuery?: string) => {
    setLoading({ ...loading, fetch: true });
    const data = await fetchNotes(searchQuery);
    if (data) setNotes(data);
    setLoading({ ...loading, fetch: false });
  };
  
  const handleCreateNote = async () => {
    if (!title || !content) return;
    setLoading({ ...loading, create: true });
    const newNote = await createNote(title, content);
    if (newNote) {
      setTitle("");
      setContent("");
      setOpenCreate(false);
    }
    setLoading({ ...loading, page: true, create: false });
    await fetchNotesHandler().then(() => setLoading({ ...loading, page: false }));
  };

  return (
    <section className="md:max-w-1/2 mx-auto p-3">
      <input
        type="text"
        placeholder="Search notes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 mr-2"
      />

      <button
        onClick={() => fetchNotesHandler(query)}
        className="p-2 border hover:bg-gray-100"
      >
        Search
      </button>
      <h1 className="text-3xl font-bold underline my-4">
        Welcome to Notes App
      </h1>
      <div className="flex gap-2 mb-4">
        <button
          className="p-2 border border-gray-300 hover:bg-gray-100"
          onClick={() => setOpenCreate((prev) => !prev)}
        >
          Create Note
        </button>
        <button
          className="p-2 border border-gray-300 hover:bg-gray-100"
          onClick={() => fetchNotesHandler()}
        >
          {loading.fetch ? "Fetching..." : "Fetch Notes"}
        </button>
      </div>

      {openCreate && (
        <div className="border p-3 mb-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-2 p-2 border border-gray-300"
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full mb-2 p-2 border border-gray-300"
          />
          <button
            className="p-2 bg-blue-500 text-white hover:bg-blue-600"
            onClick={handleCreateNote}
          >
            {loading.create ? "Saving..." : "Save Note"}
          </button>
        </div>
      )}

      {loading.page ? (
        <p>Loading notes...</p>
      ) : notes && notes.length > 0 ? (
        notes.map((n: { id: string; title: string; content: string }) => (
          <NotesList key={n.id} notes={[n]} setReload={setReload} />
        ))
      ) : 
        !notes ? null : (<p>No notes to display.</p>)
      }
    </section>
  );
};

export default App;