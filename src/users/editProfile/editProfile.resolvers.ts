import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";
import { GraphQLUpload } from "graphql-upload";
import { Resolver, Resolvers } from "../../types";

const resolverFn:Resolver = async (
  _,
  { firstName, lastName, userName, email, password: newPassword, bio },
  { loggedInUser, client }
) =>
  //context는 graphql resolver의 4번째 arg. 모든 resolver에서 접근가능한 정보를 넣을 수 있는 object : 여기 말고도 createAccout나 login 에서도 접근 가능하다는것
  //Constext의 정의는 appoloserver가 있는 server 에서 정의할 수 있음
  //위에서는 {token}의 obejct 정보를 갖고와서 여기서 사용된다.
  //이후에 loggedInUser로 변경되어서 사용된다.
  {
    let uglyPassword = null;
    if (newPassword) {
      uglyPassword = await bcrypt.hash(newPassword, 10);
    }
    const updatedUser = await client.user.update({
      where: {
        id: loggedInUser.id,
      },
      data: {
        firstName,
        lastName,
        userName,
        bio,
        email,
        ...(uglyPassword && { password: uglyPassword }),
        //uglyPassword가 true 면 Password = uglyPassword 한다. ...은 중괄호를 풀어주는 역할.
      },
    });
    if (updatedUser.id) {
      return {
        ok: true,
      };
    } else {
      return {
        ok: false,
        error: "Could not update profile",
      };
    }
  };

  const resolvers:Resolvers = {
  Mutation: {
    editProfile: protectedResolver(resolverFn),
    //protectedResolver를 이용해서 먼저 검증을 해서 return을 root,args,contex,info 를 받을 수 있고 해당 정보로 아래 fn을 진행한다.
  },
  Upload: GraphQLUpload,
};

export default resolvers
