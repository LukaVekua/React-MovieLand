import '../styles/showsPage.scss'
import CurrentShow from "../components/CurrentShows.js"
import ShowsFilter from "../components/ShowsFilter.js"
import ShowsList from "../components/ShowsList.js"
import TrendingShows from "../components/TrendingShows.js"
import People from '../components/People'
const Shows = () => {

    return <main>
        <People />
        <CurrentShow />
        <TrendingShows />
        <ShowsFilter />
        <ShowsList />

    </main >
}

export default Shows