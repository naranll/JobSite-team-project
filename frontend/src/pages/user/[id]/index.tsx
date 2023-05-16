import { useUserContext } from "@/context/UserContext";
import { UserType } from "@/util/types";
import { GetStaticProps, GetStaticPropsContext } from "next";
import Link from "next/link";

export default function User({ data: user }: { data: UserType }): JSX.Element {
  console.log("user profile page", user);
  const { currentUser } = useUserContext();

  return (
    <div>
      <h1 className="text-center font-semibold bg-slate-100 rounded-lg">
        {user.email} profile
      </h1>
      <div className="relative border-2 rounded-lg w-[1280px] h-screen mx-auto p-5 flex gap-5 justify-center">
        <div className="border-2 rounded-lg h-min p-5 w-1/5">
          <ul>
            <Link href={`/user/${currentUser?._id}`}>
              <li className="">profile</li>
            </Link>
            <Link href={`/user/${currentUser?._id}/postedjobs`}>
              <li>posted</li>
            </Link>
            <Link href={`/user/${currentUser?._id}/appliedjobs`}>
              <li>applied</li>
            </Link>
            <Link href={`/user/${currentUser?._id}`}>
              <li>history</li>
            </Link>
          </ul>
        </div>
        <div className="flex border-2 rounded-lg w-3/5 justify-between p-5 h-min">
          <div className="flex flex-col gap-5 items-center w-1/5">
            <div className="">
              <picture>
                <img
                  className="rounded-full shadow-md"
                  src={user.image}
                  alt="user-profile"
                />
              </picture>
            </div>
            <div className="shadow-md border-2 rounded-lg text-center w-full cursor-pointer hover:bg-slate-400 hover:text-white">
              edit
            </div>
          </div>
          <div className="border-2 rounded-lg p-2 w-2/5 shadow-lg ">
            <form className="">
              <div className="flex flex-col mb-4">
                <label
                  className="mb-2 font-bold text-grey-darkest"
                  htmlFor="firstname"
                >
                  First Name :
                </label>
                <input
                  disabled
                  className="border-2 rounded-lg text-center py-1 px-2"
                  type="text"
                  defaultValue={user.firstName}
                />
              </div>
              <div className="flex flex-col mb-4">
                <label
                  className="mb-2 font-bold text-grey-darkest"
                  htmlFor="lastName"
                >
                  Last Name :
                </label>
                <input
                  disabled
                  className="border-2 rounded-lg text-center py-1 px-2"
                  type="text"
                  defaultValue={user.lastName}
                />
              </div>
              <div className="flex flex-col mb-4">
                <label
                  className="mb-2 font-bold text-grey-darkest"
                  htmlFor="Email"
                >
                  Email :
                </label>
                <input
                  disabled
                  className="border-2 rounded-lg text-center py-1 px-2"
                  type="email"
                  defaultValue={user.email}
                />
              </div>
            </form>
          </div>
          <div className="place-self-end shadow-md bottom-1 right-1 border-2 rounded-lg h-min px-2 hover:bg-slate-400 hover:text-white text-center cursor-pointer w-1/5">
            edit
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths = async () => {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_JOBSITE_HOST}/user/user_id`
  );
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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_JOBSITE_HOST}/user/${params?.id}`
  );
  const resJson = await res.json();
  return {
    props: {
      data: resJson,
    },
  };
};
