import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CardProps } from "@/types/props";
import SafeImage from './SafeImage';

export default function MobileCard({name, claim, result, resultDetails, relatedArticleUrl, originalUrl, resultList, handleFilteredData}: CardProps){

const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-auto mx-2 bg-white border border-[#D9D9D9] hover:border-[#6463FF] rounded-[15px] hover:shadow-[0_0_30px_rgba(100,99,255,0.2)] transition-all duration-300 ease-in-out">
        {/* 카드 상단 */}
        <div className="flex gap-3 p-4">
            {/* 사진 */}
            <div className="shrink-0">
                <SafeImage
                    key={name}
                    src={`/2025/factcheck2025/images/candidate/small/${name}.png`}
                    alt={"인물="+name}
                    width={80}
                    height={80}
                    className="rounded-[10px] overflow-hidden relative"
                    onClick={() => handleFilteredData("인물", name, "전체결과")}
                    fallbackSrc = {'/2025/factcheck2025/images/candidate/def.jpg'}
                />
            </div>
            <div className="grow">
                {/* 이름, 검증 결과 */}
                <div className="flex justify-between">
                    <h3 className="text-[#585858] font-semibold pt-1">{name}</h3>
                    <h2 style={{backgroundColor: resultList.find((item) => item.name === result)?.color}} className="rounded-[8px] p-1 px-3 font-bold text-[#ffffff]">{result}</h2>
                </div>
                {/* 주장 */}
                <div className="mt-2">
                    <h1 className="text-lg font-bold">
                        {originalUrl === "" ? claim : <a href={originalUrl} target="_blank">{claim}</a>}
                    </h1>
                </div>
            </div>
        </div>

        {/* 카드 중단 */}
        <motion.div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        className="px-4 pb-4 overflow-hidden"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ul>{resultDetails.map((item, index) => (
                            <li key={index} className="mt-1">{item}</li>
                        ))}</ul>
                        {relatedArticleUrl === "" ? "" : 
                            <a 
                                className="block mt-3 text-right font-bold"
                                href={relatedArticleUrl}>관련 기사 보러가기
                                <Image
                                    className="inline"
                                    src="/2025/factcheck2025/images/icon/chevron_right.svg"
                                    alt="오른쪽 화살표"
                                    width={18}
                                    height={18}
                                />
                            </a>
                        }
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>

        {/* 카드 하단 */}
        <div className="text-center p-3 border border-transparent border-t-[#D9D9D9]" onClick={() => setIsOpen(!isOpen)}>
            <button>
                {isOpen ? "접기" : "더보기"}
                <Image 
                    src={isOpen? "/2025/factcheck2025/images/icon/chevron_up.svg" : "/2025/factcheck2025/images/icon/chevron_down.svg"}
                    alt={isOpen? "접기" : "더보기"}
                    width={20}
                    height={17}
                    className="inline-block ml-1"
                />
                </button>
        </div>
    </div>
  )
}