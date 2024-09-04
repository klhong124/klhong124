// import '@/styles/cursor.scss'
import { motion } from "framer-motion";
import { useMouse } from '@/hooks/useMouse'
import { cn } from "@/utils/cn";

export default function Cursor({
  title = "You",
}: Readonly<{
  title?: string | React.ReactNode;
}>) {
  const [mouse] = useMouse()
  return (

    <motion.div
      className="h-4 w-4 rounded-full absolute z-50 pointer-events-none"
      style={{
        top: mouse.y,
        left: mouse.x,
      }}
      initial={{
        scale: 1,
        opacity: 1,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      exit={{
        scale: 0,
        opacity: 0,
      }}
    >
      <Tag>{title}</Tag>
    </motion.div>

  );
};

export const Pointer = () => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="1"
      viewBox="0 0 16 16"
      className={cn(
        "-mt-5 -ml-3",
        "h-5 w-5 text-emerald-500 transform translate-x-[6px] translate-y-[16px] -rotate-[70deg] stroke-emerald-600"
      )}
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
    </svg>
  )
}
export const Tag = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{
        scale: 0.5,
        opacity: 0,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      exit={{
        scale: 0.5,
        opacity: 0,
      }}
      className={cn(
        "mt-5 ml-3",
        "px-2 py-2 bg-emerald-600 text-white whitespace-nowrap min-w-max text-xs rounded-xl rounded-tl-none")
      }
    >
      {children}
    </motion.div>
  )
}