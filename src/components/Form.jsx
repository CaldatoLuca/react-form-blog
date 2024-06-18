import { useState } from "react";
import PostsList from "./PostsList";

const Form = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState("");
  const [id, setId] = useState(0);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);

  //azioni al click del bottone
  const handleSubmit = (e) => {
    e.preventDefault(); //non ricarico la pagina

    // Controllo se title non è vuoto
    //se lo è setto error alla frase che voglio stampare e faccio return in modo da non caricare il post errato
    //col conditional rendering poi mostro l' errore (come gestirne piu assieme?)
    if (title.trim() === "") {
      setError("Title is required");
      return;
    }

    // se clicco su edit setto editId all' id del post cliccato
    //quindi se non è null sto modificando
    //se modifico cerco il post con id selezionato e lo modifico
    //riposrto l' id a null una volta modificato
    if (editId !== null) {
      setPosts((posts) =>
        posts.map((post) =>
          post.id === editId
            ? { ...post, title, category, tags, content }
            : post
        )
      );
      setEditId(null);
    } else {
      setPosts((posts) => [
        ...posts,
        { id: id, title, category, tags, content },
      ]);
      setId((id) => id + 1);
    }

    //svoto i campi
    setTitle("");
    setCategory("");
    setTags([]);
    setContent("");
    setError("");
  };

  //passo il valore del tag
  //se non lo include lo metto nell' array tags
  //se lo include già (quindi clicco di nuovo sulla checkbox) lo tolgo, cosi da decheckare
  const handleTagChange = (tag) => {
    setTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  //cliccando sulla x passo l' indice del post da eliminare
  // posts diventa l' array filtrato senza l' index passato
  const removePost = (indexToDelete) => {
    setPosts((p) => p.filter((_, i) => i !== indexToDelete));
  };

  // se clicco su edit imposto i value dei mie campi a quelli gia inseriti
  //cosi vedo i campi coi suoi valori e li modifico
  const editPost = (post) => {
    setTitle(post.title);
    setCategory(post.category);
    setTags(post.tags);
    setContent(post.content);
    setEditId(post.id);
  };

  return (
    <>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="text-sky-400 font-semibold">
            Insert Title
          </label>
          <input
            type="text"
            className="me-5 rounded-lg bg-normal-100 text-neutral-900 py-1 px-2 outline-none"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="category" className="text-sky-400 font-semibold">
            Select Category
          </label>
          <select
            name="category"
            className="me-5 rounded-lg bg-normal-100 text-neutral-900 py-1 px-2 outline-none"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            <option value="Tech">Tech</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Education">Education</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sky-400 font-semibold">Select Tags</label>
          <div className="flex gap-2">
            <label>
              <input
                type="checkbox"
                value="React"
                checked={tags.includes("React")}
                onChange={() => handleTagChange("React")}
              />
              React
            </label>
            <label>
              <input
                type="checkbox"
                value="JavaScript"
                checked={tags.includes("JavaScript")}
                onChange={() => handleTagChange("JavaScript")}
              />
              JavaScript
            </label>
            <label>
              <input
                type="checkbox"
                value="CSS"
                checked={tags.includes("CSS")}
                onChange={() => handleTagChange("CSS")}
              />
              CSS
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="content" className="text-sky-400 font-semibold">
            Content
          </label>
          <textarea
            name="content"
            className="me-5 rounded-lg bg-normal-100 text-neutral-900 py-1 px-2 outline-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div>
          <button className="bg-sky-400 py-1 px-3 rounded-lg font-semibold hover:bg-opacity-90 transition">
            {editId !== null ? "Update" : "Send"}
          </button>
        </div>
      </form>

      <PostsList posts={posts} removePost={removePost} editPost={editPost} />
    </>
  );
};

export default Form;
