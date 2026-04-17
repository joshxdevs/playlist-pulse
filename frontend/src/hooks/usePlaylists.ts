import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as svc from "../services/playlistService";

export const PLAYLISTS_KEY = ["playlists"] as const;

export function usePlaylists() {
  return useQuery({
    queryKey: PLAYLISTS_KEY,
    queryFn: svc.getPlaylists,
  });
}

export function useAddPlaylist() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (url: string) => svc.addPlaylist(url),
    onSuccess: () => qc.invalidateQueries({ queryKey: PLAYLISTS_KEY }),
  });
}

export function useRenamePlaylist() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, title }: { id: string; title: string }) =>
      svc.renamePlaylist(id, title),
    onSuccess: () => qc.invalidateQueries({ queryKey: PLAYLISTS_KEY }),
  });
}

export function useDeletePlaylist() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => svc.deletePlaylist(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: PLAYLISTS_KEY }),
  });
}
