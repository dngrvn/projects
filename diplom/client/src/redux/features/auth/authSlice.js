import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

// Регистрация пользователя
export const registerUser = createAsyncThunk(
    'auth/registerUser', 
    async ({ username, password, email, firstName, lastName, phoneNumber, dateOfBirth }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('/auth/register', {
                username,
                password,
                email,
                firstName,
                lastName,
                phoneNumber,
                dateOfBirth,
            });
            if (data.token) {
                window.localStorage.setItem('token', data.token);
            }
            return data;
        } catch (error) {
            console.error(error);
            return rejectWithValue({ 
                message: error.response?.data?.message || 'Ошибка при регистрации' 
            });
        }
    }
);

// Аутентификация
export const loginUser = createAsyncThunk( 'auth/loginUser', async ({ username, password }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('/auth/login', {
                username,
                password,
            })
            if (data.token) {
                window.localStorage.setItem('token', data.token)
            }
            return data
        } catch (error) {
            console.error(error)
            return rejectWithValue({ 
                message: error.response?.data?.message || 'Ошибка при регистрации' });
        }
    },
)

// Получение информации о пользователе
export const getMe = createAsyncThunk('auth/getMe', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get('/auth/me');
        return data;
    } catch (error) {
        console.error(error)
        return rejectWithValue({ 
            message: error.response?.data?.message || 'Неизвестная ошибка' });
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        isLoading: false,
        status: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null
            state.token = null
            state.isLoading = false
            state.status = null
        },
    },
    extraReducers: (builder) => {
        // Регистрация пользователя
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
                state.status = null
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                
                state.isLoading = false
                state.status = action.payload.message
                state.user = action.payload.user
                state.token = action.payload.token
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false
                state.status = action.payload.message
            })

        // Аутентификация
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
                state.status = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.status = action.payload.message
                state.user = action.payload.user
                state.token = action.payload.token
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false
                state.status = action.payload.message
            })

        // Получение информации о пользователе
        builder
            .addCase(getMe.pending, (state) => {
                state.isLoading = true
                state.status = null
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.isLoading = false
                state.status = null
                state.user = action.payload.user
                state.token = action.payload.token
            })
            .addCase(getMe.rejected, (state, action) => {
                state.isLoading = false
                state.status = action.payload.message
            })
    },
})

export const checkIsAuth = (state) => {
    return !!state.auth.token
}

export const { logout } = authSlice.actions
export default authSlice.reducer