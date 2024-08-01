import { cn } from "@/lib/utils";
import Marquee from "./Marque";

const reviews = [
  {
    name: "Emily",
    username: "@emily",
    body: "The care and attention I received were outstanding. Highly recommended!",
    img: "https://avatar.vercel.sh/emily",
  },
  {
    name: "Sophia",
    username: "@sophia",
    body: "The staff was incredibly supportive and kind. Thank you for everything!",
    img: "https://avatar.vercel.sh/sophia",
  },
  {
    name: "Olivia",
    username: "@olivia",
    body: "An excellent experience from start to finish. I felt so well cared for. The facilities were top-notch and the staff made me feel like family.",
    img: "https://avatar.vercel.sh/olivia",
  },
  {
    name: "Ava",
    username: "@ava",
    body: "The best maternal care services I've ever experienced. Highly recommended! The doctors were attentive and the overall experience was wonderful.",
    img: "https://avatar.vercel.sh/ava",
  },
  {
    name: "Mia",
    username: "@mia",
    body: "Fantastic care and support during my pregnancy. Thank you so much! The prenatal classes were very helpful and the staff was always there for me.",
    img: "https://avatar.vercel.sh/mia",
  },
  {
    name: "Isabella",
    username: "@isabella",
    body: "Amazing services and compassionate staff. Couldn't ask for better care. They made my journey through pregnancy smooth and comfortable.",
    img: "https://avatar.vercel.sh/isabella",
  },
  {
    name: "Grace",
    username: "@grace",
    body: "The team was extremely professional and caring. They provided me with all the information I needed and supported me throughout my pregnancy.",
    img: "https://avatar.vercel.sh/grace",
  },
  {
    name: "Charlotte",
    username: "@charlotte",
    body: "I felt so reassured and cared for during my visits. The personalized care plans were very helpful and made my experience stress-free.",
    img: "https://avatar.vercel.sh/charlotte",
  },
  {
    name: "Liam",
    username: "@liam",
    body: "As a new father, I appreciated the support and guidance provided by the team. They made sure we were well-prepared and informed every step of the way.",
    img: "https://avatar.vercel.sh/liam",
  },
  {
    name: "Grace",
    username: "@grace",
    body: "The prenatal and postnatal care was exceptional. The nurses and doctors were always available to answer my questions and provide assistance.",
    img: "https://avatar.vercel.sh/noah",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 ",
        // light styles
        "border-gray-950/[.1] bg-[#e7f3fa] ] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2 ">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export default function MarqueeDemo() {
  return (
    <div className="bg-[#faeee7] mt-10 relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg">
      <h2 className="text-2xl text-[#33272a] font-semibold mb-6">Testimonials</h2>
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
    </div>
  );
}
