import { refreshToken } from './user/actions';

import type { RootState } from './store';
import type { ITokenUpdate } from '@/utils/types';
import type {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  Middleware,
} from '@reduxjs/toolkit';

type TWsActions<R, M> = {
  connect: ActionCreatorWithPayload<string>;
  disconnect: ActionCreatorWithoutPayload;
  onMessage: ActionCreatorWithPayload<R>;
  onError: ActionCreatorWithPayload<string>;
  sendMessage?: ActionCreatorWithPayload<M>;
  onConnecting?: ActionCreatorWithoutPayload;
  onOpen?: ActionCreatorWithoutPayload;
  onClose?: ActionCreatorWithoutPayload;
};

const DELAY = 3000;

export const wsMiddleware = <Response, Message>(
  wsActions: TWsActions<Response, Message>,
  needTokenRefresh = false
): Middleware<object, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    const {
      connect,
      disconnect,
      onMessage,
      onError,
      sendMessage,
      onOpen,
      onClose,
      onConnecting,
    } = wsActions;
    let isConnected = false;
    let reconnectingTimer = 0;
    const { dispatch } = store;

    return (next) => (action) => {
      if (connect.match(action)) {
        const url = action.payload;
        socket = new WebSocket(url);
        onConnecting && dispatch(onConnecting());

        socket.onopen = (): void => {
          onOpen && dispatch(onOpen());
          isConnected = true;
        };

        socket.onerror = (): void => {
          dispatch(onError('Error'));
        };

        socket.onclose = (): void => {
          onClose && dispatch(onClose());

          if (isConnected) {
            reconnectingTimer = window.setTimeout(() => {
              dispatch(connect(url));
            }, DELAY);
          }
        };

        socket.onmessage = (event: MessageEvent): void => {
          try {
            const data = String(event.data);
            const parsedData = JSON.parse(data) as Response;

            if (
              needTokenRefresh &&
              parsedData &&
              typeof parsedData === 'object' &&
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

            dispatch(onMessage(parsedData));
          } catch (error) {
            dispatch(onError((error as { message: string }).message));
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
