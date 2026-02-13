import json

# Blog titles from user's request
blog_titles = [
    # Category 1: Post-Vet Panic & Recovery
    ("I Forgot What the Vet Said: A 5-Minute Recovery Guide", "Post-Vet Panic & Recovery", "existing"),
    ("Is My Dog's Heavy Panting After the Vet Normal?", "Post-Vet Panic & Recovery", "existing"),
    ("Post-Surgery Dog Care: The First 24 Hours Survival Guide", "Post-Vet Panic & Recovery", "existing"),
    ("How to Tell if Your Dog Is in Pain (When They Can't Tell You)", "Post-Vet Panic & Recovery", "existing"),
    ("My Dog Won't Eat After the Vet: When to Worry", "Post-Vet Panic & Recovery", "existing"),
    ("Emergency or Just Expensive? Decoding Your Vet's Warning Signs", "Post-Vet Panic & Recovery", "new"),
    ("The 'Is This Normal?' Checklist for Post-Procedure Recovery", "Post-Vet Panic & Recovery", "new"),
    ("How to Spot a Medication Reaction in Dogs Before It's Too Late", "Post-Vet Panic & Recovery", "new"),
    ("Decoding Vet Lingo: What 'Lethargic' and 'Acute' Actually Mean", "Post-Vet Panic & Recovery", "new"),
    ("Missing a Dose: What to Do if You Forget Your Dog's Meds", "Post-Vet Panic & Recovery", "new"),
    ("Why Does My Dog Act Different After a Vet Visit?", "Post-Vet Panic & Recovery", "new"),
    ("Understanding 'Exercise Restriction': How to Keep a High-Energy Dog Still", "Post-Vet Panic & Recovery", "new"),
    ("Managing Multiple Medications: How to Not Mix Up the Doses", "Post-Vet Panic & Recovery", "new"),
    
    # Category 2: Guilt-Free & Relatable
    ("The 'Vet Visit Fog': Why We All Forget Instructions", "Guilt-Free & Relatable", "existing"),
    ("Confessions of a Pet Parent: I Mixed Up the Meds (And What I Learned)", "Guilt-Free & Relatable", "new"),
    ("How to Stop Calling Your Vet for 'Simple Questions'", "Guilt-Free & Relatable", "new"),
    ("Why 'Memory' Is a Bad Strategy for Your Dog's Health", "Guilt-Free & Relatable", "existing"),
    ("Your Vet Is Rushed—Here's How to Get the Information You Need", "Guilt-Free & Relatable", "new"),
    ("The True Cost of Misunderstanding Your Vet's Instructions", "Guilt-Free & Relatable", "new"),
    
    # Category 3: Specific Conditions
    ("Managing Canine Diabetes: A Simple Daily Checklist for New Owners", "Specific Conditions", "existing"),
    ("Kidney Disease in Dogs: Making Sense of the Lab Results", "Specific Conditions", "new"),
    ("IVDD Recovery at Home: The Non-Surgical Survival Guide", "Specific Conditions", "existing"),
    ("Puppy's First Sick Visit: A Guide for First-Time Owners", "Specific Conditions", "new"),
    ("Cancer Treatment for Dogs: Simplifying the Chemo Schedule", "Specific Conditions", "new"),
    ("Heart Murmurs in Dogs: What the Grades Actually Mean", "Specific Conditions", "new"),
    ("Post-Neutering Care: The 10-Day Countdown", "Specific Conditions", "new"),
    ("Decoding Your Dog's Bloodwork: A Cheat Sheet for Parents", "Specific Conditions", "new"),
    ("Seizure Watch: How to Log and Report Post-Vet Episodes", "Specific Conditions", "new"),
    ("Arthritis in Dogs: A Daily Mobility & Meds Routine", "Specific Conditions", "new"),
    
    # Category 4: AI & Tech Authority
    ("Forget Files: Why Your Vet Notes Should Be Interactive", "AI & Tech Authority", "existing"),
    ("Why You Should Tape Your Vet Conversation (And What to Do With the Audio)", "AI & Tech Authority", "new"),
    ("Is Your Pet Tech Actually Helping? The Difference Between Data and Action", "AI & Tech Authority", "new"),
    ("How to Use AI to Summarize 20 Pages of Vet History", "AI & Tech Authority", "new"),
    
    # Category 5: Practical How-To
    ("7 Ways to Hide Pills in Your Dog's Food", "Practical How-To", "existing"),
    ("5 Questions You Must Ask Your Vet Before Leaving", "Practical How-To", "existing"),
    ("Tracking Your Dog's Symptoms: A Simple Diary Template", "Practical How-To", "new"),
    ("How to Create a 'Medication Station' in Your Kitchen", "Practical How-To", "new"),
    ("How to Use Your Smartphone to Monitor Your Dog's Recovery", "Practical How-To", "new"),
    ("The 'Ice Cube Trick' for Dehydrated Dogs Post-Surgery", "Practical How-To", "new"),
    ("How to Carry a Large Dog After Surgery", "Practical How-To", "new"),
    ("Cleaning a Dog's Wound: The Do's and Don'ts", "Practical How-To", "new"),
    ("The Best Floor Surfaces for a Dog Recovering from Leg Surgery", "Practical How-To", "new"),
    ("How to Calm Your Dog Down After a Stressful Vet Appointment", "Practical How-To", "new"),
    ("The Best Way to Keep Your Dog From Licking Their Stitches", "Practical How-To", "new"),
    ("The Ultimate 'Go-Bag' for Your Dog's Emergency Vet Visit", "Practical How-To", "new"),
    ("How to Organize a Pet First Aid Kit for Home Recovery", "Practical How-To", "new"),
    
    # Category 7: Comparison & Trust
    ("Vet AI vs. Google: Why a Checklist Beats a Search Result", "Comparison & Trust", "existing"),
    ("The Best Apps for Managing Your Dog's Health in 2026", "Comparison & Trust", "existing"),
    ("The Comparison: Manual Med Reminders vs. AI-Generated Schedules", "Comparison & Trust", "new"),
    ("Why 90% of Pet Owners Forget Instructions (And How to Be the 10%)", "Comparison & Trust", "new"),
    ("How Our AI Turns 15 Minutes of Vet Talk Into 1 Simple Task", "Comparison & Trust", "new"),
    ("Stop Googling Your Dog's Symptoms: Why WebMD for Pets Is Making You Anxious", "Comparison & Trust", "new"),
    ("Why Vet Bills Are Expensive — And How Clear Instructions Save You Money", "Comparison & Trust", "new"),
    ("5 Things Vets Wish You Knew About Post-Visit Care", "Comparison & Trust", "new"),
    ("The Working Parent's Guide to Post-Vet Dog Care", "Comparison & Trust", "new"),
    ("Managing Your Pet's Health Shouldn't Be a Full-Time Job", "Comparison & Trust", "new"),
    ("The Anxiety of the 'Uncertain Diagnosis': How to Stay Calm", "Comparison & Trust", "new"),
    ("How AI Is Saving Dog Lives by Simplifying Vet Notes", "Comparison & Trust", "new"),
    ("Why You Need a 'Digital Brain' for Your Dog's Medical History", "Comparison & Trust", "new"),
    ("How to Be the 'Perfect Client' (And Get Better Care for Your Dog)", "Comparison & Trust", "new"),
    ("How to Record a Vet Visit Without Being 'That Person'", "Comparison & Trust", "new"),
    ("3 Apps Every New Dog Owner Needs (Besides Instagram)", "Comparison & Trust", "new"),
]

# SEO-optimized dog images from Unsplash
dog_images = [
    "https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1529429617124-95b109e86bb8?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1591946614720-90a587da4a36?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1601758177266-bc599de87707?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1568572933382-74d440642117?auto=format&fit=crop&q=80&w=800",
]

print(f"Total blogs to generate: {len(blog_titles)}")
print(f"New blogs needed: {len([b for b in blog_titles if b[2] == 'new'])}")
print(f"Existing blogs: {len([b for b in blog_titles if b[2] == 'existing'])}")
