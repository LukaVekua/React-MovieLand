import { configureStore, createSlice } from '@reduxjs/toolkit'
import { click } from '@testing-library/user-event/dist/click'
import { act } from 'react-dom/test-utils'



const auth = createSlice({
    name: 'auth',
    initialState: {
        isWrong: null,
        isAuthenticated: false,
        user: null,
        favouriteShows: []
    },
    reducers: {
        login(state, { payload }) {
            let { name, password } = payload
            if (name === 'test' && password === 'test123') {
                state.isWrong = false
                state.isAuthenticated = true
                state.user = name
            } else {
                state.isWrong = true
            }
        },
        logout(state) {
            state.isAuthenticated = false
            state.user = null

        },
        fadeWarning(state) {
            state.isWrong = null
        },
        addToFavourite(state, { payload }) {
            const show = payload.show
            const isExisted = state.favouriteShows.find(favShow => favShow.id === show.id)
            if (isExisted === undefined) {
                state.favouriteShows.push(show)
            }
        },
        deleteFavourite(state, { payload }) {
            const showId = payload
            state.favouriteShows = state.favouriteShows.filter(favShow => favShow.id !== showId)
        }
    }
})
export const authActions = auth.actions

const show = createSlice({
    name: "show",
    initialState: {
        initialShows: [],
        filteredShows: [],
        initialTrendingShows: [],
        trendingShows: []

    },
    reducers: {
        fetchShows(state, action) {
            state.initialShows = action.payload
            if (state.filteredShows.length === 0) {
                state.filteredShows = action.payload
            }
        },
        filterShowsByGenres(state, action) {
            let clickedGenres = action.payload
            const updated = state.initialShows.filter(show => {
                let genresOfShow = show.genres
                let isCommon = []
                for (let i = 0; i < genresOfShow.length; i++) {
                    for (let j = 0; j < clickedGenres.length; j++) {
                        if (genresOfShow[i] === clickedGenres[j]) {
                            isCommon.push(true)
                        } else {
                            isCommon.push(false)
                        }
                    }
                }
                if (isCommon.includes(true)) {
                    return show
                }
            })
            if (clickedGenres.length !== 0) {
                state.filteredShows = updated
            } else {
                state.filteredShows = state.initialShows
            }

        },
        filterShowsByLatest(state) {
            state.filteredShows = state.initialShows.filter(show => {
                let showYear = parseInt(show.premiered.slice(0, 4))
                if (showYear > 2012) {
                    return show
                }
            })
        },
        filterShowsByYear(state, action) {
            let filterBy = action.payload
            if (filterBy !== '') {
                state.filteredShows = state.initialShows.filter(show => {
                    let showYear = parseInt(show.premiered.slice(0, 4))
                    if (showYear === parseInt(filterBy)) {
                        return show
                    }
                })
            } else {
                state.filteredShows = state.initialShows
            }
        },
        filterByAlphabet(state, action) {
            let filterBy = action.payload
            if (filterBy !== '') {
                state.filteredShows = state.filteredShows.filter(show => {
                    let title = show.name
                    if (title[0] === filterBy) {
                        return show
                    }
                })
            }
            else {
                state.filteredShows = state.initialShows
            }
        },
        filterByRating(state, action) {
            let filterBy = action.payload
            state.filteredShows = state.initialShows.filter(show => show.rating.average >= filterBy)
        },
        filterByName(state, action) {
            state.filteredShows = state.initialShows.filter(show => {
                let showName = show.name.toLowerCase()
                let typedName = action.payload.toLowerCase()
                if (showName.includes(typedName)) {
                    return show
                }
            })
        },
        fitTrends(state, action) {
            state.initialTrendingShows = action.payload
        },
        updateTrends(state, { payload }) {
            let genres = payload.genres.trendingsGenres
            const updated = state.initialTrendingShows.filter(show => {
                const result = genres.filter(genre => {
                    if (show.genres.includes(genre)) {
                        return genre
                    }
                })
                if (result.length !== 0) return show

            }
            )
            if (genres.length !== 0) {
                state.trendingShows = updated
            } else {
                state.trendingShows = state.initialTrendingShows
            }
        },
        restartShows(state) {
            state.filteredShows = state.initialShows
        }
    }
})
export const showActions = show.actions

const genres = createSlice({
    name: "genres",
    initialState: {
        genres: [],
        trendingsGenres: []
    },
    reducers: {
        interactGenre(state, action) {
            let genre = action.payload
            let isExisted = state.genres.includes(genre)
            if (isExisted) {
                state.genres = state.genres.filter(gen => gen !== genre)
            } else if (!isExisted) {
                state.genres.push(genre)
            }

        },
        interactTrendingsGenres(state, action) {
            let genre = action.payload
            let isExisted = state.trendingsGenres.includes(genre)
            if (isExisted) {
                state.trendingsGenres = state.trendingsGenres.filter(gen => gen !== genre)
            } else if (!isExisted) {
                state.trendingsGenres.push(genre)
            }
        }

    }
})
export const genresAction = genres.actions

const people = createSlice({
    name: 'people',
    initialState: {
        people: [],
        searchedPeople: null
    },
    reducers: {
        deliverPeople(state, action) {
            state.people = action.payload
        },
        search(state, action) {
            let term = action.payload
            console.log(term)
            const updated = state.people.filter((person) => {
                let validPersonName = person.name.toLowerCase()
                let validTerm = term.toLowerCase()
                if (validPersonName.includes(validTerm)) {
                    return person
                }
            })
            let constructed = null;
            if (updated.length > 13) {
                constructed = updated.filter((x, index) => index < 10)
            } else {
                constructed = updated
            }
            state.searchedPeople = constructed
        },
        restorePeople(state) {
            state.searchedPeople = null
        }
    }
})
export const peopleAction = people.actions

const store = configureStore({
    reducer: {
        auth: auth.reducer,
        show: show.reducer,
        genres: genres.reducer,
        people: people.reducer
    }
})
export default store


export const genrez = [
    'Action',
    'Adult',
    'Adventure',
    'Anime',
    'Children',
    'Comedy',
    'Crime',
    'DIY',
    'Drama',
    'Espionage',
    'Family',
    'Fantasy',
    'Food',
    'History',
    'Horror',
    'Legal',
    'Medical',
    'Music',
    'Mystery',
    'Nature',
    'Romance',
    'Science-Fiction',
    'Sports',
    'Supernatural',
    'Thriller',
    'Travel',
    'Western',
    'War'
]
