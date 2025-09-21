import { refreshToken } from './user/actions';

import type { RootState } from './store';
import type { ITokenUpdate } from '@/utils/types';
import type {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  Middleware,
} from '@reduxjs/toolkit';

type TWsActions<R, S> = {
  connect: ActionCreatorWithPayload<string>;
  disconnect: ActionCreatorWithoutPayload;
  sendMessage?: ActionCreatorWithPayload<S>;
  onConnecting: ActionCreatorWithoutPayload;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<R>;
};

const DELAY = 3000;

export const wsMiddleware = <R, S>(
  wsActions: TWsActions<R, S>,
  needTokenRefresh = false
): Middleware<object, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    const {
      connect,
      sendMessage,
      onOpen,
      onClose,
      onError,
      onMessage,
      onConnecting,
      disconnect,
    } = wsActions;
    let isConnected = false;
    let reconnectingTimer = 0;
    let url = '';

    return (next) => (action) => {
      const { dispatch } = store;

      if (connect.match(action)) {
        url = action.payload;
        socket = new WebSocket(url);
        onConnecting && dispatch(onConnecting());

        socket.onopen = (): void => {
          onOpen && dispatch(onOpen());
          isConnected = true;
        };

        socket.onerror = (): void => {
          dispatch(onError('Error'));
        };

        socket.onmessage = (event: MessageEvent): void => {
          const data = String(event.data);

          try {
            const parsedData = JSON.parse(data) as Response;

            if (
              needTokenRefresh &&
              parsedData &&
              'message' in parsedData &&
              parsedData.message === 'Invalid or missing token'
            ) {
              refreshToken()
                .then((refreshData) => {
                  const token = (refreshData as ITokenUpdate).accessToken;
                  if (!token) return;

                  const wssUrl = new URL(url);
                  wssUrl.searchParams.set('token', token.replace('Bearer ', ''));
                  dispatch(connect(wssUrl.toString()));
                })
                .catch((error) => {
                  dispatch(onError((error as { message: string }).message));
                });

              dispatch(disconnect());

              return;
            }

            dispatch(onMessage(parsedData as R));
          } catch (error) {
            dispatch(onError((error as { message: string }).message));
          }
        };

        socket.onclose = (): void => {
          dispatch(onClose());

          if (isConnected) {
            reconnectingTimer = window.setTimeout(() => {
              dispatch(connect(url));
            }, DELAY);
          }
        };
      }

      if (socket && sendMessage?.match(action)) {
        try {
          socket.send(JSON.stringify(action.payload));
        } catch (error) {
          dispatch(onError((error as { message: string }).message));
        }
      }

      if (socket && disconnect.match(action)) {
        clearTimeout(reconnectingTimer);
        isConnected = false;
        reconnectingTimer = 0;
        socket.close();
        socket = null;
      }

      next(action);
    };
  };
};
