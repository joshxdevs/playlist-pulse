import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as playlistSvc from "../services/playlistService";
import * as videoSvc from "../services/videoService";
import { PLAYLISTS_KEY } from "./usePlaylists";

export function usePlaylist(id: string) {
  return useQuery({
    queryKey: ["playlist", id],
    queryFn: () => playlistSvc.getPlaylist(id),
    enabled: !!id,
  });
}

export function useToggleVideo(playlistId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, completed }: { id: string; completed: boolean }) =>
      videoSvc.toggleVideo(id, completed),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["playlist", playlistId] });
      qc.invalidateQueries({ queryKey: PLAYLISTS_KEY });
    },
  });
}
