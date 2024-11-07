import jwt from 'jsonwebtoken'

export const checkAuth = (req, res, next) => {
    // Извлечение токена из заголовка авторизации
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

    // Если токен присутствует, выполняем его валидацию
    if (token) {
        try {
            // Декодирование токена с использованием секретного ключа
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Сохранение идентификатора пользователя в запросе для дальнейшего использования
            req.userId = decoded.id

            // Переход к следующему middleware или маршруту
            next()
        } catch (error) {
            // В случае неудачной проверки токена возвращаем статус 403 (доступ запрещён)
            return res.status(403).json({
                message: 'Нет доступа.',
            })
        }
    } else {
        // В случае отсутствия токена возвращаем статус 401 (неавторизован)
        return res.status(401).json({
            message: 'Нет доступа. Токен отсутствует.',
        })
    }
}