import Link from 'next/link'
import TrendingUp from '@mui/icons-material/TrendingUp'
import Speed from '@mui/icons-material/Speed'
import Analytics from '@mui/icons-material/Analytics'
import Security from '@mui/icons-material/Security'
import CheckCircle from '@mui/icons-material/CheckCircle'
import ArrowForward from '@mui/icons-material/ArrowForward'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-primary-600 to-accent-600">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1s'}} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center animate-slide-up">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 drop-shadow-lg">
              Focus Dash
            </h1>
            <p className="text-xl sm:text-2xl text-blue-50 max-w-3xl mx-auto mb-8 font-medium">
              Vertical Customer Success Command Centre
            </p>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-12 leading-relaxed">
              Transform your customer success operations with AI-powered insights, vertical-specific metrics, and the revolutionary Focus Pulse Score algorithm. Built for Tech, Healthcare, and Manufacturing industries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl text-primary-600 bg-white hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:shadow-glow hover:-translate-y-1"
              >
                Get Started Free
                <ArrowForward className="ml-2 group-hover:translate-x-1 transition-transform" sx={{ fontSize: 20 }} />
              </Link>
              <Link
                href="/login"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl text-white border-2 border-white/30 glass-dark backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
              >
                Sign In
                <div className="ml-2 group-hover:translate-x-1 transition-transform">→</div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
              Everything You Need for Customer Success
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Purpose-built for vertical industries with specialized metrics and insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="group bg-white rounded-2xl shadow-card p-8 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg">
                <Speed className="text-white" sx={{ fontSize: 28 }} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                Focus Pulse Score
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Proprietary 0-100 composite score combining Usage, Experience, Outcomes, and Risk with vertical-specific weighting.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white rounded-2xl shadow-card p-8 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg">
                <Analytics className="text-white" sx={{ fontSize: 28 }} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                Vertical Intelligence
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Industry-specific metrics for Tech (NRR, DAU), Healthcare (Uptime, HIPAA), and Manufacturing (OEE, ROI).
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white rounded-2xl shadow-card p-8 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg">
                <TrendingUp className="text-white" sx={{ fontSize: 28 }} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                Real-Time Analytics
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Live dashboards with trend analysis, risk detection, and predictive insights powered by advanced algorithms.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group bg-white rounded-2xl shadow-card p-8 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg">
                <Security className="text-white" sx={{ fontSize: 28 }} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">
                Multi-Tenant Security
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Enterprise-grade data isolation with role-based access control and complete tenant separation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Focus Pulse Score Explanation */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                The Focus Pulse Score Algorithm
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Our revolutionary scoring system combines four key dimensions of customer health into a single, actionable metric that drives strategic decisions.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="text-blue-600" sx={{ fontSize: 20 }} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Usage (35%)</h4>
                    <p className="text-gray-600">Active users, feature adoption, license utilization</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="text-green-600" sx={{ fontSize: 20 }} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Experience (25%)</h4>
                    <p className="text-gray-600">NPS, CSAT, support tickets, system uptime</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="text-purple-600" sx={{ fontSize: 20 }} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Outcomes (25%)</h4>
                    <p className="text-gray-600">ROI, business goals, value realization</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="text-red-600" sx={{ fontSize: 20 }} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Risk (15%)</h4>
                    <p className="text-gray-600">Churn indicators, payment issues, engagement drops</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 lg:mt-0">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-xl">
                <div className="text-center mb-8">
                  <div className="text-7xl font-bold text-blue-600 mb-2">85</div>
                  <div className="text-sm font-medium text-blue-800 uppercase tracking-wide">
                    Focus Pulse Score
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">Usage</span>
                      <span className="text-gray-600">88/100</span>
                    </div>
                    <div className="h-3 bg-white rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: '88%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">Experience</span>
                      <span className="text-gray-600">78/100</span>
                    </div>
                    <div className="h-3 bg-white rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: '78%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">Outcomes</span>
                      <span className="text-gray-600">90/100</span>
                    </div>
                    <div className="h-3 bg-white rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500" style={{ width: '90%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">Risk</span>
                      <span className="text-gray-600">15/100</span>
                    </div>
                    <div className="h-3 bg-white rounded-full overflow-hidden">
                      <div className="h-full bg-red-500" style={{ width: '15%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Solutions */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Built for Your Industry
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Specialized metrics and workflows tailored to your vertical
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tech Vertical */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-blue-500">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Technology</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-blue-500 mt-0.5" sx={{ fontSize: 20 }} />
                  <span>Net Revenue Retention (NRR)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-blue-500 mt-0.5" sx={{ fontSize: 20 }} />
                  <span>Daily/Monthly Active Users</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-blue-500 mt-0.5" sx={{ fontSize: 20 }} />
                  <span>Feature Adoption Rate</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-blue-500 mt-0.5" sx={{ fontSize: 20 }} />
                  <span>API Usage & Integration Depth</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-blue-500 mt-0.5" sx={{ fontSize: 20 }} />
                  <span>Time to Value (TTV)</span>
                </li>
              </ul>
            </div>

            {/* Healthcare Vertical */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-green-500">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Healthcare</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-0.5" sx={{ fontSize: 20 }} />
                  <span>System Uptime (99.9%+ SLA)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-0.5" sx={{ fontSize: 20 }} />
                  <span>HIPAA Compliance Score</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-0.5" sx={{ fontSize: 20 }} />
                  <span>Patient Record Processing Time</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-0.5" sx={{ fontSize: 20 }} />
                  <span>Clinical User Satisfaction (CSAT)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-0.5" sx={{ fontSize: 20 }} />
                  <span>Integration with EHR Systems</span>
                </li>
              </ul>
            </div>

            {/* Manufacturing Vertical */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-purple-500">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Manufacturing</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-purple-500 mt-0.5" sx={{ fontSize: 20 }} />
                  <span>Overall Equipment Effectiveness (OEE)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-purple-500 mt-0.5" sx={{ fontSize: 20 }} />
                  <span>Production ROI & Cost Savings</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-purple-500 mt-0.5" sx={{ fontSize: 20 }} />
                  <span>Downtime Reduction %</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-purple-500 mt-0.5" sx={{ fontSize: 20 }} />
                  <span>Supply Chain Integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-purple-500 mt-0.5" sx={{ fontSize: 20 }} />
                  <span>Quality Control Metrics</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-24 bg-gradient-to-br from-blue-600 via-primary-600 to-accent-600 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1s'}} />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg animate-fade-in">
            Ready to Transform Your Customer Success?
          </h2>
          <p className="text-xl text-blue-50 mb-12 leading-relaxed max-w-2xl mx-auto">
            Join leading organizations using Focus Dash to drive retention, growth, and customer satisfaction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Link
              href="/signup"
              className="group inline-flex items-center justify-center px-10 py-4 text-lg font-semibold rounded-xl text-primary-600 bg-white hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:shadow-glow hover:-translate-y-1"
            >
              Start Free Trial
              <ArrowForward className="ml-2 group-hover:translate-x-1 transition-transform" sx={{ fontSize: 20 }} />
            </Link>
            <Link
              href="/login"
              className="group inline-flex items-center justify-center px-10 py-4 text-lg font-semibold rounded-xl text-white border-2 border-white/30 glass-dark backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
            >
              Sign In
              <div className="ml-2 group-hover:translate-x-1 transition-transform">→</div>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Focus Dash</h3>
              <p className="text-sm">
                Vertical Customer Success Command Centre by BETTROI FZE
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#features" className="hover:text-white">Features</Link></li>
                <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
                <li><Link href="/signup" className="hover:text-white">Sign Up</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#about" className="hover:text-white">About</Link></li>
                <li><Link href="#contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#docs" className="hover:text-white">Documentation</Link></li>
                <li><Link href="#support" className="hover:text-white">Support</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2024 BETTROI FZE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
