import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PawIcon } from "@/components/PawIcon";
import { motion } from "framer-motion";
import { LogOut, Sparkles, ClipboardList, ChevronRight, ImagePlus, Loader2, Activity, TrendingUp, AlertCircle, Lock, Calendar } from "lucide-react";
import Tesseract from "tesseract.js";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface VetQuestion {
  id: string;
  question: string;
}

interface FollowUpTask {
  id: string;
  task: string;
  done: boolean;
  category: "medication" | "care" | "followup" | "monitor";
}

interface VisitSummary {
  summary: string;
  tasks: FollowUpTask[];
  timeline: { date: string; event: string }[];
  healthStats: HealingStats;
}

interface BehaviorLog {
  appetite: "better" | "same" | "worse";
  energy: "better" | "same" | "worse";
  sleep: "better" | "same" | "worse";
  movement: "better" | "same" | "worse";
  itching: "better" | "same" | "worse";
}

interface HealingStats {
  streak: number;
  lastCompletedDate: string | null;
  dailyCompletion: { [date: string]: boolean };
  dailyBehavior: { [date: string]: BehaviorLog };
}

const generateVetQuestions = (issue: string): VetQuestion[] => {
  const lowerIssue = issue.toLowerCase();
  const wordCount = issue.trim().split(/\s+/).length;
  // Dynamic count: less detail = fewer questions, more detail = up to 5
  const targetCount = (wordCount < 4 || issue.length < 20) ? 3 : 5;

  let questions: string[] = [];

  // 1. Toxicity & Emergency
  if (lowerIssue.includes("ate") || lowerIssue.includes("toxic") || lowerIssue.includes("poison") || lowerIssue.includes("chocolate") || lowerIssue.includes("grape") || lowerIssue.includes("gum")) {
    questions.push("Is the amount my pet ate dangerous for their weight?");
    questions.push("Should we try to make them throw up, or is that risky?");
    questions.push("Could this hurt their liver or kidneys?");
    questions.push("Do they need special charcoal medicine to soak up the toxins?");
    questions.push("What 'last resort' warning signs should I watch for today?");
  }

  // 2. Skin, Allergy & Ears
  if (questions.length < targetCount && (lowerIssue.includes("scratch") || lowerIssue.includes("itch") || lowerIssue.includes("skin") || lowerIssue.includes("ear") || lowerIssue.includes("rash"))) {
    questions.push("Could this be an allergy to something in the house or their food?");
    questions.push("Is there a skin infection that needs extra medicine?");
    if (lowerIssue.includes("ear")) {
      questions.push("Is the inside of the ear okay, and does it need a deep cleaning?");
    } else {
      questions.push("Are there special shampoos that work better than store-bought ones?");
    }
    questions.push("Should we do a skin test to check for mites or tiny bugs?");
    questions.push("How can we stop this from happening again next season?");
  }

  // 3. Digestive & GI
  if (questions.length < targetCount && (lowerIssue.includes("vomit") || lowerIssue.includes("diarrhea") || lowerIssue.includes("stomach") || lowerIssue.includes("poop") || lowerIssue.includes("eat"))) {
    questions.push("Should we check their poop for parasites or worms?");
    questions.push("Could there be something stuck in their stomach or gut?");
    questions.push("Is a simple 'bland diet' like chicken and rice needed for now?");
    questions.push("What signs of dehydration should I be looking for at home?");
    questions.push("How long until their stomach should start feeling normal again?");
  }

  // 4. Mobility, Leg & Pain
  if (questions.length < targetCount && (lowerIssue.includes("limp") || lowerIssue.includes("pain") || lowerIssue.includes("leg") || lowerIssue.includes("walk") || lowerIssue.includes("stiff"))) {
    questions.push("Do we need an X-ray to check if anything is broken or strained?");
    questions.push("Is this a pulled muscle or a problem with their joints/knees?");
    questions.push("Are the pain meds safe to give with their current vitamins?");
    questions.push("Do they need 'bed rest' or is a short walk okay?");
    questions.push("Would physical therapy or heat/ice help them heal faster?");
  }

  // 5. Respiratory & Lungs
  if (questions.length < targetCount && (lowerIssue.includes("cough") || lowerIssue.includes("sneeze") || lowerIssue.includes("breathe") || lowerIssue.includes("panting"))) {
    questions.push("Do their lungs sound clear, or is there some fluid build-up?");
    questions.push("Could this be a cold, or are we worried about their heart?");
    questions.push("Should we check their heart size with an X-ray?");
    questions.push("Is their breathing speed normal for their breed?");
    questions.push("Could something in the house (like dust or scents) be causing this?");
  }

  // 6. Urinary & Lumps
  if (questions.length < targetCount && (lowerIssue.includes("pee") || lowerIssue.includes("urine") || lowerIssue.includes("lump") || lowerIssue.includes("mass") || lowerIssue.includes("bump"))) {
    if (lowerIssue.includes("pee") || lowerIssue.includes("urine")) {
      questions.push("Should we test their pee for an infection or stones?");
      questions.push("Is peeing more often a sign of a kidney problem or diabetes?");
    } else {
      questions.push("Should we test a small sample of this lump to see if it's safe?");
      questions.push("Is this growth likely to spread, or is it just on the skin?");
    }
    questions.push("Should we remove it now, or is it okay to just watch it?");
    questions.push("What changes in size or feel should I worry about most?");
    questions.push("If it's a 'bad' lump, what are the next steps for treatment?");
  }

  // 7. Eye & Vision
  if (questions.length < targetCount && (lowerIssue.includes("eye") || lowerIssue.includes("squint") || lowerIssue.includes("blind") || lowerIssue.includes("cloudy") || lowerIssue.includes("redness"))) {
    questions.push("Should we check for scratches on the surface of the eye?");
    questions.push("Is the pressure in the eye normal?");
    questions.push("Do they need special antibiotic or steroid eye drops?");
    questions.push("Is there a hair or something stuck rubbing against the eye?");
    questions.push("Besides squinting, what signs of eye pain should I look for?");
  }

  // 8. Neurological & Behavior
  if (questions.length < targetCount && (lowerIssue.includes("seizure") || lowerIssue.includes("shake") || lowerIssue.includes("tilt") || lowerIssue.includes("circle") || lowerIssue.includes("behavior") || lowerIssue.includes("faint"))) {
    questions.push("Could this be a seizure, or maybe they ate something toxic?");
    questions.push("Is this head tilt a balance issue or a deep ear problem?");
    questions.push("Should we check their blood sugar levels during these spells?");
    questions.push("Is there any swelling or pressure in the brain we need to check?");
    questions.push("How should I safely help them if this happens again at home?");
  }

  // 9. Fallback / General
  const fallbackPool = [
    `What is the most likely diagnosis for ${lowerIssue.split(' ').slice(0, 3).join(' ') || "this problem"}?`,
    "Which tests are most important to get a clear answer today?",
    "If things don't get better in 2 days, what should we do next?",
    "Are there any side effects from this medicine I should watch for?",
    "Should I change their diet or activity to help them feel better?",
    "What is the total cost for the treatment we're planning?",
    "Should I keep track of their temperature or breathing at home?"
  ];

  // Combine and deduplicate
  questions = [...new Set(questions)].slice(0, targetCount);

  while (questions.length < targetCount && fallbackPool.length > 0) {
    const nextQ = fallbackPool.shift();
    if (nextQ && !questions.includes(nextQ)) {
      questions.push(nextQ);
    }
  }

  return questions.slice(0, targetCount).map((q, index) => ({
    id: String(index + 1),
    question: q
  }));
};

