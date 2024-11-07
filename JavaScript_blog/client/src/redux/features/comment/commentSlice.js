import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../../../utils/axios'


export const createComment = createAsyncThunk(
    'comment/createComment',
    async ({ postId, comment }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`/comments/${postId}`, {
                postId,
                comment,
            })
            return data
        } catch (error) {
            console.error(error)
            return rejectWithValue({ 
                message: error.response?.data?.message || 'Неизвестная ошибка' });
        }
    },
)

// Получение комментов
export const getPostComments = createAsyncThunk(
    'comment/getPostComments',
    async (postId, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/posts/comments/${postId}`)
            return data
        } catch (error) {
            console.error(error)
            return rejectWithValue({ 
                message: error.response?.data?.message || 'Неизвестная ошибка' });
        }
    },
)

export const deleteComment = createAsyncThunk(
    'comment/deleteComment',
    async ({postId, commentId}, { rejectWithValue }) => {
        try {
            await axios.delete(`/comments/${postId}/${commentId}`);
            return commentId; // Возвращаем ID удалённого комментария
        } catch (error) {
            console.error(error);
            return rejectWithValue({
                message: error.response?.data?.message || 'Неизвестная ошибка'
            });
        }
    }
);

export const commentSlice = createSlice({
    name: 'comment',
    initialState:{
        comments: [],
        loading: false,
        error: null, // Для хранения сообщений об ошибках
    },
    reducers: {},
    extraReducers: (builder) => {
        // Создание коммента
        builder
            .addCase(createComment.pending, (state) => {    
                state.loading = true
                state.error = null // сбрасываем ошибку перед запросом
            })  
            .addCase(createComment.fulfilled, (state, action) => {
                console.log('Созданный комментарий:', action.payload);
                state.loading = false
                state.comments.push(action.payload)
            }) 
            .addCase(createComment.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message // сохраняем сообщение об ошибке
            })
            // Получение всех комментов
        builder
            .addCase(getPostComments.pending, (state) => {
                state.loading = true
                state.error = null // сбрасываем ошибку перед запросом
            })
            .addCase(getPostComments.fulfilled, (state, action) => {
                state.loading = false
                state.comments = action.payload
            })
            .addCase(getPostComments.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message // сохраняем сообщение об ошибке
            })
            // Удаление коммента
            builder
            .addCase(deleteComment.fulfilled, (state, action) => {
                console.log('Удалённый ID:', action.payload); 
                state.comments = state.comments.filter(comment => comment._id !== action.payload);
            });
    }
})

export default commentSlice.reducer