import { Spinner } from "@nextui-org/react"
import { TitCard } from "../cards"
import { STable } from "../tables"

const ALeaderboard = () => {
  const leaderboardList = [
    [1, 'AWJDIVVBOFNZ', 'X86', 'ABC', '475 $REACH'],
    [2, 'AWJDIVVBOFNZ', 'X86', 'ABC', '475 $REACH'],
  ]

  return <>
    <TitCard
      tit="Leaderboard"
      className="flip_item w-full mt-[1.875rem]"
    >
      <STable
        isLoading={false}
        loadingContent={<Spinner />}
        empty="You currently have no running nodes. Click 'Add New Node' button, download and set up your node ready for the Season 1!"
        head={[
          "#",
          "Edge Node ID",
          "Node Type",
          'Region',
          'Rewards Today'

        ]}
        data={leaderboardList}
      />
      {/* {pageChunks.length > 1 && (
        <div className="flex items-center">
          <Pagination className="mx-auto" classNames={PaginationClassNames} total={pageChunks.length} page={page} onChange={onSwitchPage} />
        </div>
      )} */}
    </TitCard>
  </>

}

export default ALeaderboard