const generateVisitSummary = (notes: string): VisitSummary => {
  const lines = notes.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  const lowerNotes = notes.toLowerCase();

  const tasks: FollowUpTask[] = [];
  const timeline: { date: string; event: string }[] = [];
  let maxDuration = 0;

  const formatDate = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // 1. Generic Medication Detection
  const medRegex = /([A-Z][a-z]+(?:\s+[a-z]+)*)\s+(\d+(?:\.\d+)?\s*(?:mg|ml|mcg|unit|tablet|capsule|pill)s?)/gi;
  const foundMeds = new Set<string>();
  const commonMedsList = ["amoxicillin", "prednisone", "tramadol", "carprofen", "gabapentin", "meloxicam", "metronidazole", "clavamox", "apoquel", "benadryl", "cephalexin", "doxycycline", "baytril"];

  lines.forEach((line, index) => {
    const lowerLine = line.toLowerCase();
    let isMedLine = false;
    let medName = "";
    let dosage = "";

    const lineMatches = [...line.matchAll(medRegex)];
    if (lineMatches.length > 0) {
      isMedLine = true;
      medName = lineMatches[0][1];
      dosage = lineMatches[0][2];
    } else {
      const matchedCommon = commonMedsList.find(m => lowerLine.includes(m));
      if (matchedCommon) {
        isMedLine = true;
        medName = matchedCommon.charAt(0).toUpperCase() + matchedCommon.slice(1);
      }
    }

    if (isMedLine && !foundMeds.has(medName.toLowerCase())) {
      foundMeds.add(medName.toLowerCase());
      const context = (line + " " + (lines[index + 1] || "")).toLowerCase();

      let freq = "as directed";
      if (context.includes("twice") || context.includes("bid") || context.includes("2 times")) freq = "2 times a day";
      else if (context.includes("once") || context.includes("sid") || context.includes("1 time")) freq = "once a day";
      else if (context.includes("three") || context.includes("tid") || context.includes("3 times")) freq = "3 times a day";

      let duration = 0;
      const durationMatch = context.match(/(\d+)\s*(?:day|dose|tablet)/);
      if (durationMatch) {
        duration = parseInt(durationMatch[1]);
        if (duration > maxDuration) maxDuration = duration;
      }

      tasks.push({
        id: `med-${index}`,
        task: `Give ${medName}${dosage ? ` (${dosage})` : ""}: ${freq}`,
        done: false,
        category: "medication"
      });

      if (duration > 0) {
        timeline.push({ date: formatDate(duration), event: `Complete ${medName} course.` });
      }
    }
  });

  // 2. Routine & Time-based Tasks (Handled with Contextual Time)
  const timeRegex = /(\d{1,2}:\d{2}(?:\s*[-–]\s*\d{1,2}:\d{2})?\s*(?:AM|PM))/gi;
  const generalTimes = ["morning", "afternoon", "evening", "bedtime", "breakfast", "dinner"];
  const nonDailySections = ["monthly", "periodic", "long-term", "follow-up", "example", "notice"];
  let currentTimeLabel = "";
  let isInPeriodicSection = false;

  lines.forEach((line, index) => {
    const lowerLine = line.toLowerCase();
    const timeMatch = line.match(timeRegex);
    const keywordMatch = generalTimes.find(t => lowerLine.includes(t));

    // Reset context and flag if we hit a periodic section header
    if (nonDailySections.some(s => lowerLine.includes(s)) && (line.endsWith(":") || line.length < 30)) {
      currentTimeLabel = "";
      isInPeriodicSection = true;
      return;
    }

    // Update current context and reset periodic flag if a specific time is found
    if (timeMatch || keywordMatch) {
      isInPeriodicSection = false;
      if (timeMatch) {
        currentTimeLabel = timeMatch[0];
      } else if (keywordMatch) {
        if (line.length < 50 || lowerLine.startsWith("before") || lowerLine.startsWith("at") || lowerLine.endsWith(":")) {
          currentTimeLabel = keywordMatch.charAt(0).toUpperCase() + keywordMatch.slice(1);
        }
      }
    }

    // Filter out passive info, age categories, and chatbot meta-talk
    const nonActionable = [
      "puppies", "kittens", "senior pets", "adult pets", "if you notice", "seek veterinary advice",
      "if you'd like", "create a", "balanced pet routine", "structured in", "works best when", "if advised",
      "usually given", "depending on breed", "may require", "if needed", "if prescribed",
      "if medications", "regular vet visits", "keep vaccinations", "if thyroid",
      "if any", "should be", "provide a", "choose high-quality", "helps regulate", "helps with",
      "reduces boredom", "healthy pet routine", "consistent routine", "example of a"
    ];
    if (nonActionable.some(pw => lowerLine.includes(pw))) return;

    // Identify if the line is a task
    const isBullet = /^[*•\-]\s+/.test(line);
    const hasTime = line.match(timeRegex);

    // Check for "need to do" markers
    const actionMarkers = ["refill", "ensure", "spend", "take", "serve", "give", "brush", "check", "inspect", "wipe", "provide", "allow", "schedule"];
    const hasActionMarker = actionMarkers.some(am => lowerLine.includes(am));

    const isTaskLine = !isInPeriodicSection && (isBullet || hasTime || (currentTimeLabel && line.length > 5 && !line.endsWith(":")));

    if (isTaskLine && hasActionMarker) {
      let cleaned = line.replace(/^[*•\-]\s+/, "");
      if (hasTime) cleaned = cleaned.replace(hasTime[0], "");

      const fluff = [
        /^(?:at|in|from|during|the|between|before|after|within|around)\s+/i,
        /^[*•\-\s]+/, /^[,.:\s*–-]+/,
        /\bveterinarian-recommended\b/i,
        /\busually given\b/i
      ];
      fluff.forEach(p => cleaned = cleaned.replace(p, ""));
      cleaned = cleaned.replace(/\s+\*\*\*\*\s*/g, " ").replace(/\*\*/g, "").replace(/ {2,}/g, " ").trim();

      // Make it punchy: Capture only the action, cut off explanations
      const cutPoints = [".", " such as", " to help", " to prevent", " to stimulate", " to support", " to ensure"];
      cutPoints.forEach(cp => {
        if (cleaned.includes(cp)) {
          cleaned = cleaned.split(cp)[0];
        }
      });

      // Skip lines that are just headers, overly generic, or passive
      if (cleaned.toLowerCase() === currentTimeLabel.toLowerCase()) return;
      if (generalTimes.some(t => cleaned.toLowerCase() === t)) return;
      if (nonDailySections.some(s => lowerLine.includes(s))) return;

      if (cleaned.length > 3 && cleaned.length < 150) {
        const fullTask = `${currentTimeLabel ? `${currentTimeLabel}: ` : ""}${cleaned.charAt(0).toUpperCase() + cleaned.slice(1)}`;
        const finalTask = fullTask.replace(/^(.*?): \1: /i, "$1: ");

        if (!tasks.some(t => t.task === finalTask)) {
          tasks.push({ id: `routine-${index}`, task: finalTask, done: false, category: "care" });
        }
      }
    }
  });

  // 3. Advanced Timeline Extraction (Periodic Care)
  // Catch: "Every 3 months", "once every month", "Every 3-4 weeks", "6-12 months"
  const periodicPattern = /(?:once\s+)?every\s+(a|an|\d+(?:\s*[-–]\s*\d+)?|(?=month|year|week|day))\s*(day|week|month|year)s?/gi;
  let match;
  while ((match = periodicPattern.exec(lowerNotes)) !== null) {
    const period = match[1] || "1";
    const unit = match[2].toLowerCase();
    let days = 30;

    let num = 1;
    if (period.includes("-") || period.includes("–")) {
      num = parseInt(period.split(/[-–]/)[1].trim());
    } else if (/\d+/.test(period)) {
      num = parseInt(period);
    }

    if (unit.startsWith("day")) days = num;
    else if (unit.startsWith("week")) days = num * 7;
    else if (unit.startsWith("month")) days = num * 30;
    else if (unit.startsWith("year")) days = num * 365;

    timeline.push({
      date: formatDate(days),
      event: `Health Milestone: ${match[0].charAt(0).toUpperCase() + match[0].slice(1)}`
    });
  }

  // Catch common keywords for timeline
  const timelineKeywords = ["vaccination", "booster", "check-up", "annual", "dental", "grooming"];
  timelineKeywords.forEach(word => {
    if (lowerNotes.includes(word)) {
      const isAnnual = lowerNotes.includes("annual") || lowerNotes.includes("year");
      const targetDate = formatDate(isAnnual ? 365 : 180);
      if (!timeline.some(t => t.event.toLowerCase().includes(word))) {
        timeline.push({ date: targetDate, event: `${word.charAt(0).toUpperCase() + word.slice(1)} recommended` });
      }
    }
  });

  if (tasks.some(t => t.category === "medication") && !timeline.some(t => t.event.toLowerCase().includes("progress"))) {
    timeline.push({ date: formatDate(10), event: "Progress review in healing journey" });
  }

  // 4. Follow-up detection
  const fupMatch = lowerNotes.match(/(\d+)\s*(day|week|month)s?\s*(recheck|follow|return|visit|check-up)/i);
  if (fupMatch) {
    let days = 7;
    const num = parseInt(fupMatch[1]);
    const unit = fupMatch[2].toLowerCase();
    if (unit.startsWith("day")) days = num;
    else if (unit.startsWith("week")) days = num * 7;
    else if (unit.startsWith("month")) days = num * 30;

    const targetDate = formatDate(days);
    tasks.push({ id: "care-fup", task: `Schedule recheck by ${targetDate}`, done: false, category: "followup" });
    timeline.push({ date: targetDate, event: "Veterinary recheck appointment." });
  }

  // 5. Cleanup and Sorting
  const timeWeight = (taskStr: string) => {
    const lower = taskStr.toLowerCase();
    const timeMatch = taskStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (timeMatch) {
      let h = parseInt(timeMatch[1]);
      if (timeMatch[3].toUpperCase() === "PM" && h < 12) h += 12;
      if (timeMatch[3].toUpperCase() === "AM" && h === 12) h = 0;
      return h * 60 + parseInt(timeMatch[2]);
    }
    const weights: Record<string, number> = { morning: 1, breakfast: 2, noon: 3, afternoon: 4, evening: 5, dinner: 6, night: 7, bedtime: 8 };
    for (const [key, w] of Object.entries(weights)) if (lower.includes(key)) return w * 100;
    return 999;
  };

  const sortedTasks = [...tasks].sort((a, b) => timeWeight(a.task) - timeWeight(b.task));

  const groupedTimeline: { [date: string]: string[] } = {};
  timeline.forEach(t => {
    if (!groupedTimeline[t.date]) groupedTimeline[t.date] = [];
    if (!groupedTimeline[t.date].includes(t.event)) {
      groupedTimeline[t.date].push(t.event);
    }
  });

  const uniqueTimeline = Object.entries(groupedTimeline).map(([date, events]) => ({
    date,
    event: events.join(", ")
  })).sort((a, b) => (a.date === "Today" ? -1 : b.date === "Today" ? 1 : new Date(a.date).getTime() - new Date(b.date).getTime()));

  if (!uniqueTimeline.some(t => t.date === "Today")) uniqueTimeline.unshift({ date: "Today", event: "Start new care routine." });

  return {
    summary: foundMeds.size > 0 ? `Detected ${foundMeds.size} medication(s) and organized your plan.` : "Organized your pet's daily care plan.",
    tasks: sortedTasks,
    timeline: uniqueTimeline,
    healthStats: { streak: 0, lastCompletedDate: null, dailyCompletion: {}, dailyBehavior: {} }
  };
};

