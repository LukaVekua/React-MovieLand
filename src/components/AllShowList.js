import EmptyHandler from "./EmptyHandler"
import ShowSelf from "./ShowSelf"
const AllShow = ({ filteredShows, currentPage }) => {
    return <div id="all_shows" className="list-box">
        <EmptyHandler array={filteredShows} text='No show can be found for this criteria...' />
        {filteredShows.map((show, index) => {
            if (filteredShows.length > 25 && index >= 0 && index < 25 && currentPage === 1) {
                return <ShowSelf show={show} />
            } else if (filteredShows.length > 25 && index >= ((currentPage - 1) * 25) && index < currentPage * 25) {
                return <ShowSelf show={show} />
            } else if (filteredShows.length <= 25 && index <= 25) {
                return <ShowSelf show={show} />
            }
        })}

    </div >
}
export default AllShow