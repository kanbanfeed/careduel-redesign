'use client'

import { motion } from 'framer-motion'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { 
  ArrowRight, 
  Users, 
  Calendar, 
  FileText, 
  Award, 
  Shield,
  DollarSign,
  Clock,
  CheckCircle,
  Crown,
  Star
} from 'lucide-react'

export default function Home() {
  const router = useRouter()
  const { user, signInWithCrowbar, loading } = useAuth()

  const handleGetStarted = () => {
    if (user) {
      router.push('/dashboard')
    } else {
      signInWithCrowbar()
    }
  }

  const handleViewDemo = () => {
    if (user) {
      router.push('/dashboard')
    } else {
      // For demo, we'll still allow viewing dashboard but it will redirect to login
      router.push('/dashboard')
    }
  }

  const handleCrowbarLogin = () => {
    signInWithCrowbar()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading CareDuel...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      {/* Crowbar Top Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 px-4 text-center text-sm font-semibold">
        <div className="flex items-center justify-center gap-2">
          <Crown className="w-4 h-4" />
          <span>Crowbar Members Get Priority Visibility + Lifetime Access</span>
          <Crown className="w-4 h-4" />
        </div>
      </div>

      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-4 flex flex-col gap-2">
                <span className="bg-purple-100 text-purple-800 text-sm font-semibold px-3 py-1 rounded-full w-fit">
                  Early-access placeholder — Full features launching soon
                </span>
                <span className="bg-amber-100 text-amber-800 text-sm font-semibold px-3 py-1 rounded-full w-fit flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  Part of the Crowbar Connected Network
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Smart Healthcare
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"> Fair Pricing</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                CareDuel is the marketplace for specialized care. Connect with top-rated doctors who bid for your case. Transparent, fast, and secure.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <motion.button
                  onClick={handleGetStarted}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {user ? 'Go to Dashboard' : 'Start Your Health Journey'}
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                
                <motion.button
                  onClick={handleViewDemo}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-50 transition-all duration-300"
                >
                  {user ? 'View Dashboard' : 'View Demo'}
                </motion.button>
              </div>

              {/* Crowbar Login Button - Only show when user is not logged in */}
              {!user && (
                <motion.button
                  onClick={handleCrowbarLogin}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 mb-6"
                >
                  <Crown className="w-5 h-5" />
                  Login with Crowbar SSO
                  <Crown className="w-5 h-5" />
                </motion.button>
              )}

              {/* User welcome message when logged in */}
              {user && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6"
                >
                  <div className="flex items-center gap-2 text-green-800">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Welcome back! Ready to continue your health journey?</span>
                  </div>
                </motion.div>
              )}

              {/* Stats */}
              <div className="flex items-center gap-8 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span>2,000+ Providers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-green-600" />
                  <span>Top-rated Doctors</span>
                </div>
                <div className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-amber-500" />
                  <span>Crowbar Verified</span>
                </div>
              </div>
            </motion.div>

            {/* Right Content - Appointment Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md mx-auto border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                    Appointment Set
                  </span>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <Crown className="w-4 h-4 text-amber-500" />
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">EW</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Dr. Emily White</h3>
                    <p className="text-sm text-gray-600">Cardiologist Specialist</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Crown className="w-3 h-3 text-amber-500" />
                      <span className="text-xs text-amber-600 font-semibold">Crowbar Priority</span>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Winning Bid</span>
                    <span className="text-2xl font-bold text-purple-600">$150</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-600">30% below average</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Dec 15, 2023</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>2:30 PM</span>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-full shadow-lg">
                <span className="text-sm font-semibold">Joined last month</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Crown className="w-6 h-6 text-amber-500" />
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent font-bold text-lg">
                Crowbar Connected
              </span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose CareDuel?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Revolutionizing healthcare with transparent pricing and top-quality care
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <DollarSign className="w-8 h-8" />,
                title: 'Competitive Bidding',
                description: 'Doctors bid for your case, ensuring you get the best price for quality care',
                crowbar: true
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'Verified Providers',
                description: 'All doctors are thoroughly vetted and top-rated in their specialties',
                crowbar: true
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: 'Fast Matching',
                description: 'Get matched with qualified doctors in hours, not weeks'
              },
              {
                icon: <FileText className="w-8 h-8" />,
                title: 'Transparent Process',
                description: 'Clear pricing and terms with no hidden fees or surprises'
              },
              {
                icon: <Calendar className="w-8 h-8" />,
                title: 'Easy Scheduling',
                description: 'Book appointments that fit your schedule seamlessly'
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: '2,000+ Providers',
                description: 'Growing network of specialized healthcare professionals',
                crowbar: true
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-white to-purple-50 rounded-2xl p-8 shadow-lg border border-purple-100 group hover:shadow-xl transition-all duration-300 relative"
              >
                {feature.crowbar && (
                  <div className="absolute -top-2 -right-2 bg-amber-500 text-white p-1 rounded-full">
                    <Crown className="w-4 h-4" />
                  </div>
                )}
                <div className="bg-purple-100 text-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Crown className="w-8 h-8 text-amber-300" />
            <span className="text-amber-300 font-bold text-lg">Crowbar Members Save 20% More</span>
            <Crown className="w-8 h-8 text-amber-300" />
          </div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-white mb-6"
          >
            Ready for Smarter Healthcare?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto"
          >
            Join thousands of patients getting better care at better prices through our bidding platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              onClick={handleGetStarted}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-2"
            >
              {user ? 'Go to Dashboard' : 'Get Started Free'}
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            
            {!user && (
              <motion.button
                onClick={handleCrowbarLogin}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-2"
              >
                <Crown className="w-5 h-5" />
                Login with Crowbar SSO
              </motion.button>
            )}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-purple-200 mt-6 text-sm"
          >
            Part of the Crowbar Connected Network • Priority access for members
          </motion.p>
        </div>
      </section>

      <Footer />
    </div>
  )
}