const calculateBehaviorIntelligence = (dailyBehavior: { [date: string]: BehaviorLog }) => {
  const dates = Object.keys(dailyBehavior).sort();
  if (dates.length === 0) return null;

  const baselineDates = dates.slice(0, 4);
  const recentDate = dates[dates.length - 1];
  const recentStats = dailyBehavior[recentDate];
  const dayNumber = dates.length;

  const scoreMap = { better: 1, same: 0, worse: -1 };

  const categories: (keyof BehaviorLog)[] = ['appetite', 'energy', 'sleep', 'movement', 'itching'];
  const trends = categories.map(cat => {
    let baselineSum = 0;
    baselineDates.forEach(d => {
      if (dailyBehavior[d]) baselineSum += scoreMap[dailyBehavior[d][cat]] || 0;
    });
    const baselineAvg = baselineSum / Math.max(1, baselineDates.length);
    const recentScore = scoreMap[recentStats[cat]] || 0;

    const diff = recentScore - baselineAvg;
    let status: "improving" | "declining" | "stable" = "stable";
    if (diff > 0.2) status = "improving";
    if (diff < -0.2) status = "declining";

    const pct = Math.round((recentScore + 1) * 50);
    const baselinePct = Math.round((baselineAvg + 1) * 50);
    const change = pct - baselinePct;

    return { category: cat, status, change, value: recentStats[cat] };
  });

  let guidance = "Everything looks stable. Keep up the consistent care!";
  const declines = trends.filter(t => t.status === "declining");
  if (declines.length > 0) {
    guidance = `Note: ${declines.map(d => d.category).join(' and ')} dipped slightly compared to earlier. Keep an eye on these.`;
  } else if (trends.every(t => t.status === "improving" || t.status === "stable")) {
    guidance = "Your pet is showing steady progress across all behaviors!";
  }

  return { trends, guidance, dayNumber, isBaseline: dayNumber <= 4 };
};

