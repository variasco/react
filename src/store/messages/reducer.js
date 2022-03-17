import {
    SEND_MESSAGE,
    DELETE_MESSAGE,
    UPDATE_VALUE,
    CLEAR_CHAT,
} from "./types";
import { nanoid } from "nanoid";

const InitialState = {
    messages: {
        chat1: [
            { author: "User", text: "Hello", date: new Date(), id: nanoid() },
            {
                author: "Bot",
                text: "Hello, my friend",
                date: new Date(),
                id: nanoid(),
            },
        ],
    },
    value: "",
};

export const messagesReducer = (state = InitialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.payload.roomId]: [
                        ...(state.messages[action.payload.roomId] ?? []),
                        {
                            ...action.payload.message,
                            date: new Date(),
                            id: nanoid(),
                        },
                    ],
                },
            };
        case DELETE_MESSAGE:
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.payload.roomId]: [
                        ...state.messages[action.payload.roomId].filter(
                            (message) =>
                                message.id !== action.payload.messageId,
                        ),
                    ],
                },
            };
        case UPDATE_VALUE:
            return { ...state, ...action.payload };
        case CLEAR_CHAT:
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.payload]: [],
                },
            };
        default:
            return state;
    }
};
