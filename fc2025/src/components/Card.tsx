import Image from "next/image";
import { CardProps } from "@/types/props";
import SafeImage from "./SafeImage";

export default function Card({name, party, claim, result, resultDetails, position, relatedArticleUrl, selectedResult, originalUrl, handleFilteredData}: CardProps){

  return (
    <div className="group bg-white border border-[#D9D9D9] hover:border-[#6463FF] rounded-[20px] hover:shadow-[0_0_30px_rgba(100,99,255,0.2)] transition-all duration-300 ease-in-out">
      {/* 카드 상단 */}
      <div className="p-4">
        {/* 후보자 정보 */}
        <div className="flex gap-4">
          {/* 사진 */}
          <div className="rounded-[10px] overflow-hidden w-[80px] h-[80px] relative">
            <SafeImage
              key={name}
              className="cursor-pointer"
              src={`/images/candidate/small/${name}.png`}
              alt={"인물="+name}
              width={80}
              height={80}
              onClick={() => handleFilteredData("인물", name, selectedResult)}
              fallbackSrc = {'/images/candidate/def.jpg'}
            />
          </div>
          {/* 소속 정당과 이름, 직책 */}
          <div className="flex-1 flex flex-col justify-between gap-2">
            {/* 소속 정당 */}
            <div>
              {party !== "" && (
                <h3 className="relative w-full h-[15px]">
                  <Image
                    src={`/images/logo/${party}.png`}
                    alt={party}
                    fill
                    className="object-contain object-left cursor-pointer"
                    onClick={() => handleFilteredData("정당", party, selectedResult)}
                  />
                </h3>

              )}
            </div>
            {/* 이름, 직책 */}
            <div>
              <h3 
                className="text-xl font-bold cursor-pointer" 
                onClick={() => handleFilteredData("인물", name, selectedResult)}
              >{name}</h3>
              <h4 className="text-[#79797A]">
                <span>{position}</span>
              </h4>
            </div>
          </div>
        </div>
        {/* 주장 및 검증결과 */}
        <div className="bg-[#F1F1F9] rounded-[10px] p-4 pt-5 mt-2">
          {/* 검증 결과 */}
          <h2>
            <span className="rounded-[8px] p-2 px-3 bg-[#6463FF] font-bold text-[#ffffff]" onClick={() => handleFilteredData("인물", name, result)}>
              {result}
            </span>
          </h2>
          {/* 주장 */}
          <h1 className="mt-4 font-bold text-lg">
            {originalUrl === "" ? claim : <a href={originalUrl} target="_blank">{claim}</a>}
          </h1>
        </div>
        {/* 팩트체크 */}
        <div className="mt-5 px-2">
          <ul className="space-y-1">
            {resultDetails.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      {/* 카드 상단 끝 */}

      {/* 카드 하단 */}
      {relatedArticleUrl == "" ? "" : 
        <div className="border border-transparent border-t-inherit">
          {/* 관련기사와 원문 */}
          <div>
            <a 
              className="block py-4 text-center group-hover:text-[#6463FF]"
              href={relatedArticleUrl}>
              <span>관련 기사 보러가기</span>
              <Image
                className="inline mt-[-2px] ml-1"
                src="/images/icon/chevron_right.svg"
                alt="이 링크를 누르면 관련 기사로 이동할 수 있습니다."
                width={18}
                height={18}
              />
            </a>
          </div>
        </div>
      }
      {/* 카드 하단 끝 */}
    </div>
  )
}
