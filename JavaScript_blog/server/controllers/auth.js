import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Register user
export const register = async (req, res) => {
    try {
        const { username, password, email, firstName, lastName, phoneNumber, dateOfBirth } = req.body;

        // Проверка существования пользователя
        const isUsed = await User.findOne({ $or: [{ username }, { email }, { phoneNumber }] });

        if (isUsed) {
            return res.status(400).json({ message: "User with this username already exists" });
        }
    
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

        // Создание нового пользователя
        const newUser = new User({
            username,
            password: hash,
            email,
            firstName,
            lastName,
            phoneNumber,
        });


        // Генерация токена
        const token = jwt.sign(
            {
                id: newUser._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: "30d" },
        );

    await newUser.save();

    res.status(201).json({
        user: newUser,
        token,
        message: "User created successfully"
    });
    
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
}

// Login user
export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })

        if (!user) {
            return res.json({
                message: 'Такого юзера не существует.',
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.json({
                message: 'Неверный пароль.',
            })
        }

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' },
        )

        res.json({
            token,
            user,
            message: 'Вы вошли в систему.',
        })
    } catch (error) {
        res.json({ message: 'Ошибка при авторизации.' })
    }
}

// Get Me
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        if (!user) {
            return res.json({
                message: 'Такого юзера не существует.',
            })
        }

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' },
        )

        res.json({
            user,
            token,
        })
    } catch (error) {
        res.json({ message: 'Нет доступа.' })
    }
}