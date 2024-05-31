import NewsApi from './newsApiOutput'
import AiNews from './aiNewsOutput'
import NyTimes from './nytimesOutput'
import SearchField from './searchField'

function HomePage() {
  return (
    <>
        <SearchField query={''} />
        <NewsApi />
      {/* <AiNews /> */}
      {/* <NyTimes /> */}
    </>
  )
}

export default HomePage