import ErrorOutline from '@mui/icons-material/ErrorOutline'

interface ErrorMessageProps {
  title?: string
  message: string
  retry?: () => void
}

export default function ErrorMessage({ title = 'Error', message, retry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
        <div className="flex items-start gap-3">
          <ErrorOutline className="text-red-600 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-red-900">{title}</h3>
            <p className="mt-1 text-sm text-red-700">{message}</p>
            {retry && (
              <button
                onClick={retry}
                className="mt-4 text-sm font-medium text-red-600 hover:text-red-500"
              >
                Try again
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
