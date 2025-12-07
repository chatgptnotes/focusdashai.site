import InfoOutlined from '@mui/icons-material/InfoOutlined'

export default function VersionFooter() {
  const version = process.env.NEXT_PUBLIC_APP_VERSION || '1.0'
  const buildDate = process.env.NEXT_PUBLIC_BUILD_DATE || new Date().toISOString().split('T')[0]
  const repoName = 'focusdashai.site'

  return (
    <footer className="border-t border-gray-200 bg-white py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <InfoOutlined sx={{ fontSize: 14 }} />
            <span>Focus Dash v{version}</span>
            <span className="text-gray-300">|</span>
            <span>Last updated: {buildDate}</span>
            <span className="text-gray-300">|</span>
            <span>{repoName}</span>
          </div>
          <div className="text-gray-400">
            BETTROI FZE
          </div>
        </div>
      </div>
    </footer>
  )
}
