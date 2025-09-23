import Modal from "@/components/Modal/Modal";
import css from "./NotesPage.module.css";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchNotes } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import NoteForm from "@/components/NoteForm/NoteForm";
import { useDebouncedCallback } from "use-debounce";
import { Toaster } from "react-hot-toast";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

// import NoteList from "../NoteList/NoteList";
// import css from "./App.module.css";
// import { keepPreviousData, useQuery } from "@tanstack/react-query";
// import { fetchNotes } from "../../services/noteService";
// import { useState } from "react";
// import Pagination from "../Pagination/Pagination";
// import Modal from "../Modal/Modal";
// import Loader from "../Loader/Loader";
// import ErrorMessage from "../ErrorMessage/ErrorMessage";
// import SearchBox from "../SearchBox/SearchBox";
// import { useDebouncedCallback } from "use-debounce";
// import { Toaster } from "react-hot-toast";
// import NoteForm from "../NoteForm/NoteForm";

export default async function Notes() {
  const [topic, setTopic] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", topic, page],
    queryFn: () => fetchNotes(topic, page),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  const updateSearchWord = useDebouncedCallback((searchWord: string) => {
    setTopic(searchWord);
    setPage(1);
  }, 500);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={updateSearchWord} />
        {isSuccess && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            page={page}
            updatePage={setPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {isError && (
        <ErrorMessage text="There was an error, please try again..." />
      )}
      {data !== undefined && data?.notes.length === 0 && (
        <ErrorMessage text="No notes found" />
      )}
      {data !== undefined && data?.notes.length > 0 && (
        <NoteList notes={data?.notes} />
      )}
      {isModalOpen && (
        <Modal
          onClose={closeModal}
          children={<NoteForm onClose={closeModal} />}
        />
      )}
      <Toaster />
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import NoteList from "@/components/NoteList/NoteList";
// import { getNotes, Note } from "@/lib/api";

// const Notes = () => {
//   const [notes, setNotes] = useState<Note[]>([]);

//   const handleClick = async () => {
//     const response = await getNotes();
//     if (response?.notes) {
//       setNotes(response.notes);
//     }
//   };

//   return (
//     <section>
//       <h1>Notes List</h1>
//       <button onClick={handleClick}>Get my notes</button>
//       {notes.length > 0 && <NoteList notes={notes} />}
//     </section>
//   );
// };

// export default Notes;
