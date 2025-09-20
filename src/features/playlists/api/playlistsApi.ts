import type {
    CreatePlaylistArgs,
    FetchPlaylistsArgs,
    PlaylistData,
    PlaylistsResponse,
    UpdatePlaylistArgs
} from "@/features/playlists/api/playlistsApi.types.ts";
import {baseApi} from "@/app/baseApi.ts";


export const playlistsApi = baseApi.injectEndpoints({
    endpoints: build => ({
        fetchPlaylists: build.query<PlaylistsResponse, FetchPlaylistsArgs>({
            query: (params) => ({ url: 'playlists', params }),
            providesTags: ['Playlist']
        }),
        createPlaylist: build.mutation<{ data: PlaylistData }, CreatePlaylistArgs>({
            query: body => {
                return {
                    method: 'post',
                    url: `playlists`,
                    body
                }
            },
            invalidatesTags:['Playlist'],
        }),
        deletePlaylist: build.mutation<void, string>({
            query: (playlistId) => {
                return {
                    method: `delete`,
                    url: `playlists/${playlistId}`,
                }
            },
            invalidatesTags:['Playlist'],
        }),
        updatePlaylist: build.mutation<void, { playlistId: string, body: UpdatePlaylistArgs }>({
            query: ({playlistId, body}) => {
                return {
                    method: 'put',
                    url: `playlists/${playlistId}`,
                    body
                }
            },
            invalidatesTags:['Playlist'],
        }),
    }),
})


export const { useFetchPlaylistsQuery, useCreatePlaylistMutation, useDeletePlaylistMutation, useUpdatePlaylistMutation
} = playlistsApi