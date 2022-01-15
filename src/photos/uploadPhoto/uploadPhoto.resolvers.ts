import client from "../../client";
import { Resolver, Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolverFn: Resolver = async (_, { file, caption }, { loggedInUser }) => {
  let hashtagObj = [];
  if (caption) {
    /// parse caption
    const hashtags = caption.match(/#[\w]+/g);
    hashtagObj = hashtags.map((hashtag) => ({
      where: { hashtag },
      create: { hashtag },
    }));
    console.log(hashtags);
  }
  // get or create Hashtags
  return client.photo.create({
    data: {
      file,
      caption,
      user: {
        connect: {
          id: loggedInUser.id,
        },
      },
      ...(hashtagObj.length > 0 && {
        hashtag: {
          connectOrCreate: hashtagObj,
        },
      }),
    },
  });
  // save the photo Whit the parsed hashtags
  // add the photo to the hashtags
};

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: protectedResolver(resolverFn),
  },
};

export default resolvers;
