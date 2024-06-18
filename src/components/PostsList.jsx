const PostsList = ({ posts, removePost, editPost }) => {
  return (
    <ul className=" w-1/3 mt-5">
      {posts.map((p, i) => (
        <li key={`post-${i}`} className="flex w-full justify-between mb-2">
          {p.id}. {p.title} {p.category}{" "}
          {p.tags.map((t) => (
            <span>{t}</span>
          ))}
          <div>
            <button
              onClick={() => removePost(i)}
              className=" bg-red-500 px-1 rounded-md mr-2"
            >
              X
            </button>
            <button
              onClick={() => editPost(p)}
              className="bg-sky-500 px-1 rounded-md"
            >
              Edit
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PostsList;
