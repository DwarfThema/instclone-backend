import client from "../../client";
import { uploadToS3 } from "../../shared/shared.utils";
import { Resolver, Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";

const resolverFn: Resolver = async (_, { file, caption }, { loggedInUser }) => {
  let hashtagObj = [];
  if (caption) {
    /// parse caption
    hashtagObj = processHashtags(caption);
  }
  const fileUrl = await uploadToS3(file, loggedInUser.id, "uploads");
  // get or create Hashtags
  return client.photo.create({
    data: {
      file: fileUrl,
      caption,
      user: {
        connect: {
          id: loggedInUser.id,
        },
      },
      ...(hashtagObj.length > 0 && {
        hashtags: {
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
