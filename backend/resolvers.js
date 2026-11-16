
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { randomUUID } = require("crypto");
const {
  createUser,
  findUserByEmail,
  findUserById
} = require("./users");

const resolvers = {
  Query: {
    health: () => "GraphQL API funcionando!",

    me: (_, __, { req }) => {
      const token = req.cookies.token;

      if (!token) {
        return null;
      }

      try {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET
        );

        const user = findUserById(decoded.userId);

        if (!user) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email
        };
      } catch {
        return null;
      }
    }
  },

  Mutation: {
    register: async (_, { name, email, password }) => {
      const existingUser = findUserByEmail(email);

      if (existingUser) {
        throw new Error("E-mail já cadastrado.");
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const user = {
        id: randomUUID(),
        name,
        email,
        password: passwordHash
      };

      createUser(user);

      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        },
        message: "Usuário cadastrado com sucesso!"
      };
    },

    login: async (_, { email, password }, { res }) => {
      const user = findUserByEmail(email);

      if (!user) {
        throw new Error("E-mail ou senha inválidos.");
      }

      const passwordMatches = await bcrypt.compare(
        password,
        user.password
      );

      if (!passwordMatches) {
        throw new Error("E-mail ou senha inválidos.");
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 1000
      });

      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        },
        message: "Login realizado com sucesso!"
      };
    },

    logout: () => {
      return "Logout ainda não implementado.";
    }
  }
};

module.exports = resolvers;
