import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md border border-green-100 max-w-md w-full text-center">
        <h1 className="text-3xl font-serif text-green-800 mb-4">Приглашение не найдено</h1>
        <p className="text-gray-600 mb-6">К сожалению, запрашиваемое приглашение не существует или было удалено.</p>
        <Link
          href="/"
          className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-300 inline-block"
        >
          Вернуться на главную
        </Link>
      </div>
    </div>
  )
}
