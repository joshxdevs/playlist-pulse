import { useState } from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useAddPlaylist } from "../../hooks/usePlaylists";

interface AddPlaylistModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AddPlaylistModal({ open, onClose }: AddPlaylistModalProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const { mutateAsync, isPending } = useAddPlaylist();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!url.trim()) {
      setError("Please enter a YouTube playlist URL");
      return;
    }

    try {
      await mutateAsync(url.trim());
      setUrl("");
      onClose();
    } catch (err: unknown) {
      const e = err as { response?: { data?: { error?: string } }; message?: string };
      setError(
        e?.response?.data?.error ||
        e?.message ||
        "Failed to add playlist. Check the URL and try again."
      );
    }
  }

  function handleClose() {
    setUrl("");
    setError("");
    onClose();
  }

  return (
    <Modal open={open} onClose={handleClose} title="Add YouTube Playlist">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          id="playlist-url"
          label="Playlist URL"
          placeholder="https://youtube.com/playlist?list=PLxxxxxx"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          error={error}
          autoFocus
          leftIcon={
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.55V6.79a4.85 4.85 0 01-1.07-.1z" />
            </svg>
          }
        />

        <p className="text-xs text-app-500">
          Paste any YouTube playlist URL. All videos will be imported automatically.
        </p>

        <div className="flex gap-2 justify-end pt-1">
          <Button variant="secondary" type="button" onClick={handleClose} disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" loading={isPending} disabled={!url.trim()}>
            {isPending ? "Importing…" : "Add Playlist"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
