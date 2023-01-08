import { useEvent, useStore } from "effector-react"
import { NextPage } from "next"
import { useEffect, useState } from "react"

import { createEffect, createEvent, createStore, sample } from "effector"

const pageLoaded = createEvent()

const $query = createStore("")
$query.watch((v) => console.log("$query", v))

sample({
  source: pageLoaded.map(() => "testq"),
  target: $query,
})

const $result = createStore<string>("")
$result.watch((v) => console.log("$result", v))

const searchFx = createEffect<string, string, Error>({
  name: "searchFx",
  handler: async (query) => {
    await new Promise((res) => setTimeout(res, 1000))
    return query
  },
})
searchFx.doneData.watch((v) => console.log("searchFx.doneData", v))

sample({
  source: $query,
  target: searchFx,
})

sample({
  source: searchFx.doneData,
  target: $result,
})

const Search: NextPage = () => {
  const query = useStore($query)
  const result = useStore($result)
  const pageLoadedL = useEvent(pageLoaded)
  useEffect(() => {
    pageLoadedL()
  }, [pageLoadedL])
  console.log("result in render", result)

  const [t, setT] = useState("a")
  useEffect(() => {
    setTimeout(() => setT("b"), 1000)
  }, [])
  return (
    <div>
      <div>
        query: {query}
      </div>
      <div>
        result: {result}
      </div>
      <div>
        t: {t}
      </div>
    </div>
  )
}

export default Search
