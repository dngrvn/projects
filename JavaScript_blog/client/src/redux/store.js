import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './features/auth/authSlice'
import { postSlice } from './features/post/postSlice'
import { commentSlice } from './features/comment/commentSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        post: postSlice.reducer,
        comment: commentSlice.reducer
    },
    // middleware: (getDefaultMiddleware) => 
    //     getDefaultMiddleware().concat(
    //         authSlice.middleware,
    //         postSlice.middleware,
    //         commentSlice.middleware),
    // devTools: ProcessingInstruction.env.NODE_ENV !== 'production', // Включаем инструменты разработчика только в режиме разработки
})

