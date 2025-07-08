import { useNotes } from "../../context/notes-context";
import { findNotesInArchive } from "../../utils/findNotesInArchive"; // We'll only need findNotesInArchive

export const NotesCard = ({ id, title, text, isPinned }) => {
  const { notesDispatch, archive } = useNotes();

  // Determine if the current note is in the archive based on its ID
  const isInArchive = findNotesInArchive(archive, id);

  const onPinClick = (id) => {
    if (!isInArchive) {
      // Only allow pinning if not in archive
      !isPinned
        ? notesDispatch({
            type: "PIN",
            payload: { id },
          })
        : notesDispatch({
            type: "UNPIN",
            payload: { id },
          });
    }
  };

  const onArchiveClick = (id) => {
    // If the note is currently in the archive, this means we want to UNARCHIVE it.
    // Otherwise, if it's not in the archive, we want to ADD_TO_ARCHIVE it.
    isInArchive
      ? notesDispatch({
          type: "REMOVE_FROM_ARCHIVE",
          payload: { id },
        })
      : notesDispatch({
          type: "ADD_TO_ARCHIVE",
          payload: { id },
        });
  };

  const onDeleteClick = (id) => {
    // If the note is in the archive, delete it from the archive.
    // Otherwise (it's in the main notes), delete it from the main notes.
    isInArchive
      ? notesDispatch({
          type: "DELETE_FROM_ARCHIVE", // Action to delete from archive
          payload: { id },
        })
      : notesDispatch({
          type: "DELETE_NOTE", // Action to delete from main notes
          payload: { id },
        });
  };

  return (
    <div
      className="w-56 border border-neutral-800 p-2 rounded-md w-[300px]"
      key={id}
    >
      <div className="flex justify-between border-b-2">
        <p>{title}</p>
        {!isInArchive && ( // Only show pin if not in archive
          <button onClick={() => onPinClick(id)}>
            <span
              className={`material-symbols-outlined ${
                isPinned ? "material-symbols-filled text-blue-700" : ""
              }`}
            >
              push_pin
            </span>
          </button>
        )}
      </div>
      <div className="flex flex-col">
        <p>{text}</p>
        <div className="ml-auto">
          <button onClick={() => onArchiveClick(id)}>
            <span
              className={`material-symbols-outlined ${
                isInArchive ? "material-symbols-filled text-blue-700" : ""
              }`}
            >
              archive
            </span>
          </button>
          <button onClick={() => onDeleteClick(id)}>
            <span
              class={"material-symbols-outlined"} // You can make this conditional if needed
            >
              delete
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
