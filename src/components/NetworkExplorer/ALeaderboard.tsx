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
      className="flip_item w-full mt-[1.875rem] bg-[#6D6D6D66]"
    >
      <STable
        isLoading={false}
        loadingContent={<Spinner />}
        empty="No Data"
        head={[
          "#",
          "ARO Node ID",
          "Node Type",
          'Region',
          'Rewards Today'

        ]}
        data={[]}
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