const Dashboard = () => {
  const { user, isLoading, logout, refreshProfile, decrementNotes } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"pre" | "post">("pre");

  // Pre-vet state
  const [petIssue, setPetIssue] = useState("");
  const [vetQuestions, setVetQuestions] = useState<VetQuestion[]>([]);

  // Post-vet state
  const [vetNotes, setVetNotes] = useState("");
  const [visitSummary, setVisitSummary] = useState<VisitSummary | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);

  // Sync health stats with Supabase
  const syncStatsWithSupabase = async (stats: HealingStats) => {
    if (!user) return;
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          streak: stats.streak,
          last_completed_date: stats.lastCompletedDate,
          daily_completion: stats.dailyCompletion,
          daily_behavior: stats.dailyBehavior,
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' });

      if (error) {
        console.error("Supabase sync error:", error);
      }
    } catch (err) {
      console.error("Failed to sync with Supabase:", err);
    }
  };

  // Load stats from Supabase on mount
  useEffect(() => {
    const fetchStats = async () => {
      if (!user?.id) return;

      try {
        console.log("Fetching stats for user:", user.id);
        const { data, error } = await supabase
          .from('profiles')
          .select('streak,last_completed_date,daily_completion,daily_behavior')
          .eq('id', user.id)
          .maybeSingle();

        if (error) {
          console.error("Error fetching stats:", error.message, error.details);
          return;
        }

        if (data) {
          const storedSummary = localStorage.getItem("pawnote-visit-summary");
          if (storedSummary) {
            const parsed = JSON.parse(storedSummary);
            const mergedSummary = {
              ...parsed,
              healthStats: {
                streak: data.streak || 0,
                lastCompletedDate: data.last_completed_date,
                dailyCompletion: data.daily_completion || {},
                dailyBehavior: data.daily_behavior || {}
              }
            };
            setVisitSummary(mergedSummary);
            localStorage.setItem("pawnote-visit-summary", JSON.stringify(mergedSummary));
          }
        } else {
          console.log("No profile stats found, using local defaults.");
        }
      } catch (err) {
        console.error("Error in fetchStats execution:", err);
      }
    };

    if (user) fetchStats();
  }, [user?.id]);

  // Load from localStorage
  // Load from localStorage on mount
  useEffect(() => {
    const storedIssue = localStorage.getItem("pawnote-pet-issue");
    const storedQuestions = localStorage.getItem("pawnote-vet-questions");
    const storedNotes = localStorage.getItem("pawnote-vet-notes");
    const storedSummary = localStorage.getItem("pawnote-visit-summary");

    if (storedIssue) setPetIssue(storedIssue);
    if (storedQuestions) setVetQuestions(JSON.parse(storedQuestions));
    if (storedNotes) setVetNotes(storedNotes);
    if (storedSummary) setVisitSummary(JSON.parse(storedSummary));
  }, []);

  // Auth protection
  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  const getTodayDate = () => new Date().toISOString().split('T')[0];

  // Daily Reset & Streak Logic
  useEffect(() => {
    if (!visitSummary) return;

    const today = getTodayDate();
    const lastSessionDate = localStorage.getItem("pawnote-last-session-date");

    if (lastSessionDate && lastSessionDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      let newStreak = visitSummary.healthStats.streak;
      const yesterdayDone = visitSummary.healthStats.dailyCompletion[yesterdayStr];

      if (!yesterdayDone && lastSessionDate === yesterdayStr) {
        newStreak = 0;
      } else if (lastSessionDate !== yesterdayStr) {
        newStreak = 0;
      }

      const resetTasks = visitSummary.tasks.map(t => ({ ...t, done: false }));
      const dailyResetSummary = {
        ...visitSummary,
        tasks: resetTasks,
        healthStats: {
          ...visitSummary.healthStats,
          streak: newStreak,
          dailyBehavior: visitSummary.healthStats.dailyBehavior || {}
        }
      };

      setVisitSummary(dailyResetSummary);
      localStorage.setItem("pawnote-visit-summary", JSON.stringify(dailyResetSummary));
      localStorage.setItem("pawnote-last-session-date", today);
    } else if (!lastSessionDate) {
      localStorage.setItem("pawnote-last-session-date", today);
    }
  }, [visitSummary]);

  const handleLogBehavior = async (category: keyof BehaviorLog, value: "better" | "same" | "worse") => {
    if (!visitSummary) return;
    const today = getTodayDate();

    // Ensure healthStats.dailyBehavior exists
    const currentBehavior = visitSummary.healthStats.dailyBehavior || {};
    const todayLog = currentBehavior[today] || { appetite: "same", energy: "same", sleep: "same", movement: "same", itching: "same" };

    const updatedBehavior = {
      ...currentBehavior,
      [today]: {
        ...todayLog,
        [category]: value
      }
    };

    const updatedStats = {
      ...visitSummary.healthStats,
      dailyBehavior: updatedBehavior
    };

    const updatedSummary = {
      ...visitSummary,
      healthStats: updatedStats
    };

    setVisitSummary(updatedSummary);
    localStorage.setItem("pawnote-visit-summary", JSON.stringify(updatedSummary));
    syncStatsWithSupabase(updatedStats);

    toast({
      title: "Log Updated",
      description: `Today's ${category} marked as ${value}.`,
    });
  };

  const handleGenerateQuestions = () => {
    if (!petIssue.trim()) return;
    const questions = generateVetQuestions(petIssue);
    setVetQuestions(questions);
    localStorage.setItem("pawnote-pet-issue", petIssue);
    localStorage.setItem("pawnote-vet-questions", JSON.stringify(questions));
  };

  const handleGenerateSummary = async () => {
    if (!vetNotes.trim()) return;

    // Check usage limit for free users
    const notesRemaining = user?.notesRemaining ?? 0;
    const isPro = user?.isPro ?? false;

    if (!isPro && notesRemaining <= 0) {
      toast({
        title: "Upgrade to Pro Plan",
        description: "You've used all your free notes. Redirecting to pricing...",
      });
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById("pricing");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
      return;
    }

    setIsTranscribing(true);
    try {
      const summary = generateVisitSummary(vetNotes);
      setVisitSummary(summary);
      // Decrement count using optimistic update if content has changed
      const lastTranscribed = localStorage.getItem("pawnote-vet-notes");
      let remainingNotes = user?.notesRemaining ?? 0;

      if (!user?.isPro && vetNotes !== lastTranscribed) {
        await decrementNotes();
        remainingNotes = Math.max(0, remainingNotes - 1);
      }

      localStorage.setItem("pawnote-vet-notes", vetNotes);
      localStorage.setItem("pawnote-visit-summary", JSON.stringify(summary));

      toast({
        title: "Summary Generated",
        description: user?.isPro ? "Unlimited access active!" : `You have ${remainingNotes} notes remaining.`,
      });
    } catch (error) {
      console.error("Transcription error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate summary. Please try again.",
      });
    } finally {
      setIsTranscribing(false);
    }
  };

  const toggleTaskDone = (taskId: string) => {
    if (!visitSummary) return;
    const today = getTodayDate();

    const updatedTasks = visitSummary.tasks.map((t) =>
      t.id === taskId ? { ...t, done: !t.done } : t
    );

    const allDoneNow = updatedTasks.every(t => t.done);
    const wasDoneToday = visitSummary.healthStats.dailyCompletion[today];
    let newStats = { ...visitSummary.healthStats };

    if (allDoneNow && !wasDoneToday) {
      newStats.streak += 1;
      newStats.dailyCompletion[today] = true;
      newStats.lastCompletedDate = today;
    } else if (!allDoneNow && wasDoneToday) {
      newStats.streak = Math.max(0, newStats.streak - 1);
      const newCompletion = { ...newStats.dailyCompletion };
      delete newCompletion[today];
      newStats.dailyCompletion = newCompletion;
      newStats.lastCompletedDate = null;
    }

    const updatedSummary = { ...visitSummary, tasks: updatedTasks, healthStats: newStats };
    setVisitSummary(updatedSummary);
    localStorage.setItem("pawnote-visit-summary", JSON.stringify(updatedSummary));

    // Persist to Supabase
    syncStatsWithSupabase(newStats);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check usage limit for free users before transcribing
    if (!user?.isPro && (user?.notesRemaining ?? 0) <= 0) {
      toast({
        title: "Upgrade to Pro Plan",
        description: "You've used all your free notes. Redirecting to pricing...",
      });
      event.target.value = '';
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById("pricing");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
      return;
    }

    setIsTranscribing(true);
    try {
      const { data: { text } } = await Tesseract.recognize(file, 'eng');

      if (text.trim()) {
        setVetNotes(prev => prev ? `${prev}\n\n${text}` : text);
        toast({
          title: "Transcription Success",
          description: "We've added the text from your image to the notes.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "No text found",
          description: "We couldn't detect any clear text in that image.",
        });
      }
    } catch (error) {
      console.error("OCR Error:", error);
      toast({
        variant: "destructive",
        title: "Transcription Error",
        description: "Something went wrong while reading the image.",
      });
    } finally {
      setIsTranscribing(false);
      // Clear the input so same file can be uploaded again
      event.target.value = '';
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FDFCF8]">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <PawIcon size="lg" variant="brown" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-4 text-paw-brown font-medium text-lg animate-pulse"
        >
          Loading PawNote...
        </motion.p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="w-full py-4 px-4 md:px-8 border-b border-border/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <PawIcon size="md" variant="brown" />
            <span className="text-xl font-bold text-foreground">PawNote</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:block">
              Hey, {user.name}!
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="rounded-full"
              aria-label="Logout"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6 md:py-8">
        {/* Tab Switcher */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab("pre")}
            className={`flex-1 py-3 px-4 md:py-4 md:px-6 rounded-2xl font-semibold text-xs sm:text-sm md:text-base transition-all ${activeTab === "pre"
              ? "card-yellow shadow-sm"
              : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
              }`}
          >
            <Sparkles className="inline-block w-5 h-5 mr-2 mb-0.5" />
            Before the Vet
          </button>
          <button
            onClick={() => setActiveTab("post")}
            className={`flex-1 py-3 px-4 md:py-4 md:px-6 rounded-2xl font-semibold text-xs sm:text-sm md:text-base transition-all ${activeTab === "post"
              ? "card-mint shadow-sm"
              : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
              }`}
          >
            <ClipboardList className="inline-block w-5 h-5 mr-2 mb-0.5" />
            After the Vet
          </button>
        </div>

        {/* Pre-Vet Flow */}
        {activeTab === "pre" && (
          <div className="space-y-6 animate-fade-in">
            <div className="card-beige rounded-card-lg">
              <h2 className="text-lg md:text-2xl font-bold text-foreground mb-2 text-center lg:text-left">
                Describe your pet's issue
              </h2>
              <p className="text-sm md:text-base text-muted-foreground mb-4 text-center lg:text-left">
                Tell us what's going on, and we'll help you prepare the right questions for your vet.
              </p>
              <Textarea
                value={petIssue}
                onChange={(e) => setPetIssue(e.target.value)}
                placeholder="E.g., My dog has been scratching his ears a lot and seems uncomfortable..."
                className="min-h-[120px] rounded-2xl bg-white/80 border-border resize-none text-base"
              />
              {!petIssue.trim() && (
                <p className="text-sm text-muted-foreground mt-2 italic">
                  Please describe what you've noticed — the more detail, the better!
                </p>
              )}
              <Button
                onClick={handleGenerateQuestions}
                disabled={!petIssue.trim()}
                className="mt-4 w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-5 md:py-6 font-semibold"
              >
                Get Vet Questions <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {vetQuestions.length > 0 && (
              <div className="card-blue rounded-card-lg">
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-4">
                  Questions to ask your vet
                </h3>
                <ul className="space-y-3">
                  {vetQuestions.map((q, i) => (
                    <li
                      key={q.id}
                      className="flex items-start gap-3 bg-white/40 rounded-xl p-4"
                    >
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                        {i + 1}
                      </span>
                      <span className="text-foreground">{q.question}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Post-Vet Flow */}
        {activeTab === "post" && (
          <div className="space-y-6 animate-fade-in">
            <div className="card-beige rounded-card-lg">
              <h2 className="text-lg md:text-2xl font-bold text-foreground mb-2 text-center lg:text-left">
                Paste your vet notes
              </h2>
              <p className="text-sm md:text-base text-muted-foreground mb-4 text-center lg:text-left">
                Copy the notes from your visit, and we'll organize them into clear action items.
              </p>
              <div className="relative">
                <Textarea
                  value={vetNotes}
                  onChange={(e) => setVetNotes(e.target.value)}
                  placeholder="Paste your vet's notes or type what you remember from the visit..."
                  className="min-h-[160px] rounded-2xl bg-white/80 border-border resize-none text-base pr-12"
                />
                <div className="absolute right-3 top-3">
                  <label htmlFor="vet-note-image" className="cursor-pointer group">
                    <div className={`p-2 rounded-xl transition-all ${isTranscribing ? 'bg-primary/10 animate-pulse' : 'bg-primary/5 hover:bg-primary/10'}`}>
                      {isTranscribing ? (
                        <Loader2 className="w-5 h-5 text-primary animate-spin" />
                      ) : (
                        <ImagePlus className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                      )}
                    </div>
                    <input
                      id="vet-note-image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={isTranscribing}
                    />
                  </label>
                </div>
              </div>
              {!vetNotes.trim() && (
                <p className="text-sm text-muted-foreground mt-2 italic">
                  Add your vet's recommendations so we can help you stay organized.
                </p>
              )}
              <div className="mt-4 flex flex-wrap items-center md:items-start gap-3">
                <Button
                  onClick={handleGenerateSummary}
                  disabled={!vetNotes.trim() || isTranscribing}
                  className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-5 md:py-6 font-semibold shadow-md transition-all active:scale-[0.98]"
                >
                  {isTranscribing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Organizing...
                    </>
                  ) : (
                    <>
                      Organize My Notes <ChevronRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>

                {vetNotes.trim() && (
                  <Button
                    onClick={() => {
                      setVetNotes("");
                      setVisitSummary(null);
                      localStorage.removeItem("pawnote-vet-notes");
                      localStorage.removeItem("pawnote-visit-summary");
                      toast({
                        title: "Notes Cleared",
                        description: "Your workspace has been reset.",
                      });
                    }}
                    variant="ghost"
                    className="w-full md:w-auto text-muted-foreground hover:text-destructive hover:bg-destructive/5 rounded-full px-6 py-5 md:py-6 font-medium"
                  >
                    Clear Notes
                  </Button>
                )}

                {!user?.isPro && (
                  <p className="text-xs text-muted-foreground self-center">
                    {user?.notesRemaining} free notes remaining
                  </p>
                )}
              </div>
            </div>

            {visitSummary && (
              <>
                {/* Summary Statement */}
                <div className="card-beige rounded-card-lg animate-fade-in mb-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <h3 className="text-lg md:text-xl font-bold text-foreground flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      Clinical Overview
                    </h3>
                    <div className="flex items-center self-start md:self-auto gap-2 bg-primary/10 px-3 py-1.5 rounded-full border border-primary/10">
                      <Sparkles className="w-4 h-4 text-primary fill-primary" />
                      <span className="text-xs sm:text-sm font-bold text-primary">
                        {visitSummary.healthStats.streak} Day Care Streak
                      </span>
                    </div>
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
                    {visitSummary.summary}
                  </p>

                  {/* Behavior Intelligence Assistant */}
                  <div className="card-blue rounded-card-lg mb-6 relative">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Activity className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold">Wellness Intelligence</h3>
                          {!user?.isPro && (
                            <span className="bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                              <Lock className="w-3 h-3" />
                              PRO
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">Trend monitoring assistant</p>
                      </div>
                    </div>

                    {user?.isPro ? (
                      <>
                        {/* Daily Check-in Form */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                          {['appetite', 'energy', 'sleep', 'movement', 'itching'].map((cat) => (
                            <div key={cat} className="space-y-2">
                              <label className="text-sm font-semibold capitalize flex items-center gap-2">
                                {cat}
                              </label>
                              <div className="flex gap-2">
                                {['worse', 'same', 'better'].map((val) => {
                                  const todayValue = (visitSummary.healthStats.dailyBehavior?.[getTodayDate()]?.[cat as keyof BehaviorLog]) || 'same';
                                  return (
                                    <button
                                      key={val}
                                      onClick={() => handleLogBehavior(cat as keyof BehaviorLog, val as any)}
                                      className={`flex-1 py-3 md:py-2 text-xs rounded-lg border transition-all text-center flex items-center justify-center ${todayValue === val
                                        ? "bg-primary text-primary-foreground border-primary"
                                        : "bg-white/50 border-border hover:bg-white"
                                        }`}
                                    >
                                      {val}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Trends Display */}
                        {Object.keys(visitSummary.healthStats.dailyBehavior || {}).length > 0 && (
                          <div className="bg-white/60 rounded-2xl p-6 border border-primary/10">
                            <div className="flex items-center gap-2 mb-4 text-primary font-bold">
                              <TrendingUp className="w-5 h-5 shrink-0" />
                              <span className="text-sm sm:text-base">Behavioral Insights (Day {Object.keys(visitSummary.healthStats.dailyBehavior || {}).length})</span>
                            </div>

                            <div className="space-y-4 mb-6">
                              {calculateBehaviorIntelligence(visitSummary.healthStats.dailyBehavior || {})?.trends.map((t) => (
                                <div key={t.category} className="flex items-center justify-between">
                                  <span className="text-sm capitalize font-medium">{t.category}</span>
                                  <div className="flex items-center gap-3">
                                    <span className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${t.status === 'improving' ? 'bg-green-100 text-green-700' :
                                      t.status === 'declining' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                                      }`}>
                                      {t.status}
                                    </span>
                                    <span className="text-xs font-bold text-muted-foreground w-10 text-right">
                                      {t.change >= 0 ? `+${t.change}%` : `${t.change}%`}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="p-4 bg-primary/5 rounded-xl flex gap-3">
                              <AlertCircle className="w-5 h-5 text-primary shrink-0" />
                              <p className="text-sm text-foreground/80 italic">
                                "{calculateBehaviorIntelligence(visitSummary.healthStats.dailyBehavior || {})?.guidance}"
                              </p>
                            </div>

                            {Object.keys(visitSummary.healthStats.dailyBehavior || {}).length <= 4 && (
                              <p className="mt-4 text-[10px] text-muted-foreground text-center">
                                Building baseline (Day {Object.keys(visitSummary.healthStats.dailyBehavior || {}).length}/4)
                              </p>
                            )}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="relative">
                        <div className="filter blur-sm pointer-events-none select-none">
                          {/* Blurred preview */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            {['appetite', 'energy', 'sleep', 'movement', 'itching'].map((cat) => (
                              <div key={cat} className="space-y-2">
                                <label className="text-sm font-semibold capitalize flex items-center gap-2">
                                  {cat}
                                </label>
                                <div className="flex gap-2">
                                  {['worse', 'same', 'better'].map((val) => (
                                    <button
                                      key={val}
                                      disabled
                                      className="flex-1 py-3 md:py-2 text-xs rounded-lg border bg-white/50 border-border"
                                    >
                                      {val}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-white/95 rounded-2xl p-6 shadow-lg border border-primary/20 text-center max-w-sm">
                            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                              <Lock className="w-6 h-6 text-primary" />
                            </div>
                            <h4 className="text-lg font-bold mb-2">Pro Feature</h4>
                            <p className="text-sm text-muted-foreground mb-4">
                              Track daily wellness trends and get AI-powered behavioral insights with PawNote Pro.
                            </p>
                            <Button
                              className="bg-primary text-primary-foreground hover:bg-primary/90"
                              onClick={() => {
                                navigate("/");
                                setTimeout(() => {
                                  const element = document.getElementById("pricing");
                                  if (element) {
                                    element.scrollIntoView({ behavior: "smooth" });
                                  }
                                }, 500);
                              }}
                            >
                              Upgrade to Pro
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {visitSummary.healthStats.streak === 0 && (
                    <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                      <p className="text-red-600 text-sm font-medium">
                        Reminder: Consistent care is key to a healthy pet. Make sure to complete today's checklist to restart your streak!
                      </p>
                    </div>
                  )}
                  {visitSummary.healthStats.streak > 0 && !visitSummary.healthStats.dailyCompletion[getTodayDate()] && (
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                      <p className="text-blue-600 text-sm font-medium">
                        You're doing great! Complete today's tasks to keep your {visitSummary.healthStats.streak} day streak alive.
                      </p>
                    </div>
                  )}
                </div>

                {/* Checklist */}
                <div className="card-mint rounded-card-lg">
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-4">
                    Your Care Checklist
                  </h3>
                  <ul className="space-y-3">
                    {visitSummary.tasks.map((task) => (
                      <li
                        key={task.id}
                        onClick={() => toggleTaskDone(task.id)}
                        className="flex items-center gap-3 bg-white/40 rounded-xl p-4 cursor-pointer hover:bg-white/60 transition-colors"
                      >
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${task.done
                            ? "bg-paw-mint border-paw-mint"
                            : "border-muted-foreground"
                            }`}
                        >
                          {task.done && (
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span
                          className={`flex-1 ${task.done ? "text-muted-foreground line-through" : "text-foreground"
                            }`}
                        >
                          {task.task}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Timeline */}
                <div className="card-yellow rounded-card-lg">
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Healing Journey
                  </h3>
                  <div className="space-y-4">
                    {visitSummary.timeline.map((item, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 rounded-full bg-primary" />
                          {i < visitSummary.timeline.length - 1 && (
                            <div className="w-0.5 h-8 bg-primary/30" />
                          )}
                        </div>
                        <div className="flex-1 pb-2">
                          <p className="font-semibold text-foreground">{item.date}</p>
                          <p className="text-muted-foreground text-sm">{item.event}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
