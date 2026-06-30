"use client";

import type { About as AboutData, SkillGroup, Profile } from "@/lib/data";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/SectionHeading";
import { SlideInLeft, SlideInRight, StaggerGrid, StaggerItem } from "@/components/ui/AnimationWrappers";

export default function About({
  about,
  skills,
  profile,
}: {
  about: AboutData;
  skills: SkillGroup[];
  profile: Profile;
}) {
  return (
    <section id="about" className="px-6 py-20 md:py-28">
      <Container>
        <SectionHeading number="01 — About" title="About Me" subtitle="A bit about who I am and what I do." />

        <div className="grid md:grid-cols-5 gap-8 mt-12">
          {/* Bio */}
          <SlideInLeft delay={0.05} className="md:col-span-3 bg-bg-soft border border-bg-border rounded-2xl p-6 md:p-8">
            {about.intro.map((p, i) => (
              <p key={i} className="text-text-secondary leading-relaxed mb-4">
                {p}
              </p>
            ))}

            <div className="text-text-primary font-semibold mt-6 mb-3">Highlights</div>
            <ul className="space-y-2.5">
              {about.highlights.map((h, i) => (
                <li key={i} className="text-text-secondary flex gap-2.5 text-sm">
                  <span className="text-accent-primary mt-0.5">•</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-5 border-t border-bg-line text-text-secondary text-sm">
              <span className="text-text-primary font-medium">{profile.location}</span> · open to remote
            </div>
          </SlideInLeft>

          {/* Skills — stagger from right */}
          <SlideInRight delay={0.15} className="md:col-span-2 space-y-4">
            <StaggerGrid stagger={0.08}>
              {skills.map((group) => (
                <StaggerItem key={group.category} className="mb-4 last:mb-0">
                  <div className="bg-bg-card border border-bg-border rounded-2xl p-4">
                    <div className="text-sm font-semibold text-text-primary mb-3">{group.category}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="text-xs px-2.5 py-1 bg-bg-soft border border-bg-border rounded-full text-text-secondary hover:border-accent-primary hover:text-accent-primary transition cursor-default"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </SlideInRight>
        </div>
      </Container>
    </section>
  );
}
