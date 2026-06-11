const API_BASE = import.meta.env.VITE_API_URL || "";

export const fetchNotes = async (searchQuery = "") => {
  try {
    const url = searchQuery
      ? `${API_BASE}/notes?query=${encodeURIComponent(searchQuery)}`
      : `${API_BASE}/notes`;

    const res = await fetch(url);

    if (!res.ok) {
      console.error("Request failed", res.status);
      return;
    }

    const data = await res.json();
    console.log("Fetched notes:", data);
    return data.items || [];
  } catch (error) {
    console.error("Error fetching notes:", error);
  }
};

export const createNote = async (title: string, content: string) => {
  try {
    const res = await fetch(`${API_BASE}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    if (!res.ok) {
      console.error("Request failed", res.status);
      return;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error creating note:", error);
  }
};

export const updateNote = async (id: string, title: string, content: string) => {
  try {
    const res = await fetch(`${API_BASE}/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    if (!res.ok) {
      console.error("Request failed", res.status);
      return;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error updating note:", error);
  }
};

export const deleteNote = async (id: string) => {
  try {
    const res = await fetch(`${API_BASE}/notes/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      console.error("Request failed", res.status);
      return;
    }

    return true;
  } catch (error) {
    console.error("Error deleting note:", error);
  }
};
