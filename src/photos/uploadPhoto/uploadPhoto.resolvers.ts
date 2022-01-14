import { Resolver, Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolverFn: Resolver = async (_, { file, caption }, { loggedInUser }) => {
  if (caption) {
    /// parse caption
    // get or create Hashtags
    const hashtags = caption.match(/#[\w]+/g);
    console.log(hashtags);
  }
  // save the photo Whit the parsed hashtags
  // add the photo to the hashtags
};

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: protectedResolver(resolverFn),
  },
};

export default resolvers;
