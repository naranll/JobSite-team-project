import { useUserContext } from "@/context/UserContext";
import { UserType } from "@/util/types";
import { GetStaticProps, GetStaticPropsContext } from "next";

export default function User({ data: user }: { data: UserType }): JSX.Element {
  console.log("user profile page", user);
  const { currentUser } = useUserContext();

  return (
    <div>
      {currentUser ? (
        <div className="flex border mx-auto w-full px-8 py-8 rounded-lg justify-around min-h-screen">
          <div className="border-2 rounded-lg w-2/5 h-32">
            <ul className="text-center font-semibold">
              <li className="bg-blue-500 rounded-lg">Profile</li>
              <li>Posted</li>
              <li>Applied</li>
              <li>History</li>
            </ul>
          </div>
          <div className="flex border-2 justify-between rounded-lg">
            <div className="flex-col m-5">
              <div className="w-full">
                <picture>
                  <img className="rounded-full" src={user.image} alt="sample" />
                </picture>
              </div>

              <div className="border text-center font-semibold rounded-lg bg-slate-400 cursor-pointer text-white">
                edit
              </div>
            </div>
            <div className="flex-col m-5 w-3/5">
              <div className=" border-2 rounded-lg p-2">{user.email}</div>
              <div className=" border-2 rounded-lg p-2">{user.firstName}</div>
              <div className=" border-2 rounded-lg p-2">{user.lastName}</div>
              <div className=" border-2 rounded-lg p-2">
                Phone number: {user.phoneNumber ? user.phoneNumber : null}
              </div>
              <div className=" border-2 rounded-lg p-2">
                gender : {user.gender ? user.gender : null}
              </div>
              <div className="border-2 rounded-lg h-1/4">CV</div>
            </div>
          </div>
        </div>
      ) : (
        <div> u shouldn't be here </div>
      )}
    </div>
  );
}

export const getStaticPaths = async () => {
  const result = await fetch(`http://localhost:8008/user/user_id`);
  const resultUser = await result.json();
  const paths = await resultUser.map((id: { _id: string }) => ({
    params: { id: id._id },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

interface UserProps {
  data: UserType | null;
}

export const getStaticProps: GetStaticProps<UserProps> = async ({
  params,
}: GetStaticPropsContext) => {
  const res = await fetch(`http://localhost:8008/user/${params?.id}`);
  const resJson = await res.json();
  return {
    props: {
      data: resJson,
    },
  };
};
