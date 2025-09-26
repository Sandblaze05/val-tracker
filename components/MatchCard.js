

const MatchCard = () => {
  return (
    <div className="flex flex-col p-4 w-150 h-60 border-1 border-[#ff4655] [box-shadow:5px_5px_0px_#ff4655]">
      <div className="flex flex-row items-center gap-5">
        <span className="text-[#ece8e1] font-mark-pro-bold text-2xl">Valorant Champions 2025</span>
        <span className="text-gray-300 text-2xl pb-1">|</span>
        <span className="text-[#ece8e1] text-sm font-mark-pro-bold">Playoffs-Upper Quarterfinals</span>
      </div>
      <div className="w-full bg-white/30 h-px mt-2" />
    </div>
  )
}

export default MatchCard