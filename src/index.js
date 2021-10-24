const { Neo4jGraphQL } = require("@neo4j/graphql");
const neo4j = require("neo4j-driver");
const { ApolloServer } = require("apollo-server");

const typeDefs = `
    type Movie {
        name: String
        year: Int
        imdbRating: Float
        genres: [Genre] @relationship(type: "IS_GENRE", direction: OUT)
    }

    type Genre {
        name: String
        movies: [Movie] @relationship(type: "IS_GENRE", direction: IN)
    }
`;

const driver = neo4j.driver(
    "bolt://3.85.159.244:7687",
    neo4j.auth.basic("neo4j", "demonstration-losses-jumps")
);

const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

const server = new ApolloServer({
    schema: neoSchema.schema,
    context: ({ req }) => ({ req }),
});

server.listen(4000).then(() => console.log("Online"));
