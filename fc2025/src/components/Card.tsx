import Image from "next/image";

type CardProps = {
  name: string;
    party: string;
    claim: string;
    result: string;
    resultDetails: string[];
    currentPosition: string;
    formerPosition: string;
    relatedArticleUrl: string,
    originalUrl: string,
}

export default function Card({name, party, claim, result, resultDetails, currentPosition, formerPosition, relatedArticleUrl, originalUrl}: CardProps){

  // let partyLogo: string;
  let partyColor: string = "";

  if (party === "국민의힘") {
      // partyLogo = "/logos/국민의힘.png";
      partyColor = "#E61E2B"
  } else if (party === "더불어민주당") {
      // partyLogo = "/logos/더불어민주당.png";
      partyColor = "#152484"
  } else if (party === "개혁신당") {
      // partyLogo = "/logos/개혁신당.png";
      partyColor = "#FF7210"
  }

  return (
    <div className="block bg-white border border-[#D9D9D9] hover:border-[#6463FF] rounded-3xl hover:shadow-[0_0_30px_rgba(100,99,255,0.2)] transition-all duration-300 ease-in-out">
      {/* 카드 상단 */}
      <div className="p-4">
        {/* 후보자 정보 */}
        <div className="flex gap-4">
          {/* 사진 */}
          <div className="rounded-sm">
            <Image 
              width={80}
              height={80}
              src={`/images/candidate/${name}.png`}
              alt={"인물="+name}
            />
          </div>
          {/* 소속 정당과 이름, 직책 */}
          <div className="flex flex-col justify-between gap-2">
            {/* 소속 정당 */}
            <div>
              <h3 className="relative w-full h-[15px]">
                <Image
                  src={`/images/logo/${party}.png`}
                  alt={party}
                  fill
                  className="object-contain object-left"
                />
              </h3>
            </div>
            {/* 이름, 직책 */}
            <div>
              <h3 className="text-xl font-bold">{name}</h3>
              <h4 className="text-[#79797A]">
                <span>{currentPosition}</span>{'/'}
                <span>{formerPosition}</span>
              </h4>
            </div>
          </div>
        </div>
        {/* 주장 및 검증결과 */}
        <div className="bg-[#F1F1F9] rounded-lg p-4 pt-5 mt-2">
          {/* 검증 결과 */}
          <h2>
            <span className="rounded-lg p-2 px-3 bg-[#6463FF] font-bold text-[#ffffff]">
              {result}
            </span>
          </h2>
          {/* 주장 */}
          <h1 className="mt-4 font-bold text-lg">&quot;{claim}&quot;</h1>
        </div>
        {/* 팩트체크 */}
        <div className="mt-5 px-2">
          <ul className="list-disc list-outside pl-4">
            {resultDetails.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      {/* 카드 상단 끝 */}

      {/* 카드 하단 */}
      <div className="border border-transparent border-t-inherit">
        {/* 관련기사와 원문 */}
        <div>
          <a 
            className="block py-4 text-center"
            href={relatedArticleUrl}>관련 기사 보러가기 &nbsp;&nbsp;&nbsp;〉</a>
        </div>
      </div>
      {/* 카드 하단 끝 */}
    </div>
  )
}
