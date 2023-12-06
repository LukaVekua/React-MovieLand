import { QueryClient } from '@tanstack/react-query'
export const client = new QueryClient()

export default async function fetchShows({ showId }) {
    const response = await fetch('https://api.tvmaze.com/shows')
    const data = await response.json()
    if (showId) {
        const [show] = data.filter(show => show.id == showId)
        return show
    }
    return data
}

export async function fetchCast({ showId }) {
    const response = await fetch(`https://api.tvmaze.com/shows/${showId}/cast`)
    const data = await response.json()
    return data

}

export async function fetchTrendings() {
    const response = await fetch('https://api.tvmaze.com/shows')
    const data = await response.json()
    const trendings = data.filter(show => show.rating.average > 8.2 && parseInt(show.premiered.slice(0, 4)) >= 2012)
    return trendings
}

export async function fetchPeople() {
    const response = await fetch('https://api.tvmaze.com/people')
    const data = await response.json()
    return data
}