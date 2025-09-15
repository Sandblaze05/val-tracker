import Image from "next/image"

const NewsCard = ({ image, type, date, title, content }) => {
  return (
    <div className="flex flex-col items-start justify-center mb-5">
      <div className="flex flex-col overflow-hidden">
        <Image
          src={image}
          height={250}
          width={500}
          alt=""
          objectFit="contain"
          className="hover:scale-110 transform transition-all duration-300"
        />
      </div>
      <div className="flex gap-2 mt-3">
        <span className="text-sm font-bold text-red-500">{type}</span>
        <span className="text-gray-400 font-extralight">|</span>
        <span className="text-sm font-bold">{date}</span>
      </div>
      <div className="mt-2"><strong className="text-xl">{title}</strong></div>
      <div className="mt-1 text-md">{content}</div>
    </div>
  )
}

export default NewsCard