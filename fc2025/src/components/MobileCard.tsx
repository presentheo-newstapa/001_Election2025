import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CardProps } from "@/types/props";
import SafeImage from './SafeImage';

export default function MobileCard({name, claim, result, resultDetails, handleFilteredData}: CardProps){

const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-auto mx-2 bg-white border border-[#D9D9D9] hover:border-[#6463FF] rounded-2xl hover:shadow-[0_0_30px_rgba(100,99,255,0.2)] transition-all duration-300 ease-in-out">
        {/* 카드 상단 */}
        <div className="flex gap-3 p-4">
            {/* 사진 */}
            <div>
                <SafeImage
                    key={name}
                    src={`/images/candidate/${name}.png`}
                    alt={"인물="+name}
                    width={80}
                    height={80}
                    className="rounded-xl overflow-hidden w-[80px] h-[80px] relative"
                    onClick={() => handleFilteredData("인물", name, "전체결과")}
                    fallbackSrc = {''}
                />
            </div>
            <div className="flex-auto">
                {/* 이름, 검증 결과 */}
                <div className="flex justify-between">
                    <h3 className="text-[#585858] font-semibold pt-1">{name}</h3>
                    <h2 className="rounded-lg p-1 px-3 bg-[#6463FF] font-bold text-[#ffffff]">{result}</h2>
                </div>
                {/* 주장 */}
                <div className="mt-2">
                    <h1 className="text-lg font-bold">{claim}</h1>
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
                            <li key={index}>{item}</li>
                        ))}</ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>

        {/* 카드 하단 */}
        <div className="text-center p-3 border border-transparent border-t-[#D9D9D9]" onClick={() => setIsOpen(!isOpen)}>
            <button>
                {isOpen ? "접기" : "더보기"}
                <Image 
                    src={isOpen? "/images/icon/chevron_up.svg" : "/images/icon/chevron_down.svg"}
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