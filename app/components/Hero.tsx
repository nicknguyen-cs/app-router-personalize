"use client";

import { motion } from "framer-motion";
import { EventTriggerButton } from "./personalize/EventTriggerSDK";
import { EventTriggerRestButton } from "./personalize/EventTriggerREST";
import type { Hero } from "@/types/herotype";

// Extend the Window interface to include 'jstag'
declare global {
  interface Window {
    jstag?: {
      send?: (data: any) => void;
      [key: string]: any;
    };
  }
}

export default function HeroSection({ hero_title, hero_description, event_uid, $ }: Hero) {
  return (
    <section className="relative bg-gradient-to-br from-zinc-900 via-black to-zinc-800 text-white py-24 px-6 sm:px-12 lg:px-24 shadow-inner">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl font-bold tracking-tight mb-6"
          {...($?.hero_title ? $?.hero_title : "")}
        >
          {hero_title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-300 mb-8"
          {...($?.hero_description ? $?.hero_description : "")}
        >
          {hero_description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-4"
        >
          <EventTriggerButton
            eventUID={event_uid}
            className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-6 rounded-xl transition"
          >
            Track Impression (SDK) →
          </EventTriggerButton>
          <EventTriggerRestButton
            eventUID={event_uid}
            className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-6 rounded-xl transition"
          >
            Track Impression (REST) →
          </EventTriggerRestButton>
          <a
            onClick={() => {
              if (typeof window !== "undefined" && typeof window.jstag?.send === "function") {
                window?.jstag.send({
                  audience: "member"
                });
              }
            }}
            className="inline-block border border-white/20 hover:border-white text-white font-medium py-3 px-6 rounded-xl transition"
          >
            Join Today →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
