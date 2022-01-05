import { makeExecutableSchema } from "@graphql-tools/schema";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const typeDefs = mergeTypeDefs(loadedTypes);

const loadedResolvers = loadFilesSync(
  `${__dirname}/**/*.{queries,mutations}.js`
);
const resolvers = mergeResolvers(loadedResolvers);

const schema = makeExecutableSchema({ typeDefs, resolvers });
export default schema;
