import { motion } from 'framer-motion';

const tile = () => {
  return (
    <motion.div
    className="aspect-square bg-[#e7f3fa] border-neutral-900 "
    whileHover={{
      zIndex: 1,
      backgroundColor: '#45484B',
    }}
    transition={{
      duration:5,
      ease: 'easeOut',
    }}
    />
  )
}

export default tile