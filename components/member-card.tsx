"use client";

import { tracks, type Member } from "@/lib/data";

const tones: Record<Member["tone"], string> = {
  cyan: "bg-[#7ee8ef] text-[#0b3d44]",
  violet: "bg-[#c7b4ff] text-[#3c2a78]",
  green: "bg-[#7ee0c0] text-[#145544]",
  blue: "bg-[#7ec4ff] text-[#123a63]",
};

const tagDot: Record<Member["tone"], string> = {
  cyan: "bg-[#3ad6e0]",
  violet: "bg-[#b08cff]",
  green: "bg-[#3dd6a5]",
  blue: "bg-[#4aa3ff]",
};

const TILTS = [-2.4, 1.8, -1.1, 2.6, -2.0, 1.3, -1.6, 2.1, -0.9, 1.7];
const TECH_VISIBLE = 3;

function tiltFor(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash + id.charCodeAt(i) * (i + 1)) % TILTS.length;
  }
  return TILTS[hash];
}

export function MemberCard({
  member,
  className = "",
}: {
  member: Member;
  className?: string;
}) {
  const track = tracks[member.track];
  const tilt = tiltFor(member.id);
  const technologies = member.technologies ?? [];
  const visibleTech = technologies.slice(0, TECH_VISIBLE);
  const hiddenTech = technologies.length - visibleTech.length;

  return (
    <article
      className={`relative h-fit self-start rounded-[22px] bg-[#f3efe6] p-4 pt-5 text-[#1b1d22] shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition-[transform,box-shadow] duration-300 ease-out will-change-transform ${className}`}
      style={{ transform: `rotate(${tilt}deg)` }}
      onMouseEnter={(event) => {
        event.currentTarget.style.transform = "rotate(0deg) translateY(-6px)";
        event.currentTarget.style.boxShadow = "0 18px 40px rgba(0,0,0,0.28)";
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.transform = `rotate(${tilt}deg)`;
        event.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.18)";
      }}
    >
      <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c4553a] shadow-[0_0_0_3px_#f3efe6]" />
      <div className="flex items-start gap-3">
        {member.photoUrl ? (
          <img
            src={member.photoUrl}
            alt=""
            className="h-11 w-11 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold ${tones[member.tone]}`}
          >
            {member.initials}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-semibold leading-tight">{member.name}</p>
          <p className="mt-1 text-[12px] leading-tight text-[#6d737c]">
            {member.role} · {track.tag}
          </p>
          <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white/80 px-2 py-0.5 text-[11px] text-[#5c6370]">
            <span className={`h-1.5 w-1.5 rounded-full ${tagDot[member.tone]}`} />
            {track.tag}
          </span>
          {visibleTech.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {visibleTech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-[#1b1d22]/[0.06] px-2 py-0.5 text-[10px] leading-4 text-[#4a5058]"
                >
                  {tech}
                </span>
              ))}
              {hiddenTech > 0 ? (
                <span className="rounded-full bg-[#1b1d22]/[0.06] px-2 py-0.5 text-[10px] leading-4 text-[#6d737c]">
                  +{hiddenTech}
                </span>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
