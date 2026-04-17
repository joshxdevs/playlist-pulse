import { useState } from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useRenamePlaylist } from "../../hooks/usePlaylists";

interface RenamePlaylistModalProps {
  open: boolean;
  onClose: () => void;
  playlistId: string;
  currentTitle: string;
}

export default function RenamePlaylistModal({
  open,
  onClose,
  playlistId,
  currentTitle,
}: RenamePlaylistModalProps) {
  const [title, setTitle] = useState(currentTitle);
  const [error, setError] = useState("");
  const { mutateAsync, isPending } = useRenamePlaylist();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Title cannot be empty");
      return;
    }
    if (title.trim() === currentTitle) {
      onClose();
      return;
    }

    try {
      await mutateAsync({ id: playlistId, title: title.trim() });
      onClose();
    } catch (err: unknown) {
      const e = err as { response?: { data?: { error?: string } }; message?: string };
      setError(e?.response?.data?.error || e?.message || "Failed to rename");
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Rename Playlist">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          id="rename-title"
          label="New name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={error}
          autoFocus
          onFocus={(e) => e.target.select()}
        />
        <div className="flex gap-2 justify-end">
          <Button variant="secondary" type="button" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" loading={isPending}>
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
}
