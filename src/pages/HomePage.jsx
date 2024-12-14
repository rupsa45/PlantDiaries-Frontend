import Layout from '../Layout/Layout'
import HeroSection from '../Components/HeroSection'
import FeatureSections from '../Components/FeatureSections'

const HomePage = () => {
  return (
    <div>
      <Layout>
        <HeroSection/>
        <FeatureSections/>
      </Layout>
    </div>
  )
}

export default HomePage
