import CircularProgress from '@mui/icons-material/Loop'

interface LoadingSpinnerProps {
  size?: number
  message?: string
}

export default function LoadingSpinner({ size = 40, message }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <CircularProgress
        className="animate-spin text-blue-600"
        sx={{ fontSize: size }}
      />
      {message && (
        <p className="mt-4 text-sm text-gray-600">{message}</p>
      )}
    </div>
  )
}
