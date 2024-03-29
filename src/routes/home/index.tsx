import {useState} from 'react'
import Hero from "../../components/hero/Hero"
import Nav from "../../components/nav/Nav"
import Sidebar from "../../components/sidebar/Sidebar"
import Container from "../../components/container/Container"
import Footer from '../../components/footer/Footer'

const Home = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");


  return (
    <div className="home">
      <Sidebar />
      <Container>
      <Nav setSearchQuery={setSearchQuery} />
      <Hero searchQuery={searchQuery} />
      <Footer/>
      </Container>
    </div>
  )
}

export default Home