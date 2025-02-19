const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

const userExtractor = async (request, response, next) => {
    const token = getTokenFrom(request)

    if (!token) {
        return response.status(401).json({ error: 'token missimg' })
    }

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
}


    const errorHandler = (error, req, res, next) => {
        logger.error(error.message)

        if (error.name === 'CastError') {
            return res.status(400).send({ error: 'malformatted id' })
        } else if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message })
        } else if (error.name === "TypeError") {
            return res.status(400).json({ error: "cant read id" })
        } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
            return response.status(400).json({ error: 'expected `username` to be unique' })
        } else if (error.name === 'JsonWebTokenError') {
            return response.status(401).json({ error: 'token invalid' })
        }

        next(error)
    }
    module.exports = { errorHandler, userExtractor}