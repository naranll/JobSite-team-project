import Link from "next/link";

export default function SideMenu(): JSX.Element {
  return (
    <div>
      <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <Link
          href="/"
          className="block w-full px-4 py-2 text-white bg-blue-700 border-b border-gray-200 rounded-t-lg cursor-pointer dark:bg-gray-800 dark:border-gray-60"
        >
          <li>Dashboard</li>
        </Link>
        <Link
          href="/"
          className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >
          <li>Jobs</li>
        </Link>
        <Link href="/">
          <li>Users</li>
        </Link>
        <Link href="/">
          <li>Applications</li>
        </Link>
        <Link href="/">
          <li>Admin</li>
        </Link>
      </ul>
    </div>
  );
}
