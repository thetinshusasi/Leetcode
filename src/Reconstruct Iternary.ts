// You are given a list of airline tickets where tickets[i] = [fromi, toi] represent the departure and the arrival airports of one flight. Reconstruct the itinerary in order and return it.

// All of the tickets belong to a man who departs from "JFK", thus, the itinerary must begin with "JFK". If there are multiple valid itineraries, you should return the itinerary that has the smallest lexical order when read as a single string.

// For example, the itinerary ["JFK", "LGA"] has a smaller lexical order than ["JFK", "LGB"].
// You may assume all tickets form at least one valid itinerary. You must use all the tickets once and only once.

function findItinerary(tickets: string[][], startCity: string = "JFK"): string[] {

    const hashMap: { [key: string]: string[] } = {}

    for (let i = 0; i < tickets.length; i++) {

        const [from, to] = tickets[i]

        if (hashMap[from]) {
            hashMap[from].push(to)
        } else {
            hashMap[from] = [to]
        }
    }

    Object.keys(hashMap).forEach(item => {
        hashMap[item].sort()
    })

    const queue: string[] = [startCity]
    const res: string[] = []

    while (queue.length) {
        const currentCity = queue[queue.length - 1]


        if (hashMap[currentCity] && hashMap[currentCity].length) {
            const val = hashMap[currentCity].shift()
            queue.push(val || "")
            continue
        }

        const poppedVal = queue.pop()
        res.unshift(poppedVal || "")


    }

    return res




};


function findItinerary1(tickets: string[][], startCity: string = "JFK"): string[] {
    const hashMap: Map<string, string[]> = new Map()

    tickets.forEach(item => {
        const [from, to] = item
        if (hashMap.has(from)) {
            hashMap.set(from, [...hashMap.get(from) || [], to])
        } else {
            hashMap.set(from, [to])
        }
    })

    const keys = Array.from(hashMap.keys())

    for (let i = 0; i < keys.length; i++) {
        const val = hashMap.get(keys[i]) || []
        val.sort((a, b) => a.localeCompare(b))
        hashMap.set(keys[i], val)
    }

    const queue: string[] = []
    queue.push(startCity)

    let resArr: string[] = []

    while (queue.length) {
        const currCity = queue[queue.length - 1]
        if (hashMap.has(currCity) && hashMap.get(currCity)?.length) {

            const val = hashMap.get(currCity)
            const value = val?.shift()
            queue.push(value || "")

            continue
        }
        const poppedVal = queue.pop()
        resArr.unshift(poppedVal || "")

    }

    return resArr


}


console.log(findItinerary1([["JFK", "SFO"], ["JFK", "ATL"], ["SFO", "ATL"], ["ATL", "JFK"], ["ATL", "SFO"]]))